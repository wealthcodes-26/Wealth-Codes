import axios from "axios";
import * as cheerio from "cheerio";
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
      const teValue = $te(".table-header + .table-responsive .table td:nth-child(2)").first().text().trim();
      if (teValue) {
        inflationRate = parseFloat(teValue);
      }
    }

    if (inflationRate) {
      res.status(200).json({ rate: inflationRate, source: "RBI/MOSPI", timestamp: new Date().toISOString() });
    } else {
      res.status(200).json({ rate: 3.21, source: "Default (Feb 2026)", timestamp: new Date().toISOString() });
    }
  } catch (error) {
    console.error("Error fetching inflation data:", error);
    res.status(200).json({ rate: 3.21, source: "Fallback", timestamp: new Date().toISOString() });
  }
}
