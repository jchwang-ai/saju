import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, FileText, Compass } from 'lucide-react';
import { generateAtmosphereImage } from '../services/geminiService';

export const Header: React.FC<{ onHome: () => void; onTarot: () => void }> = ({ onHome, onTarot }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-bg/90 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button 
          onClick={onHome}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20 group-hover:border-brand-gold/40 transition-colors">
            <Sparkles className="w-5 h-5 text-brand-gold" />
          </div>
          <span className="text-xl font-serif font-bold tracking-widest text-white">明運</span>
        </button>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <button onClick={onHome} className="hover:text-brand-gold transition-colors cursor-pointer">홈</button>
          <button onClick={onTarot} className="hover:text-brand-gold transition-colors cursor-pointer">오늘의 타로</button>
          <a href="#features" className="hover:text-brand-gold transition-colors">서비스 특징</a>
          <a href="#how-to" className="hover:text-brand-gold transition-colors">이용 방법</a>
        </nav>
        
        <div className="flex items-center gap-4">
          <span className="text-xs text-brand-gold/80 hidden sm:inline-block font-bold tracking-widest">PREMIUM REPORT</span>
        </div>
      </div>
    </header>
  );
};

export const Hero: React.FC<{ onSajuStart: () => void; onTarotStart: () => void }> = ({ onSajuStart, onTarotStart }) => {
  const [sajuImg, setSajuImg] = useState<string>("https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&q=80&w=1200");
  const [tarotImg, setTarotImg] = useState<string>("https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=1200");

  useEffect(() => {
    const loadImages = async () => {
      const sImg = await generateAtmosphereImage("A high-end, luxury oriental traditional painting style background for Saju destiny analysis. Gold and deep ink colors, mystical mountains and clouds, premium texture.");
      const tImg = await generateAtmosphereImage("A mystical, cosmic, luxury tarot card reading background. Deep indigo and violet colors, sparkling stars, nebula, mysterious and high-end atmosphere.");
      setSajuImg(sImg);
      setTarotImg(tImg);
    };
    loadImages();
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col md:flex-row overflow-hidden">
      {/* Central VS Badge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 hidden md:flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 12, delay: 0.5 }}
          className="w-24 h-24 rounded-full bg-white border-8 border-[#f5f2ed] flex items-center justify-center shadow-2xl"
        >
          <div className="w-full h-full rounded-full border-2 border-brand-gold flex items-center justify-center bg-brand-bg">
            <span className="text-2xl font-serif font-bold gold-gradient italic drop-shadow-sm">VS</span>
          </div>
        </motion.div>
      </div>

      {/* Saju Side (Traditional Luxury - Light/Gold) */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ flex: 1.5 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center group cursor-pointer overflow-hidden min-h-[50vh] md:min-h-0 bg-[#f5f2ed]"
        onClick={onSajuStart}
      >
        {/* Background Image with Traditional Texture Overlay */}
        <div className="absolute inset-0 -z-10">
          <img 
            src={sajuImg} 
            alt="Traditional Saju" 
            className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000 grayscale-[0.2]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f5f2ed] via-[#f5f2ed]/70 to-transparent" />
          <div className="absolute inset-0 border-[20px] border-white/30 pointer-events-none" />
        </div>

        <div className="relative z-10 space-y-8 max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-5 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-[11px] font-bold tracking-[0.3em] uppercase shadow-sm"
          >
            Destiny & Lineage
          </motion.div>
          
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight text-slate-900 drop-shadow-sm">
              명품 <span className="gold-gradient-dark">사주</span><br />
              분석 리포트
            </h2>
            <p className="text-slate-800 text-base md:text-lg leading-relaxed font-semibold">
              수천 년의 지혜가 담긴 명리학으로<br />
              당신의 인생 지도를 정교하게 그려냅니다.
            </p>
          </div>

          <div className="pt-6">
            <button className="gold-button px-12 py-5 rounded-full text-base font-bold tracking-tight shadow-xl shadow-brand-gold/20 group-hover:shadow-brand-gold/40 transition-all transform group-hover:-translate-y-1">
              사주 분석 시작하기
            </button>
          </div>
        </div>

        {/* Traditional Pattern Accent */}
        <div className="absolute bottom-12 left-12 w-32 h-32 border border-brand-gold/10 rounded-full opacity-50 group-hover:rotate-90 transition-transform duration-1000" />
      </motion.div>

      {/* Tarot Side (Mystical Luxury - Dark/Indigo) */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ flex: 1.5 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="relative flex-1 flex flex-col items-center justify-center p-8 md:p-12 text-center group cursor-pointer overflow-hidden min-h-[50vh] md:min-h-0 bg-[#050505]"
        onClick={onTarotStart}
      >
        {/* Background Image with Cosmic Overlay */}
        <div className="absolute inset-0 -z-10">
          <img 
            src={tarotImg} 
            alt="Mystical Tarot" 
            className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#050505] via-[#050505]/80 to-transparent" />
          <div className="absolute inset-0 border-[20px] border-white/5 pointer-events-none" />
        </div>

        <div className="relative z-10 space-y-8 max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold tracking-[0.3em] uppercase shadow-sm"
          >
            Intuition & Magic
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight text-white drop-shadow-lg">
              신비한 <span className="text-indigo-400">타로</span><br />
              오늘의 운세
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed font-semibold drop-shadow-md">
              당신의 직관이 선택한 한 장의 카드,<br />
              우주가 전하는 오늘의 특별한 메시지.
            </p>
          </div>

          <div className="pt-6">
            <button className="px-12 py-5 rounded-full bg-indigo-600 text-white font-bold text-base tracking-tight shadow-xl shadow-indigo-500/20 hover:bg-indigo-500 group-hover:shadow-indigo-500/40 transition-all transform group-hover:-translate-y-1">
              타로 카드 뽑기
            </button>
          </div>
        </div>

        {/* Cosmic Sparkle Accent */}
        <div className="absolute top-12 right-12 opacity-30 group-hover:scale-125 transition-transform duration-700">
          <Sparkles className="w-12 h-12 text-indigo-300 animate-pulse" />
        </div>
      </motion.div>
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

