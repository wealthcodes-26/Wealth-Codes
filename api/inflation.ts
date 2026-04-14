import axios from "axios";
import * as cheerio from "cheerio";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set cache headers for 1 hour to avoid hitting sources too frequently but keeping it fresh
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  try {
    let inflationRate = null;
    let source = "";

    // Source 1: MOSPI (Ministry of Statistics and Programme Implementation) - Official Source
    try {
      const mospiResponse = await axios.get("https://www.mospi.gov.in/", {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 4000
      });
      const $ = cheerio.load(mospiResponse.data);
      const pageText = $("body").text();
      const match = pageText.match(/CPI\s*\(Combined\).*?:\s*(\d+\.?\d*)\s*%/i);
      if (match && match[1]) {
        inflationRate = parseFloat(match[1]);
        source = "MOSPI (Official)";
      }
    } catch (e) {
      console.log("MOSPI fetch failed, trying RBI...");
    }

    // Source 2: RBI (Reserve Bank of India)
    if (!inflationRate) {
      try {
        const rbiResponse = await axios.get("https://www.rbi.org.in/", {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          },
          timeout: 4000
        });
        const $ = cheerio.load(rbiResponse.data);
        const pageText = $("body").text();
        const patterns = [
          /CPI\s*\(Combined\).*?:\s*(\d+\.?\d*)\s*%/i,
          /Inflation\s*\(CPI\).*?:\s*(\d+\.?\d*)\s*%/i,
          /CPI\s*Inflation.*?:\s*(\d+\.?\d*)\s*%/i
        ];
        for (const pattern of patterns) {
          const match = pageText.match(pattern);
          if (match && match[1]) {
            inflationRate = parseFloat(match[1]);
            source = "RBI";
            break;
          }
        }
      } catch (e) {
        console.log("RBI fetch failed, trying Trading Economics...");
      }
    }
    
    // Source 3: Trading Economics (Very reliable fallback)
    if (!inflationRate) {
      try {
        const teResponse = await axios.get("https://tradingeconomics.com/india/inflation-cpi", {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          },
          timeout: 4000
        });
        const $te = cheerio.load(teResponse.data);
        
        // Try table first
        const teValue = $te(".table-header + .table-responsive .table td:nth-child(2)").first().text().trim();
        if (teValue && !isNaN(parseFloat(teValue))) {
          inflationRate = parseFloat(teValue);
          source = "Trading Economics (Table)";
        } else {
          // Fallback to regex on text
          const teText = $te("body").text();
          const teMatch = teText.match(/annual inflation rate in India.*?(\d+\.?\d*)\s*%/i);
          if (teMatch && teMatch[1]) {
            inflationRate = parseFloat(teMatch[1]);
            source = "Trading Economics (Text)";
          }
        }
      } catch (e) {
        console.log("Trading Economics fetch failed");
      }
    }

    if (inflationRate) {
      res.status(200).json({ rate: inflationRate, source, timestamp: new Date().toISOString() });
    } else {
      // Latest known official rate as of March 2026 is 3.4%
      res.status(200).json({ rate: 3.4, source: "Latest Known (March 2026)", timestamp: new Date().toISOString() });
    }
  } catch (error) {
    console.error("Error fetching inflation data:", error);
    res.status(200).json({ rate: 3.4, source: "Fallback", timestamp: new Date().toISOString() });
  }
}
