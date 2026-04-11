import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatCurrency } from '../lib/utils';

const CalculatorPresentValue = () => {
  const [targetAmount, setTargetAmount] = useState<number | string>(1000000);
  const [expectedReturn, setExpectedReturn] = useState<number | string>(12);
  const [timePeriod, setTimePeriod] = useState<number | string>(10);

  const results = useMemo(() => {
    const targetVal = Number(targetAmount) || 0;
    const returnVal = Number(expectedReturn) || 0;
    const periodVal = Number(timePeriod) || 0;

    const r = returnVal / 100;
    const n = periodVal;
    const monthlyRate = r / 12;
    const totalMonths = n * 12;
    
    // 1. Lump Sum (Present Value) Formula: PV = FV / (1 + r)^n
    const presentValue = n === 0 ? targetVal : targetVal / Math.pow(1 + r, n);
    const growthNeeded = targetVal - presentValue;

    // 2. Monthly SIP Formula: P = FV / ([((1 + i)^n - 1) / i] * (1 + i))
    // Assuming beginning of month SIP
    const monthlySIP = (monthlyRate === 0 || totalMonths === 0) ? (totalMonths === 0 ? targetVal : targetVal / totalMonths) : targetVal / (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));

    // 3. Annual Investment Formula: P = FV / ([((1 + r)^n - 1) / r] * (1 + r))
    // Assuming beginning of year investment
    const annualInvestment = (r === 0 || n === 0) ? (n === 0 ? targetVal : targetVal / n) : targetVal / (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

    const chartData = [];
    for (let year = 0; year <= periodVal; year++) {
      // Value at year t = PV * (1 + r)^t
      const value = presentValue * Math.pow(1 + r, year);
      chartData.push({
        year,
        value: Math.round(value),
        investment: Math.round(presentValue),
      });
    }

    return {
      presentValue,
      growthNeeded,
      targetAmount: targetVal,
      monthlySIP,
      annualInvestment,
      chartData,
      pieData: [
        { name: 'Required Investment', value: presentValue },
        { name: 'Growth Needed', value: growthNeeded },
      ]
    };
  }, [targetAmount, expectedReturn, timePeriod]);

  const COLORS = ['#10b981', '#064e3b'];

  return (
    <div className="bg-white rounded-3xl p-5 md:p-8 border border-zinc-100 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-6 md:space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-zinc-600">Target Amount (Future Goal)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">₹</span>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") setTargetAmount("");
                    else setTargetAmount(Math.min(1000000000, Math.max(0, Number(val))));
                  }}
                  onFocus={(e) => e.target.select()}
                  onBlur={() => {
                    if (targetAmount === "") setTargetAmount(1000000);
                  }}
                  className="w-32 md:w-40 pl-7 pr-3 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600 font-bold outline-none focus:ring-2 focus:ring-emerald-200 transition-all text-sm md:text-base"
                />
              </div>
            </div>
            <input
              type="range"
              min="100000"
              max="100000000"
              step="100000"
              value={Number(targetAmount) > 100000000 ? 100000000 : Number(targetAmount)}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-zinc-600">Expected Return Rate (p.a)</label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={expectedReturn}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") setExpectedReturn("");
                    else setExpectedReturn(Math.min(30, Math.max(0, Number(val))));
                  }}
                  onFocus={(e) => e.target.select()}
                  onBlur={() => {
                    if (expectedReturn === "") setExpectedReturn(12);
                  }}
                  className="w-24 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600 font-bold outline-none focus:ring-2 focus:ring-emerald-200 transition-all text-right pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">%</span>
              </div>
            </div>
            <input
              type="range"
              min="1"
              max="30"
              step="0.1"
              value={Number(expectedReturn) > 30 ? 30 : Number(expectedReturn)}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
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
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">Monthly SIP Required</p>
                <p className="text-lg md:text-xl font-bold text-emerald-600">{formatCurrency(results.monthlySIP)}</p>
              </div>
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                <p className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1">Annual SIP Required</p>
                <p className="text-lg md:text-xl font-bold text-emerald-600">{formatCurrency(results.annualInvestment)}</p>
              </div>
            </div>
            
            <div className="p-4 bg-emerald-600 rounded-2xl text-white shadow-lg shadow-emerald-100">
              <p className="text-xs opacity-80 uppercase tracking-wider mb-1">Lump Sum Investment Today</p>
              <p className="text-2xl md:text-3xl font-bold">{formatCurrency(results.presentValue)}</p>
              <p className="text-[10px] mt-2 opacity-70 italic">Invest this amount once to reach {formatCurrency(results.targetAmount)} in {timePeriod} years.</p>
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
                  <linearGradient id="colorValuePV" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#71717a'}} />
                <YAxis hide />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValuePV)" strokeWidth={2} name="Total Value" />
                <Area type="monotone" dataKey="investment" stroke="#064e3b" fill="transparent" strokeWidth={2} strokeDasharray="5 5" name="Initial Investment" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorPresentValue;
