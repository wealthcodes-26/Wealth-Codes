import React from 'react';
import { X, Lightbulb, CheckCircle2, ArrowUpRight, Repeat, ArrowRightLeft, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StrategicDecisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookConsultation: () => void;
}

const StrategicDecisionModal = ({ isOpen, onClose, onBookConsultation }: StrategicDecisionModalProps) => {
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
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
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
                  <Lightbulb className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">Strategic Decision</h2>
                  <p className="text-zinc-500 text-sm sm:text-base">Crafting the perfect roadmap for your wealth</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-100/50 transition-colors">
                  <Repeat className="w-6 h-6 text-emerald-600 mb-3" />
                  <h4 className="font-bold text-zinc-900 text-base mb-1">SIP</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Systematic Investment Plan for disciplined wealth creation.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-100 hover:bg-zinc-100 transition-colors">
                  <ArrowRightLeft className="w-6 h-6 text-emerald-600 mb-3" />
                  <h4 className="font-bold text-zinc-900 text-base mb-1">STP</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Systematic Transfer Plan to shift funds wisely between schemes.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-100/50 transition-colors">
                  <Wallet className="w-6 h-6 text-emerald-600 mb-3" />
                  <h4 className="font-bold text-zinc-900 text-base mb-1">SWP</h4>
                  <p className="text-xs text-zinc-600 leading-relaxed">
                    Systematic Withdrawal Plan for regular, tax-efficient income.
                  </p>
                </div>
              </div>

              <div className="bg-zinc-50/50 p-6 sm:p-8 rounded-2xl border border-zinc-100 mb-10">
                <h4 className="font-bold text-zinc-900 flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Our Strategic Approach:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Customized SIP ladders",
                    "Tax-efficient STP routes",
                    "Inflation-adjusted SWP",
                    "Dynamic asset rebalancing",
                    "Market-linked entry strategies",
                    "Goal-specific plan selection"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm sm:text-base text-zinc-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onBookConsultation();
                  }}
                  className="w-full sm:w-auto min-w-[280px] bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Build My Strategy
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

export default StrategicDecisionModal;
