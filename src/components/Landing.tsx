import React, { useState } from 'react';
import { PieChart, Target, BarChart3, TrendingUp, Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const Header = ({ 
  onBookConsultation, 
  onOpenChat, 
  onOpenPartners,
  onNavigate,
  currentPage 
}: { 
  onBookConsultation: () => void; 
  onOpenChat: () => void;
  onOpenPartners: () => void;
  onNavigate: (page: 'home' | 'calculators', section?: string) => void;
  currentPage: 'home' | 'calculators';
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileNavigate = (page: 'home' | 'calculators', section?: string) => {
    onNavigate(page, section);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button 
            onClick={() => handleMobileNavigate('home')}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Logo className="w-10 h-10" />
            <span className="text-xl font-bold text-zinc-900 tracking-tight">WealthCodes</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => onNavigate('calculators')}
              className={`text-sm font-medium transition-colors cursor-pointer ${currentPage === 'calculators' ? 'text-emerald-600' : 'text-zinc-600 hover:text-emerald-600'}`}
            >
              Calculators
            </button>
            <button 
              onClick={() => onNavigate('home', 'services')}
              className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Services
            </button>
            <button 
              onClick={() => onNavigate('home', 'about')}
              className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              About
            </button>
            <button 
              onClick={onOpenPartners}
              className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors cursor-pointer"
            >
              Our Partners
            </button>
            <button 
              onClick={onOpenChat}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AI Chat
            </button>
            <button 
              onClick={onBookConsultation}
              className="bg-zinc-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all cursor-pointer"
            >
              Book a Free Consultation
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-600 hover:text-emerald-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-zinc-100 py-4 px-4 space-y-4 shadow-xl">
          <button 
            onClick={() => handleMobileNavigate('calculators')}
            className={`block w-full text-left px-4 py-2 rounded-xl text-sm font-medium ${currentPage === 'calculators' ? 'bg-emerald-50 text-emerald-600' : 'text-zinc-600'}`}
          >
            Calculators
          </button>
          <button 
            onClick={() => handleMobileNavigate('home', 'services')}
            className="block w-full text-left px-4 py-2 rounded-xl text-sm font-medium text-zinc-600"
          >
            Services
          </button>
          <button 
            onClick={() => handleMobileNavigate('home', 'about')}
            className="block w-full text-left px-4 py-2 rounded-xl text-sm font-medium text-zinc-600"
          >
            About
          </button>
          <button 
            onClick={() => {
              onOpenPartners();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 rounded-xl text-sm font-medium text-zinc-600"
          >
            Our Partners
          </button>
          <button 
            onClick={() => {
              onOpenChat();
              setIsMenuOpen(false);
            }}
            className="block w-full text-left px-4 py-2 rounded-xl text-sm font-medium text-emerald-600"
          >
            AI Chat
          </button>
          <button 
            onClick={() => {
              onBookConsultation();
              setIsMenuOpen(false);
            }}
            className="block w-full text-center bg-zinc-900 text-white py-3 rounded-xl text-sm font-medium"
          >
            Book a Free Consultation
          </button>
        </div>
      )}
    </header>
  );
};

const Hero = ({ onBookConsultation, onNavigate }: { onBookConsultation: () => void; onNavigate: (page: 'home' | 'calculators', section?: string) => void }) => (
  <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-zinc-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl md:text-7xl font-bold text-zinc-900 tracking-tight mb-6 leading-tight">
        Grow Your Wealth with <br className="hidden md:block" />
        <span className="text-emerald-600 italic">WealthCodes</span>
      </h1>
      <p className="max-w-2xl mx-auto text-base md:text-lg text-zinc-600 mb-8 md:text-lg text-zinc-600 mb-10">
        Expert Advisory to Grow Your Wealth with WealthCodes and personalized strategies designed for long-term wealth creation.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button 
          onClick={() => onNavigate('calculators')}
          className="w-full sm:w-auto bg-emerald-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 cursor-pointer"
        >
          Try Calculators
        </button>
        <button 
          onClick={onBookConsultation}
          className="w-full sm:w-auto bg-zinc-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-800 transition-all cursor-pointer"
        >
          Book a Free Consultation
        </button>
      </div>
    </div>
  </section>
);

const Services = ({ 
  onGoalPlanning, 
  onCustomMFPortfolio,
  onDiversification,
  onStrategicDecision
}: { 
  onGoalPlanning: () => void; 
  onCustomMFPortfolio: () => void;
  onDiversification: () => void;
  onStrategicDecision: () => void;
}) => (
  <section id="services" className="py-16 md:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 md:text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">Our Advisory Services</h2>
        <p className="text-zinc-600 text-sm md:text-base">Tailored financial solutions for every stage of your life.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6">
        {[
          {
            icon: <PieChart className="w-6 h-6 text-emerald-600" />,
            title: "Portfolio Diversification & Risk Assessment",
            desc: "Strategic allocation and risk profiling to build a balanced portfolio that matches your comfort level.",
            isClickable: true,
            onClick: onDiversification
          },
          {
            icon: <Target className="w-6 h-6 text-emerald-600" />,
            title: "Goal-Based Planning",
            desc: "Whether it's retirement, education, or a dream home, we plan for your specific milestones.",
            isClickable: true,
            onClick: onGoalPlanning
          },
          {
            icon: <BarChart3 className="w-6 h-6 text-emerald-600" />,
            title: "Custom MF Portfolio",
            desc: "We build a customized mutual fund portfolio that complements your existing stock holdings for optimal balance.",
            isClickable: true,
            onClick: onCustomMFPortfolio
          },
          {
            icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
            title: "Strategic Decision",
            desc: "Expert guidance on SIP, STP, and SWP plans to create robust investment strategies.",
            isClickable: true,
            onClick: onStrategicDecision
          }
        ].map((s, i) => (
          <div 
            key={i} 
            onClick={s.isClickable ? s.onClick : undefined}
            className={`p-6 rounded-2xl border border-zinc-100 hover:border-emerald-100 hover:bg-emerald-50/30 transition-all group ${s.isClickable ? 'cursor-pointer' : ''}`}
          >
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              {s.icon}
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-3 leading-tight">{s.title}</h3>
            <p className="text-zinc-600 text-sm leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export { Header, Hero, Services };
