import React from 'react';
import { X, Shield, PieChart, Layers, ArrowUpRight, CheckCircle2, AlertTriangle, BarChart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DiversificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookConsultation: () => void;
}

const DiversificationModal = ({ isOpen, onClose, onBookConsultation }: DiversificationModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-zinc-600 transition-colors rounded-full hover:bg-zinc-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center shrink-0">
                  <PieChart className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">Diversification & Risk Assessment</h2>
                  <p className="text-zinc-500 text-sm sm:text-base">Strategic balance for your financial future</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-100/50 transition-colors">
                  <Shield className="w-6 h-6 text-emerald-600 mb-3" />
                  <h4 className="font-bold text-zinc-900 mb-1">Reduce Risk</h4>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Diversification helps cushion your portfolio against market volatility by spreading investments.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-zinc-100 transition-colors">
                  <Layers className="w-6 h-6 text-emerald-600 mb-3" />
                  <h4 className="font-bold text-zinc-900 mb-1">Asset Classes</h4>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    Strategic allocation across Equity, Debt, Gold, and International funds for balance.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100 hover:bg-amber-100/50 transition-colors">
                  <AlertTriangle className="w-6 h-6 text-amber-600 mb-3" />
                  <h4 className="font-bold text-zinc-900 mb-1">Risk Profiling</h4>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    We identify your tolerance level—whether you're Conservative, Balanced, or Aggressive.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-100/50 transition-colors">
                  <BarChart className="w-6 h-6 text-emerald-600 mb-3" />
                  <h4 className="font-bold text-zinc-900 mb-1">Custom Allocation</h4>
                  <p className="text-sm text-zinc-600 leading-relaxed">
                    We design a strategy that balances potential returns with your specific risk profile.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                <div className="bg-zinc-50/50 p-6 rounded-2xl border border-zinc-100">
                  <h4 className="font-bold text-zinc-900 flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Why it Matters:
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Smoother investment journey",
                      "Capital preservation",
                      "Optimized risk-adjusted returns",
                      "Lower portfolio volatility"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-zinc-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-zinc-50/50 p-6 rounded-2xl border border-zinc-100">
                  <h4 className="font-bold text-zinc-900 flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    Our Process:
                  </h4>
                  <ul className="space-y-3">
                    {[
                      "Psychological risk profiling",
                      "Financial capacity analysis",
                      "Investment horizon mapping",
                      "Stress testing portfolios"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-zinc-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    onClose();
                    onBookConsultation();
                  }}
                  className="w-full sm:w-auto min-w-[280px] bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Optimize My Portfolio
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DiversificationModal;
