/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header, Hero, Services } from './components/Landing';
import { Instagram, Facebook } from 'lucide-react';
import CalculatorSIP from './components/CalculatorSIP';
import CalculatorLumpSum from './components/CalculatorLumpSum';
import CalculatorStepUpSIP from './components/CalculatorStepUpSIP';
import CalculatorHybrid from './components/CalculatorHybrid';
import CalculatorSWP from './components/CalculatorSWP';
import CalculatorPresentValue from './components/CalculatorPresentValue';
import CalculatorInflation from './components/CalculatorInflation';
import CalculatorInfo from './components/CalculatorInfo';
import ConsultationModal from './components/ConsultationModal';
import GoalPlanningModal from './components/GoalPlanningModal';
import CustomMFPortfolioModal from './components/CustomMFPortfolioModal';
import DiversificationModal from './components/DiversificationModal';
import StrategicDecisionModal from './components/StrategicDecisionModal';
import ChatbotModal from './components/ChatbotModal';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './components/Logo';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'calculators'>('home');
  const [activeTab, setActiveTab] = useState<'sip' | 'lumpsum' | 'stepup' | 'hybrid' | 'swp' | 'presentvalue' | 'inflation'>('sip');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isCustomMFModalOpen, setIsCustomMFModalOpen] = useState(false);
  const [isDiversificationModalOpen, setIsDiversificationModalOpen] = useState(false);
  const [isStrategicDecisionModalOpen, setIsStrategicDecisionModalOpen] = useState(false);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);
  const [realTimeRate, setRealTimeRate] = useState<number | null>(null);
  const [isLoadingRate, setIsLoadingRate] = useState(false);

  React.useEffect(() => {
    if (activeTab === 'inflation' && !realTimeRate) {
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
    }
  }, [activeTab, realTimeRate]);

  const handleNavigate = (page: 'home' | 'calculators', section?: string) => {
    setCurrentPage(page);
    
    if (section) {
      // Small delay to allow the page to switch if needed before scrolling
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900">
      <Header 
        onBookConsultation={() => setIsModalOpen(true)} 
        onOpenChat={() => setIsChatbotModalOpen(true)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Hero onBookConsultation={() => setIsModalOpen(true)} onNavigate={handleNavigate} />
            <Services 
              onGoalPlanning={() => setIsGoalModalOpen(true)} 
              onCustomMFPortfolio={() => setIsCustomMFModalOpen(true)}
              onDiversification={() => setIsDiversificationModalOpen(true)}
              onStrategicDecision={() => setIsStrategicDecisionModalOpen(true)}
            />
            <section id="about" className="py-16 md:py-24 bg-white border-t border-zinc-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8 text-center">Why Choose WealthCodes?</h2>
                  <div className="space-y-4 md:space-y-8">
                    {[
                      { title: "Personalized Advice", desc: "No two investors are the same. We tailor our advice to your unique financial situation." },
                      { title: "Transparency", desc: "Full disclosure of all costs and potential risks involved in your investments." },
                      { title: "Regular Reviews", desc: "We don't just invest and forget. We monitor and rebalance your portfolio as needed." }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 md:gap-6 items-start p-5 md:p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-emerald-100">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="text-base md:text-lg font-bold text-zinc-900 mb-1">{item.title}</h4>
                          <p className="text-zinc-600 text-sm md:text-base leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="calculators"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-24"
          >
            <section id="calculators" className="py-16 md:py-24 bg-zinc-50 min-h-[80vh]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">Investment Planning Tools</h2>
                  <p className="text-zinc-600 text-sm md:text-base">Plan your future with our precise financial calculators.</p>
                </div>

                <div className="flex justify-start md:justify-center mb-8 md:mb-12 -mx-4 px-4 overflow-x-auto no-scrollbar">
                  <div className="inline-flex p-1 bg-zinc-200/50 rounded-2xl md:rounded-full backdrop-blur-sm">
                    {[
                      { id: 'sip', label: 'SIP' },
                      { id: 'lumpsum', label: 'Lump Sum' },
                      { id: 'stepup', label: 'Step-up SIP' },
                      { id: 'hybrid', label: 'Hybrid (SIP + Lump Sum)' },
                      { id: 'swp', label: 'SWP' },
                      { id: 'presentvalue', label: 'Target Amount (PV)' },
                      { id: 'inflation', label: 'Inflation' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={cn(
                          "px-4 md:px-6 py-2 rounded-xl md:rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer whitespace-nowrap",
                          activeTab === tab.id
                            ? "bg-white text-emerald-600 shadow-sm"
                            : "text-zinc-500 hover:text-zinc-700"
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <CalculatorInfo 
                  activeTab={activeTab} 
                  realTimeRate={realTimeRate}
                  isLoadingRate={isLoadingRate}
                />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === 'sip' && <CalculatorSIP />}
                    {activeTab === 'lumpsum' && <CalculatorLumpSum />}
                    {activeTab === 'stepup' && <CalculatorStepUpSIP />}
                    {activeTab === 'hybrid' && <CalculatorHybrid />}
                    {activeTab === 'swp' && <CalculatorSWP />}
                    {activeTab === 'presentvalue' && <CalculatorPresentValue />}
                    {activeTab === 'inflation' && (
                      <CalculatorInflation 
                        realTimeRate={realTimeRate} 
                        isLoadingRate={isLoadingRate} 
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <ConsultationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <GoalPlanningModal 
        isOpen={isGoalModalOpen} 
        onClose={() => setIsGoalModalOpen(false)} 
        onBookConsultation={() => setIsModalOpen(true)}
      />

      <CustomMFPortfolioModal 
        isOpen={isCustomMFModalOpen} 
        onClose={() => setIsCustomMFModalOpen(false)} 
        onBookConsultation={() => setIsModalOpen(true)}
      />

      <DiversificationModal 
        isOpen={isDiversificationModalOpen} 
        onClose={() => setIsDiversificationModalOpen(false)} 
        onBookConsultation={() => setIsModalOpen(true)}
      />

      <StrategicDecisionModal 
        isOpen={isStrategicDecisionModalOpen} 
        onClose={() => setIsStrategicDecisionModalOpen(false)} 
        onBookConsultation={() => setIsModalOpen(true)}
      />

      <ChatbotModal 
        isOpen={isChatbotModalOpen} 
        onClose={() => setIsChatbotModalOpen(false)} 
      />

      <footer className="bg-zinc-900 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12 md:mb-16">
            <div className="md:col-span-2">
              <button 
                onClick={() => handleNavigate('home')}
                className="flex items-center gap-2 mb-6 text-emerald-500 cursor-pointer"
              >
                <Logo className="w-10 h-10" />
                <span className="text-xl font-bold tracking-tight text-white">WealthCodes</span>
              </button>
              <p className="text-zinc-400 max-w-sm text-sm md:text-base">
                Empowering individuals to achieve financial freedom through disciplined investing and expert guidance.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-0">
              <div>
                <h4 className="font-bold mb-4 md:mb-6">Quick Links</h4>
                <ul className="space-y-3 md:space-y-4 text-zinc-400 text-sm">
                  <li>
                    <button 
                      onClick={() => handleNavigate('calculators')}
                      className="hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      Calculators
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleNavigate('home', 'services')}
                      className="hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      Services
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => handleNavigate('home', 'about')}
                      className="hover:text-emerald-400 transition-colors cursor-pointer"
                    >
                      About Us
                    </button>
                  </li>
                </ul>
              </div>
              <div className="md:mt-8">
                <h4 className="font-bold mb-4 md:mb-6">Contact</h4>
                <ul className="space-y-3 md:space-y-4 text-zinc-400 text-sm">
                  <li>
                    <a href="mailto:contactwealthcodes@gmail.com" className="hover:text-emerald-400 transition-colors break-all">
                      contactwealthcodes@gmail.com
                    </a>
                  </li>
                  <li>Kolkata, India</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <h4 className="font-bold mb-6 hidden md:block">Social</h4>
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/_wealthcodes_?igsh=am5nZGR1b2dmbnJw" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-zinc-400 hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-lg"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.facebook.com/share/1AApWyTLAj/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-zinc-400 hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-lg"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800 text-center">
            <p className="text-emerald-500 font-medium text-sm">We are AMFI registered</p>
            <p className="mb-2 text-emerald-400/80 text-xs font-medium">AMFI Registration Number - 358165</p>
            <p className="text-zinc-400 text-sm">&copy; 2026 WealthCodes Mutual Fund Advisory. All rights reserved.</p>
            <div className="mt-6 p-4 bg-zinc-800/50 rounded-2xl border border-zinc-800 inline-block max-w-2xl w-full">
              <p className="text-zinc-200 text-xs md:text-sm font-medium leading-relaxed">
                <span className="text-amber-400 font-bold mr-1">Disclaimer:</span>
                Mutual fund investments are subject to market risks. Read all scheme related documents carefully before investing.
                <br />
                Past performance of the schemes is neither an indicator nor a guarantee of future performance.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

