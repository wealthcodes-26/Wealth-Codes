import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Target } from 'lucide-react';

interface GoalPlanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookConsultation: () => void;
}

const GoalPlanningModal = ({ isOpen, onClose, onBookConsultation }: GoalPlanningModalProps) => {
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
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 leading-tight">Goal-Based Planning</h3>
                  <p className="text-zinc-500 text-sm sm:text-base">Strategic wealth creation for your milestones.</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
                  Our Goal-Based Planning service is designed to align your investments with your life's most important milestones. We take a holistic approach to ensure your financial journey is purposeful and achievable.
                </p>

                <div className="bg-zinc-50 rounded-2xl p-6 sm:p-8 border border-zinc-100">
                  <h4 className="font-bold text-zinc-900 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                    What we analyze:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { label: "Specific Goals", desc: "Retirement, Education, Home" },
                      { label: "Current Income", desc: "Cash flow analysis" },
                      { label: "Saving Capability", desc: "Monthly investible surplus" },
                      { label: "Investment Tenure", desc: "Time horizon for each goal" },
                      { label: "Risk Appetite", desc: "Comfort with market volatility" },
                      { label: "Inflation Impact", desc: "Future value of requirements" }
                    ].map((item, i) => (
                      <li key={i} className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{item.label}</span>
                        <span className="text-sm sm:text-base text-zinc-700 font-medium">{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-6 pt-2">
                  <p className="text-sm text-zinc-500 italic text-center">
                    Ready to start your journey? Book a personalized consultation with our experts.
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

export default GoalPlanningModal;
