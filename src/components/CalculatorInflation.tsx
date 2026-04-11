import React, { useState, useMemo, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatCurrency } from '../lib/utils';
import { TrendingUp, Info } from 'lucide-react';

const CalculatorInflation = () => {
  const [currentAmount, setCurrentAmount] = useState<number | string>(100000);
  const [inflationRate, setInflationRate] = useState<number | string>(6);
  const [timePeriod, setTimePeriod] = useState<number | string>(10);
  const [realTimeRate, setRealTimeRate] = useState<number | null>(null);
  const [isLoadingRate, setIsLoadingRate] = useState(false);

  useEffect(() => {
    const fetchInflation = async () => {
      setIsLoadingRate(true);
      try {
        const response = await fetch('/api/inflation');
        const data = await response.json();
        if (data.rate) {
          setRealTimeRate(data.rate);
        }
      } catch (error) {
        console.error('Failed to fetch inflation rate:', error);
      } finally {
        setIsLoadingRate(false);
      }
    };
    fetchInflation();
  }, []);

  const results = useMemo(() => {
    const amountVal = Number(currentAmount) || 0;
    const rateVal = Number(inflationRate) || 0;
    const periodVal = Number(timePeriod) || 0;

    const r = rateVal / 100;
    const n = periodVal;
    
    // Future Cost Formula: FV = PV * (1 + r)^n
    const futureCost = amountVal * Math.pow(1 + r, n);
    const purchasingPower = amountVal / Math.pow(1 + r, n);
    const costIncrease = futureCost - amountVal;

    const chartData = [];
    for (let year = 0; year <= periodVal; year++) {
      const value = amountVal * Math.pow(1 + r, year);
      chartData.push({
        year,
        cost: Math.round(value),
        original: amountVal,
      });
    }

    return {
      currentAmount: amountVal,
      futureCost,
      purchasingPower,
      costIncrease,
      chartData,
      pieData: [
        { name: 'Current Cost', value: amountVal },
        { name: 'Inflation Impact', value: costIncrease },
      ]
    };
  }, [currentAmount, inflationRate, timePeriod]);

  const COLORS = ['#10b981', '#ef4444']; // Emerald for current, Red for inflation impact

  return (
    <div className="bg-white rounded-3xl p-5 md:p-8 border border-zinc-100 shadow-sm relative overflow-hidden">
      {/* Real-time Inflation Rate Badge */}
      <div className="absolute top-0 right-0 mt-4 mr-4 z-10">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50/80 backdrop-blur-sm border border-emerald-100 rounded-full shadow-sm">
          <div className={`w-2 h-2 rounded-full ${isLoadingRate ? 'bg-zinc-300 animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`}></div>
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-emerald-700 font-bold leading-none mb-0.5">Live Inflation Rate</span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-zinc-900 leading-none">{realTimeRate ? `${realTimeRate}%` : '...'}</span>
              {realTimeRate && (
                <button 
                  onClick={() => setInflationRate(realTimeRate)}
                  className="p-0.5 hover:bg-emerald-100 rounded transition-colors text-emerald-600"
                  title="Apply Live Rate"
                >
                  <TrendingUp className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          <div className="group relative ml-1">
            <Info className="w-3 h-3 text-emerald-400 cursor-help" />
            <div className="absolute top-full right-0 mt-2 w-56 p-2 bg-zinc-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-xl">
              This rate is fetched in real-time from official data sources. Note: The real inflation might be high because it includes food inflation, healthcare inflation, etc.
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-6 md:space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-zinc-600">Current Cost / Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">₹</span>
                <input
                  type="number"
                  value={currentAmount}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") setCurrentAmount("");
                    else setCurrentAmount(Math.min(100000000, Math.max(0, Number(val))));
                  }}
                  onFocus={(e) => e.target.select()}
                  onBlur={() => {
                    if (currentAmount === "") setCurrentAmount(100000);
                  }}
                  className="w-32 md:w-40 pl-7 pr-3 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600 font-bold outline-none focus:ring-2 focus:ring-emerald-200 transition-all text-sm md:text-base"
                />
              </div>
            </div>
            <input
              type="range"
              min="1000"
              max="10000000"
              step="1000"
              value={Number(currentAmount) > 10000000 ? 10000000 : Number(currentAmount)}
              onChange={(e) => setCurrentAmount(Number(e.target.value))}
              className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-zinc-600">Expected Inflation Rate (p.a)</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") setInflationRate("");
                    else setInflationRate(Math.min(20, Math.max(0, Number(val))));
                  }}
                  onFocus={(e) => e.target.select()}
                  onBlur={() => {
                    if (inflationRate === "") setInflationRate(6);
                  }}
                  className="w-24 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600 font-bold outline-none focus:ring-2 focus:ring-emerald-200 transition-all text-right pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">%</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              step="0.1"
              value={Number(inflationRate) > 20 ? 20 : Number(inflationRate)}
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-4">
              <label className="text-sm font-medium text-zinc-600">Time Period (Years)</label>
              <span className="text-emerald-600 font-bold">{timePeriod} Yr</span>
            </div>
            <input
              type="range"
              min="1"
              max="40"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
              className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          <div className="space-y-4 pt-6 border-t border-zinc-50">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">Current Value</p>
                <p className="text-lg md:text-xl font-bold text-zinc-900">{formatCurrency(results.currentAmount)}</p>
              </div>
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <p className="text-[10px] text-red-400 uppercase tracking-wider mb-1">Future Purchasing Power</p>
                <p className="text-lg md:text-xl font-bold text-red-600">{formatCurrency(results.purchasingPower)}</p>
              </div>
            </div>
            
            <div className="p-4 bg-zinc-900 rounded-2xl text-white shadow-lg">
              <p className="text-xs opacity-80 uppercase tracking-wider mb-1">Future Cost of Same Item</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-400">{formatCurrency(results.futureCost)}</p>
              <p className="text-[10px] mt-2 opacity-70 italic">Due to {inflationRate}% inflation, you will need {formatCurrency(results.futureCost)} to buy what costs {formatCurrency(results.currentAmount)} today.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="h-[200px] md:h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={results.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {results.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={results.chartData}>
                <defs>
                  <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#71717a'}} />
                <YAxis hide />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Area type="monotone" dataKey="cost" stroke="#ef4444" fillOpacity={1} fill="url(#colorCost)" strokeWidth={2} name="Future Cost" />
                <Area type="monotone" dataKey="original" stroke="#10b981" fill="transparent" strokeWidth={2} strokeDasharray="5 5" name="Current Cost" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorInflation;
