import React, { useState } from 'react';
import { Header, Hero, TrustPoints } from './components/Landing';
import { SajuForm } from './components/SajuForm';
import { SajuResultPage } from './components/SajuResult';
import { TarotSection } from './components/Tarot';
import { UserInput, SajuResult } from './types';
import { analyzeSaju } from './services/geminiService';
import { motion, AnimatePresence } from 'motion/react';

type Page = 'landing' | 'form' | 'result' | 'tarot';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [userInput, setUserInput] = useState<UserInput | null>(null);
  const [result, setResult] = useState<SajuResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setCurrentPage('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTarotStart = () => {
    setCurrentPage('tarot');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHome = () => {
    setCurrentPage('landing');
    setResult(null);
    setUserInput(null);
  };

  const handleSubmit = async (input: UserInput) => {
    setIsLoading(true);
    setUserInput(input);
    try {
      const sajuResult = await analyzeSaju(input);
      setResult(sajuResult);
      setCurrentPage('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert(error instanceof Error ? error.message : '분석 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg selection:bg-brand-gold/30">
      <Header onHome={handleHome} onTarot={handleTarotStart} />
      
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {currentPage === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onSajuStart={handleStart} onTarotStart={handleTarotStart} />
              <TrustPoints />
              
              {/* Additional Landing Sections */}
              <section id="how-to" className="py-24 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-serif font-bold mb-16">이용 방법</h2>
                  <div className="grid md:grid-cols-3 gap-12">
                    {[
                      { step: "01", title: "정보 입력", desc: "이름과 생년월일, 태어난 시간을 입력합니다." },
                      { step: "02", title: "사주 분석", desc: "명리학 데이터와 AI가 만나 정교하게 분석합니다." },
                      { step: "03", title: "결과 확인", desc: "당신만을 위한 프리미엄 리포트를 확인하세요." }
                    ].map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="text-5xl font-serif font-bold text-brand-gold/10 absolute -top-8 left-1/2 -translate-x-1/2">
                          {item.step}
                        </div>
                        <h3 className="text-xl font-bold mb-4 relative z-10">{item.title}</h3>
                        <p className="text-brand-ink/60 text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="py-24 px-6 bg-brand-gold/5 border-y border-brand-gold/10">
                <div className="max-w-4xl mx-auto text-center">
                  <blockquote className="text-2xl md:text-3xl font-serif italic text-brand-gold-light leading-relaxed mb-8">
                    "운명은 정해진 결론이 아니라, <br className="hidden sm:block" />
                    나를 더 깊이 이해하고 나아갈 방향을 찾는 나침반입니다."
                  </blockquote>
                  <p className="text-brand-ink/40 text-sm uppercase tracking-widest">Premium Saju Platform - Myeong-Un</p>
                </div>
              </section>
            </motion.div>
          )}

          {currentPage === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SajuForm onSubmit={handleSubmit} isLoading={isLoading} />
            </motion.div>
          )}

          {currentPage === 'tarot' && (
            <motion.div
              key="tarot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <TarotSection />
            </motion.div>
          )}

          {currentPage === 'result' && result && userInput && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SajuResultPage 
                result={result} 
                input={userInput} 
                onReset={() => setCurrentPage('form')} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center">
              <div className="w-3 h-3 text-brand-gold" />
            </div>
            <span className="text-sm font-serif font-bold tracking-widest">明運</span>
          </div>
          <p className="text-xs text-brand-ink/30">
            © 2026 Myeong-Un Premium Saju. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

