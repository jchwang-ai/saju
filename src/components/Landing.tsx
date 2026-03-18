import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, FileText, Compass } from 'lucide-react';

export const Header: React.FC<{ onHome: () => void }> = ({ onHome }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button 
          onClick={onHome}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20 group-hover:border-brand-gold/40 transition-colors">
            <Sparkles className="w-5 h-5 text-brand-gold" />
          </div>
          <span className="text-xl font-serif font-bold tracking-widest text-brand-ink">明運</span>
        </button>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-ink/60">
          <button onClick={onHome} className="hover:text-brand-gold transition-colors">홈</button>
          <a href="#features" className="hover:text-brand-gold transition-colors">서비스 특징</a>
          <a href="#how-to" className="hover:text-brand-gold transition-colors">이용 방법</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <span className="text-xs text-brand-gold/60 hidden sm:inline-block font-medium tracking-tighter">PREMIUM SAJU REPORT</span>
        </div>
      </div>
    </header>
  );
};

export const Hero: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <section className="relative pt-40 pb-20 px-6 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px]" />
        <div className="absolute top-40 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold tracking-widest mb-8 uppercase">
            Traditional Wisdom meets Modern Insight
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-8">
            당신의 타고난 <span className="gold-gradient">기질</span>과<br />
            운명의 <span className="gold-gradient">흐름</span>을 읽다
          </h1>
          <p className="text-lg md:text-xl text-brand-ink/70 leading-relaxed mb-12 max-w-2xl mx-auto">
            복잡하고 어려운 사주 풀이 대신, <br className="hidden sm:block" />
            현대적인 감각으로 재해석한 당신만의 프리미엄 사주 리포트를 만나보세요.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="gold-button px-10 py-5 rounded-full text-lg font-bold tracking-tight"
          >
            내 사주 리포트 확인하기
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="mt-24 flex justify-center opacity-20">
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 border border-brand-gold rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute inset-4 border border-brand-gold/50 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          <div className="absolute inset-8 border border-brand-gold/30 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-32 bg-gradient-to-b from-transparent via-brand-gold to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export const TrustPoints: React.FC = () => {
  const points = [
    {
      title: "정교한 명리 분석",
      desc: "수천 년간 이어온 명리학의 정수를 현대적 알고리즘으로 분석합니다.",
      icon: ShieldCheck
    },
    {
      title: "직관적인 리포트",
      desc: "어려운 한자어 대신 누구나 이해하기 쉬운 명확한 문장으로 설명합니다.",
      icon: FileText
    },
    {
      title: "다각도 운세 진단",
      desc: "성격, 재물, 연애, 직업 등 삶의 주요 영역을 심도 있게 다룹니다.",
      icon: Compass
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-brand-slate/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">왜 명운(明運)인가요?</h2>
          <p className="text-brand-ink/60">신뢰할 수 있는 분석과 현대적인 통찰을 제공합니다.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {points.map((point, idx) => (
            <div key={idx} className="glass-card p-8 hover:border-brand-gold/30 transition-all duration-500 group">
              <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <point.icon className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="text-xl font-bold mb-4">{point.title}</h3>
              <p className="text-brand-ink/60 leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

