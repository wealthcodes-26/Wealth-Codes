import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp, Info } from 'lucide-react';

interface InfoSection {
  title: string;
  description: string;
  advantages: { title: string; desc: string }[];
  considerations: { title: string; desc: string }[];
}

interface CalculatorInfoProps {
  activeTab: string;
  realTimeRate?: number | null;
  isLoadingRate?: boolean;
}

const calculatorInfo: Record<string, InfoSection> = {
  sip: {
    title: "What is SIP?",
    description: "A Systematic Investment Plan (SIP) is a disciplined way of investing in mutual funds. Instead of a large one-time payment, you invest a fixed amount at regular intervals (usually monthly). It's like a recurring deposit for mutual funds, helping you build wealth steadily over time.",
    advantages: [
      { title: "Rupee Cost Averaging", desc: "Buy more units when markets are low and fewer when high, lowering your average cost." },
      { title: "Power of Compounding", desc: "Reinvested returns generate their own returns, leading to exponential growth." },
      { title: "Financial Discipline", desc: "Automated monthly deductions help you stay committed to your long-term goals." }
    ],
    considerations: [
      { title: "Market Risk", desc: "SIPs do not guarantee profits; they are subject to market volatility." },
      { title: "Long-term Commitment", desc: "Requires consistent cash flow. Missing installments can slow down your goal progress." },
      { title: "Patience is Key", desc: "The real magic of SIP happens after 7-10 years. Short-term fluctuations are normal." }
    ]
  },
  lumpsum: {
    title: "What is Lump Sum?",
    description: "A lump sum investment is a one-time, large deposit into a mutual fund or other investment vehicle. Unlike SIP, where you invest small amounts regularly, here you commit your entire capital at once. This is ideal when you have a significant amount of surplus cash, such as a bonus or inheritance.",
    advantages: [
      { title: "Immediate Market Exposure", desc: "Your entire capital starts working for you from day one, maximizing time in the market." },
      { title: "Market Dip Opportunity", desc: "Lump sum investments during a bear market or market dip can lead to higher returns as you buy more units at a lower price." },
      { title: "Ideal for Windfalls", desc: "Perfect for investing large sums like bonuses, gifts, or proceeds from asset sales." }
    ],
    considerations: [
      { title: "Market Timing Risk", desc: "Investing a large sum just before a market dip can lead to significant short-term losses." },
      { title: "High Entry Point", desc: "Requires a substantial amount of capital upfront, which may not be feasible for everyone." },
      { title: "Emotional Discipline", desc: "Seeing a large sum fluctuate can be stressful; it requires a strong long-term perspective." }
    ]
  },
  stepup: {
    title: "What is Step-up SIP?",
    description: "A Step-up SIP (or Top-up SIP) allows you to increase your SIP contribution amount periodically (usually annually) by a fixed percentage or amount. As your income grows over time, you can increase your investments to reach your financial goals much faster than a regular SIP.",
    advantages: [
      { title: "Reach Goals Faster", desc: "Increasing your investment amount significantly reduces the time needed to reach your target corpus." },
      { title: "Matches Income Growth", desc: "Align your investments with your annual salary hikes or business growth automatically." },
      { title: "Beats Inflation", desc: "Helps in maintaining the purchasing power of your future corpus by investing more over time." }
    ],
    considerations: [
      { title: "Cash Flow Planning", desc: "Ensure you can sustain the increased monthly commitment in the coming years as the amount grows." },
      { title: "Compounding Magic", desc: "Even a small 5-10% annual increase can lead to a massive difference in the final corpus." },
      { title: "Discipline", desc: "Automating the step-up ensures you don't forget to increase your investments as your lifestyle changes." }
    ]
  },
  hybrid: {
    title: "What is Hybrid Investment?",
    description: "A Hybrid investment strategy combines the benefits of both Lump Sum and SIP. You start with a significant initial capital (Lump Sum) and continue to add regular contributions (SIP) over time. This approach is highly effective for long-term wealth creation as it leverages both immediate market exposure and regular cost averaging.",
    advantages: [
      { title: "Accelerated Growth", desc: "The initial lump sum provides a strong base that compounds alongside regular additions. During market dips, lump sum injections can significantly boost your overall investment returns." },
      { title: "Flexibility", desc: "Adjust your SIP amount or step it up annually to match your changing financial capacity." },
      { title: "Best of Both Worlds", desc: "Get the benefit of time in the market from the lump sum and rupee cost averaging from the SIP." }
    ],
    considerations: [
      { title: "Initial Capital Requirement", desc: "Requires a decent amount of surplus cash to start the lump sum component effectively." },
      { title: "Long-term Horizon", desc: "This strategy works best over 10-15 years where the power of compounding truly takes over." },
      { title: "Risk Management", desc: "Ensure your asset allocation between equity and debt matches your overall risk profile." }
    ]
  },
  swp: {
    title: "What is SWP?",
    description: "A Systematic Withdrawal Plan (SWP) is the reverse of an SIP. It allows you to withdraw a fixed amount of money from your mutual fund investment at regular intervals (usually monthly). This is an excellent tool for creating a regular source of secondary income or for post-retirement financial planning.",
    advantages: [
      { title: "Regular Income Stream", desc: "Provides a steady cash flow, making it ideal for retirees or those needing monthly funds." },
      { title: "Tax Efficiency", desc: "Only the capital gains portion of the withdrawal is taxed, often resulting in lower tax liability than other income sources." },
      { title: "Capital Appreciation", desc: "The remaining balance in your fund continues to stay invested and can potentially grow over time." }
    ],
    considerations: [
      { title: "Sustainability", desc: "If your withdrawal rate is higher than the fund's return, your capital will eventually deplete." },
      { title: "Market Volatility", desc: "Withdrawing during a market downturn can significantly impact the longevity of your corpus." },
      { title: "Inflation Impact", desc: "A fixed withdrawal amount may lose its purchasing power over many years due to rising costs." }
    ]
  },
  presentvalue: {
    title: "What is Target Amount Planning?",
    description: "Target Amount Planning (or Present Value calculation) helps you determine how much you need to invest today or monthly to reach a specific financial goal in the future. Instead of guessing, you start with your end goal (e.g., ₹1 Crore for retirement) and work backwards to find the required investment.",
    advantages: [
      { title: "Goal Clarity", desc: "Know exactly what is required to achieve your dreams, removing financial ambiguity." },
      { title: "Efficient Allocation", desc: "Avoid over-investing or under-investing by knowing the precise amount needed for your target." },
      { title: "Informed Decisions", desc: "Compare whether a lump sum today or a monthly SIP is more feasible for your current situation." }
    ],
    considerations: [
      { title: "Realistic Returns", desc: "Be conservative with expected return rates; overestimating can lead to a shortfall in your goal." },
      { title: "Inflation Factor", desc: "Remember that ₹1 Crore today will have much less purchasing power in 10-20 years." },
      { title: "Review Periodically", desc: "As market conditions and your goals change, revisit this calculation to stay on track." }
    ]
  },
  inflation: {
    title: "What is Inflation?",
    description: "Inflation is the rate at which the general level of prices for goods and services is rising, and, subsequently, purchasing power is falling. In simple terms, your money buys less tomorrow than it does today. Understanding inflation is crucial for long-term financial planning to ensure your savings keep up with rising costs.",
    advantages: [
      { title: "Erodes Savings", desc: "Money kept in low-interest accounts may actually lose value over time if the interest rate is lower than inflation." },
      { title: "Higher Future Costs", desc: "Essential expenses like education, healthcare, and housing tend to rise faster than general inflation." },
      { title: "Purchasing Power", desc: "A fixed amount of money (like a pension) will buy fewer goods and services as the years go by." }
    ],
    considerations: [
      { title: "Invest in Equities", desc: "Historically, equity investments have provided returns that significantly beat inflation over the long term." },
      { title: "Diversify Assets", desc: "Spread your investments across different asset classes like gold, real estate, and stocks to hedge against inflation." },
      { title: "Regularly Increase SIPs", desc: "Using a Step-up SIP helps your investment contributions grow along with your income and rising costs." }
    ]
  }
};

