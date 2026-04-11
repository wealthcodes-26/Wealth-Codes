import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BarChart3, PieChart, ShieldCheck, Zap } from 'lucide-react';

interface CustomMFPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookConsultation: () => void;
}

const CustomMFPortfolioModal = ({ isOpen, onClose, onBookConsultation }: CustomMFPortfolioModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
            className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 transition-colors z-10 rounded-full hover:bg-zinc-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
                  <BarChart3 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">Custom MF Portfolio</h3>
                  <p className="text-zinc-500 text-sm sm:text-base">Optimized allocation for balanced growth.</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
                  We don't just pick funds; we build a strategic Mutual Fund portfolio that works in harmony with your existing investments to maximize efficiency and minimize overlap.
                </p>

                <div className="space-y-6">
                  <h4 className="font-bold text-zinc-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                    Our Methodology:
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { 
                        icon: <PieChart className="w-5 h-5" />, 
                        title: "Stock Portfolio Analysis", 
                        desc: "We analyze your actual stock holdings to identify sector concentration and potential risks." 
                      },
                      { 
                        icon: <Zap className="w-5 h-5" />, 
                        title: "Smart MF Allocation", 
                        desc: "Based on your stocks, we allocate MFs that complement rather than duplicate your exposure." 
                      },
                      { 
                        icon: <ShieldCheck className="w-5 h-5" />, 
                        title: "Risk-Adjusted Rebalancing", 
                        desc: "Regular monitoring to ensure your total portfolio (Stocks + MF) stays within risk limits." 
                      },
                      { 
                        icon: <BarChart3 className="w-5 h-5" />, 
                        title: "Performance Tracking", 
                        desc: "Consolidated reporting of your entire wealth growth journey with clear insights." 
                      }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-5 p-5 rounded-2xl bg-zinc-50 border border-zinc-100 group hover:bg-white hover:shadow-lg hover:border-emerald-100 transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300 shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h5 className="text-base font-bold text-zinc-900 mb-1">{item.title}</h5>
                          <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6 pt-2">
                  <p className="text-sm text-zinc-500 italic text-center">
                    Want a portfolio that truly reflects your financial goals? Let's connect.
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onBookConsultation();
                    }}
                    className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomMFPortfolioModal;
