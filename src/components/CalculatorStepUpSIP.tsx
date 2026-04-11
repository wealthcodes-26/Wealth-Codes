import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from 'recharts';
import { formatCurrency } from '../lib/utils';

const CalculatorStepUpSIP = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState<number | string>(5000);
  const [expectedReturn, setExpectedReturn] = useState<number | string>(12);
  const [timePeriod, setTimePeriod] = useState<number | string>(10);
  const [annualStepUp, setAnnualStepUp] = useState<number | string>(10);

  const results = useMemo(() => {
    const monthlyVal = Number(monthlyInvestment) || 0;
    const returnVal = Number(expectedReturn) || 0;
    const periodVal = Number(timePeriod) || 0;
    const stepUpVal = Number(annualStepUp) || 0;

    const i = returnVal / 100 / 12;
    const stepUpRate = stepUpVal / 100;
    
    let totalValue = 0;
    let totalInvestment = 0;
    let currentMonthlyInvestment = monthlyVal;
    const chartData = [];

    for (let year = 1; year <= periodVal; year++) {
      for (let month = 1; month <= 12; month++) {
        totalInvestment += currentMonthlyInvestment;
        totalValue = (totalValue + currentMonthlyInvestment) * (1 + i);
      }
      chartData.push({
        year,
        invested: Math.round(totalInvestment),
        value: Math.round(totalValue),
      });
      currentMonthlyInvestment = currentMonthlyInvestment * (1 + stepUpRate);
    }

    const estimatedReturns = totalValue - totalInvestment;

    return {
      totalInvestment,
      estimatedReturns,
      totalValue,
      chartData,
      pieData: [
        { name: 'Invested Amount', value: totalInvestment },
        { name: 'Estimated Returns', value: estimatedReturns },
      ]
    };
  }, [monthlyInvestment, expectedReturn, timePeriod, annualStepUp]);

  const COLORS = ['#10b981', '#064e3b'];

  return (
    <div className="bg-white rounded-3xl p-5 md:p-8 border border-zinc-100 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-6 md:space-y-8">
          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-medium text-zinc-600">Monthly Investment</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 font-bold">₹</span>
                <input
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "") setMonthlyInvestment("");
                    else setMonthlyInvestment(Math.min(1000000, Math.max(0, Number(val))));
                  }}
                  onFocus={(e) => e.target.select()}
                  onBlur={() => {
                    if (monthlyInvestment === "") setMonthlyInvestment(5000);
                  }}
                  className="w-28 md:w-32 pl-7 pr-3 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600 font-bold outline-none focus:ring-2 focus:ring-emerald-200 transition-all text-sm md:text-base"
                />
              </div>
            </div>
            <input
              type="range"
              min="100"
              max="100000"
              step="100"
              value={Number(monthlyInvestment) > 100000 ? 100000 : Number(monthlyInvestment)}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full h-2 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-4">
              <label className="text-sm font-medium text-zinc-600">Annual Step-up (%)</label>
              <span className="text-emerald-600 font-bold">{annualStepUp}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={annualStepUp}
              onChange={(e) => setAnnualStepUp(Number(e.target.value))}
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

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-50">
            <div>
              <p className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-wider mb-1">Invested Amount</p>
              <p className="text-lg md:text-xl font-bold text-zinc-900">{formatCurrency(results.totalInvestment)}</p>
            </div>
            <div>
              <p className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-wider mb-1">Estimated Returns</p>
              <p className="text-lg md:text-xl font-bold text-zinc-900">{formatCurrency(results.estimatedReturns)}</p>
            </div>
            <div className="col-span-2 pt-4">
              <p className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-wider mb-1">Total Value</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-600">{formatCurrency(results.totalValue)}</p>
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
                  <linearGradient id="colorValueStep" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#71717a'}} />
                <YAxis hide />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValueStep)" strokeWidth={2} />
                <Area type="monotone" dataKey="invested" stroke="#064e3b" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorStepUpSIP;