const CalculatorInfo = ({ activeTab, realTimeRate, isLoadingRate }: CalculatorInfoProps) => {
  const info = calculatorInfo[activeTab];
  const [showTooltip, setShowTooltip] = React.useState(false);
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTooltip]);

  const handleApplyRate = () => {
    if (realTimeRate) {
      window.dispatchEvent(new CustomEvent('apply-inflation-rate', { detail: realTimeRate }));
    }
  };

  if (!info) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="mb-8 md:mb-12"
      >
        {activeTab === 'inflation' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4 px-2">
            <div className="md:col-start-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50/80 backdrop-blur-sm border border-emerald-100 rounded-full shadow-sm">
                <div className={`w-2.5 h-2.5 rounded-full ${isLoadingRate ? 'bg-zinc-300 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`}></div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-bold leading-none mb-1">Live Inflation Rate</span>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-zinc-900 leading-none">{realTimeRate ? `${realTimeRate}%` : '...'}</span>
                    {realTimeRate && (
                      <button 
                        onClick={handleApplyRate}
                        className="p-1 hover:bg-emerald-100 rounded-lg transition-colors text-emerald-600 cursor-pointer flex items-center justify-center"
                        title="Apply Live Rate"
                      >
                        <TrendingUp className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="relative ml-1" ref={tooltipRef}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTooltip(!showTooltip);
                    }}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="flex items-center justify-center p-2 -m-1 rounded-full hover:bg-emerald-100 transition-colors cursor-help outline-none"
                    aria-label="Inflation Info"
                  >
                    <Info className="w-4 h-4 text-emerald-400" />
                  </button>
                  <AnimatePresence>
                    {showTooltip && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-4 bg-zinc-900 text-white text-[11px] rounded-2xl z-50 shadow-2xl"
                      >
                        <div className="relative leading-relaxed">
                          This rate is fetched in real-time from official data sources (MOSPI/RBI). Note: Real-world inflation may vary based on specific categories like food or healthcare.
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-[10px] border-transparent border-t-zinc-900 mt-0.5" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 mb-4">{info.title}</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">
              {info.description}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 mb-4">{activeTab === 'inflation' ? 'The Impact' : 'Advantages'}</h3>
            <ul className="space-y-3">
              {info.advantages.map((item, i) => (
                <li key={i} className="text-sm">
                  <span className={`font-semibold block ${activeTab === 'inflation' ? 'text-red-600' : 'text-emerald-600'}`}>
                    {item.title}
                  </span>
                  <span className="text-zinc-500">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-zinc-900 mb-4">{activeTab === 'inflation' ? 'How to Fight It' : 'Things to Consider'}</h3>
            <ul className="space-y-3">
              {info.considerations.map((item, i) => (
                <li key={i} className="text-sm">
                  <span className="font-semibold text-zinc-700 block">{item.title}</span>
                  <span className="text-zinc-500">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CalculatorInfo;
