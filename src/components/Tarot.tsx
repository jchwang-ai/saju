import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeTarot } from '../services/geminiService';
import { TarotResult } from '../types';
import { Loader2, RefreshCw, Share2, Download, Sparkles } from 'lucide-react';

const TAROT_CARDS = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement", "The World"
];

export const TarotSection: React.FC = () => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [result, setResult] = useState<TarotResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePickCard = async () => {
    setIsShuffling(true);
    // Simulate shuffling
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsShuffling(false);

    const randomCard = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    setSelectedCard(randomCard);
    
    setIsLoading(true);
    try {
      const tarotResult = await analyzeTarot(randomCard);
      setResult(tarotResult);
    } catch (error) {
      alert("타로 분석 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedCard(null);
    setResult(null);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다. 친구들과 공유해보세요!');
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <AnimatePresence mode="wait">
        {!selectedCard ? (
          <motion.div
            key="pick"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-12"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-serif font-bold gold-gradient">오늘의 타로</h2>
              <p className="text-brand-ink/60">마음을 가다듬고, 당신의 운명을 상징하는 카드 한 장을 선택하세요.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 py-8">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="w-32 h-52 glass-card border-brand-gold/30 flex items-center justify-center cursor-pointer relative group overflow-hidden"
                  onClick={handlePickCard}
                >
                  <div className="absolute inset-0 bg-brand-gold/5 group-hover:bg-brand-gold/10 transition-colors" />
                  <Sparkles className="w-8 h-8 text-brand-gold/20 group-hover:text-brand-gold/40 transition-colors" />
                </motion.div>
              ))}
            </div>

            <button
              onClick={handlePickCard}
              disabled={isShuffling}
              className="gold-button px-12 py-4 rounded-full font-bold text-lg disabled:opacity-50"
            >
              {isShuffling ? "카드를 섞는 중..." : "카드 뽑기"}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12"
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <Loader2 className="w-12 h-12 text-brand-gold animate-spin" />
                <div className="text-center">
                  <p className="text-xl font-serif font-bold text-brand-gold-light">운명의 카드를 해석하는 중...</p>
                  <p className="text-sm text-brand-ink/40 mt-2">AI가 당신을 위한 특별한 이미지를 그리고 있습니다.</p>
                </div>
              </div>
            ) : result && (
              <div className="space-y-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="aspect-[2/3] max-w-sm mx-auto w-full rounded-2xl overflow-hidden border-2 border-brand-gold/30 shadow-2xl shadow-brand-gold/20 relative group"
                  >
                    {result.imageUrl ? (
                      <img 
                        src={result.imageUrl} 
                        alt={result.cardName} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full bg-brand-slate flex items-center justify-center text-brand-gold/20">
                        <Sparkles className="w-20 h-20" />
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-brand-bg to-transparent">
                      <h3 className="text-2xl font-serif font-bold text-brand-gold-light">{result.cardName}</h3>
                    </div>
                  </motion.div>

                  <div className="space-y-8">
                    <div className="space-y-2">
                      <span className="text-brand-gold font-bold tracking-widest text-xs uppercase">Card Meaning</span>
                      <h2 className="text-3xl font-serif font-bold leading-tight">
                        {result.meaning}
                      </h2>
                    </div>

                    <div className="glass-card p-6 space-y-4">
                      <h4 className="font-bold text-brand-gold-light">오늘의 운세 해석</h4>
                      <p className="text-brand-ink/80 leading-relaxed">{result.interpretation}</p>
                    </div>

                    <div className="glass-card p-6 space-y-4 border-brand-gold/20">
                      <h4 className="font-bold text-brand-gold-light">당신을 위한 조언</h4>
                      <p className="text-brand-ink/80 leading-relaxed italic">"{result.advice}"</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                  <button 
                    onClick={handleReset}
                    className="flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-gold text-brand-bg hover:bg-brand-gold-light transition-colors text-sm font-bold"
                  >
                    <RefreshCw className="w-4 h-4" /> 다른 카드 뽑기
                  </button>
                  <button 
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold"
                  >
                    <Share2 className="w-4 h-4" /> 결과 공유하기
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
