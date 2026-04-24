import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import axios from "axios";
import * as cheerio from "cheerio";

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // API route for inflation data
  app.get("/api/inflation", async (req, res) => {
    try {
      // Attempt to fetch from RBI first
      const rbiResponse = await axios.get("https://www.rbi.org.in/", {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 5000
      });
      
      const $ = cheerio.load(rbiResponse.data);
      let inflationRate = null;

      // Look for CPI in the text with multiple patterns
      const pageText = $("body").text();
      const patterns = [
        /CPI\s*\(Combined\).*?:\s*(\d+\.?\d*)\s*%/i,
        /Inflation\s*\(CPI\).*?:\s*(\d+\.?\d*)\s*%/i,
        /CPI\s*Inflation.*?:\s*(\d+\.?\d*)\s*%/i,
        /Consumer\s*Price\s*Index.*?:\s*(\d+\.?\d*)\s*%/i
      ];

      for (const pattern of patterns) {
        const match = pageText.match(pattern);
        if (match && match[1]) {
          inflationRate = parseFloat(match[1]);
          console.log(`Matched inflation rate from RBI: ${inflationRate} using pattern ${pattern}`);
          break;
        }
      }
      
      if (!inflationRate) {
        // Fallback to Trading Economics if RBI parsing fails
        const teResponse = await axios.get("https://tradingeconomics.com/india/inflation-cpi", {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          },
          timeout: 5000
        });
        const $te = cheerio.load(teResponse.data);
        // Trading Economics usually has the value in a prominent place
        const teValue = $te(".table-header + .table-responsive .table td:nth-child(2)").first().text().trim();
        if (teValue) {
          inflationRate = parseFloat(teValue);
        }
      }

      if (inflationRate) {
        res.json({ rate: inflationRate, source: "RBI/MOSPI", timestamp: new Date().toISOString() });
      } else {
        // Default fallback if all else fails (current known rate as of March 2026)
        res.json({ rate: 3.4, source: "Default (March 2026)", timestamp: new Date().toISOString() });
      }
    } catch (error) {
      console.error("Error fetching inflation data:", error);
      res.json({ rate: 3.4, source: "Fallback", timestamp: new Date().toISOString() });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
