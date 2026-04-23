import React from 'react';
import { X, Building2, Landmark } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PartnersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const empanelmentPartners = [
  "Axis Mutual Fund",
  "Kotak Mutual Fund",
  "SBI Mutual Fund",
  "ICICI Mutual Fund",
  "HDFC Mutual Fund",
  "Nippon Mutual Fund",
  "Motilal Oswal Mutual Fund",
];

const rtaPartners = [
  { name: "Kfintech" },
  { name: "CAMS", fullName: "Computer Age Management Services" },
];

const PartnersModal = ({ isOpen, onClose }: PartnersModalProps) => {
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
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <Landmark className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-zinc-900">Our Partners</h2>
                  <p className="text-xs text-zinc-500">Official Empanelments & Registrar Agencies</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-6 h-6 text-zinc-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-12 custom-scrollbar">
              {/* Empanelment Partners */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-zinc-900">Our Empanelment</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {empanelmentPartners.map((name, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 p-4 rounded-xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:shadow-md hover:border-emerald-100 transition-all duration-300"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                      <span className="text-sm font-bold text-zinc-700">{name}</span>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* RTA Section */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                  <h3 className="text-xl font-bold text-zinc-900">Registrar & Transfer Agencies (RTA)</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {rtaPartners.map((rta, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.05 }}
                      className="flex flex-col p-5 rounded-2xl border border-zinc-100 bg-zinc-50/50 hover:bg-white hover:shadow-md hover:border-emerald-100 transition-all duration-300 group"
                    >
                      <span className="text-lg font-bold text-zinc-900 leading-none mb-1.5 group-hover:text-emerald-600 transition-colors">{rta.name}</span>
                      {rta.fullName && <span className="text-xs text-zinc-500 font-medium">{rta.fullName}</span>}
                    </motion.div>
                  ))}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-zinc-100 bg-zinc-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-emerald-600 font-semibold flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                AMFI Registered Mutual Fund Advisor
              </p>
              <p className="text-xs text-zinc-500 italic">
                Empanelled with leading AMCs to serve you better.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PartnersModal;
