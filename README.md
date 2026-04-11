# Investment Planning Tools

A comprehensive suite of financial calculators designed to help you plan your investments effectively.

## Features

- **SIP Calculator**: Calculate the future value of your Systematic Investment Plans.
- **Lump Sum Calculator**: See how a one-time investment grows over time.
- **Step-up SIP Calculator**: Plan for increasing contributions as your income grows.
- **Hybrid Calculator**: Combine Lump Sum and SIP strategies.
- **SWP Calculator**: Plan your regular withdrawals for secondary income.
- **Target Amount Planning**: Work backwards from your goal to find the required investment.
- **Inflation Calculator**: Visualize the impact of inflation on your purchasing power with **Live Inflation Rates**.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide React, Recharts, Motion.
- **Backend (Serverless)**: Vercel Serverless Functions (TypeScript).

## Deployment on Vercel

This project is pre-configured for seamless deployment on Vercel.

### Steps to Deploy via GitHub:

1. **Export to GitHub**: Use the "Export to GitHub" option in the AI Studio settings menu.
2. **Connect to Vercel**:
   - Log in to [Vercel](https://vercel.com).
   - Click **"Add New..."** -> **"Project"**.
   - Import your GitHub repository.
3. **Configure Settings**:
   - Vercel will automatically detect the Vite framework.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Deploy**: Click **"Deploy"**.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## License

MIT
