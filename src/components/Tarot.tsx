import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeTarotTwoCards, generateTarotCardImage } from '../services/geminiService';
import { TarotResult } from '../types';
import { TypewriterText } from './TypewriterText';
import { Loader2, RefreshCw, Share2, Sparkles, Compass, CheckCircle2, ArrowRight } from 'lucide-react';

const MAJOR_ARCANA_DECK = [
  "The Fool", "The Magician", "The High Priestess", "The Empress", "The Emperor",
  "The Hierophant", "The Lovers", "The Chariot", "Strength", "The Hermit",
  "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
  "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement", "The World"
];

export const TarotSection: React.FC = () => {
  // Generate 10 random cards for the spread on load
  const [spreadCards, setSpreadCards] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [result, setResult] = useState<TarotResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Async card image states
  const [card1Img, setCard1Img] = useState<string>('');
  const [card2Img, setCard2Img] = useState<string>('');
  const [isCard1ImgLoading, setIsCard1ImgLoading] = useState(false);
  const [isCard2ImgLoading, setIsCard2ImgLoading] = useState(false);

  const initSpread = () => {
    const shuffled = [...MAJOR_ARCANA_DECK].sort(() => Math.random() - 0.5);
    setSpreadCards(shuffled.slice(0, 10));
    setSelectedIndices([]);
    setResult(null);
    setCard1Img('');
    setCard2Img('');
  };

  useEffect(() => {
    initSpread();
  }, []);

  const handleSelectCard = (index: number) => {
    if (selectedIndices.includes(index)) return;
    if (selectedIndices.length >= 2) return;

    const newSelected = [...selectedIndices, index];
    setSelectedIndices(newSelected);
  };

  const handleStartAnalysis = async () => {
    if (selectedIndices.length < 2) return;

    const card1Name = spreadCards[selectedIndices[0]];
    const card2Name = spreadCards[selectedIndices[1]];

    setIsLoading(true);
    try {
      // Fast text analysis (1-2s response)
      const tarotResult = await analyzeTarotTwoCards(card1Name, card2Name);
      setResult(tarotResult);
      setIsLoading(false);

      // Trigger parallel async image generation for card 1 & card 2
      setIsCard1ImgLoading(true);
      generateTarotCardImage(card1Name, tarotResult.card1.imagePrompt).then((url) => {
        if (url) setCard1Img(url);
        setIsCard1ImgLoading(false);
      }).catch(() => setIsCard1ImgLoading(false));

      setIsCard2ImgLoading(true);
      generateTarotCardImage(card2Name, tarotResult.card2.imagePrompt).then((url) => {
        if (url) setCard2Img(url);
        setIsCard2ImgLoading(false);
      }).catch(() => setIsCard2ImgLoading(false));

    } catch (error) {
      console.error(error);
      alert("타로 분석 중 오류가 발생했습니다.");
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    initSpread();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다. 친구들과 공유해보세요!');
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <AnimatePresence mode="wait">
        {!result && !isLoading ? (
          <motion.div
            key="pick"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-10"
          >
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest">
                <Compass className="w-3.5 h-3.5" /> 2-Card Sequential Spread
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold gold-gradient">신비로운 타로 2카드 리딩</h2>
              <p className="text-brand-ink/70 text-base md:text-lg leading-relaxed">
                10장의 카드 중 마음이 이끄는 <strong className="text-brand-gold">2장의 카드를 순서대로</strong> 선택하세요. <br />
                첫 번째는 <span className="text-brand-gold-light underline underline-offset-4">현재의 상황과 원인</span>, 
                두 번째는 <span className="text-brand-gold-light underline underline-offset-4">미래의 흐름과 해결책</span>을 암시합니다.
              </p>
            </div>

            {/* Selected Status Badge */}
            <div className="flex items-center justify-center gap-6 text-sm font-medium">
              <div className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all ${
                selectedIndices.length >= 1 
                  ? 'bg-brand-gold/20 border-brand-gold text-brand-gold' 
                  : 'bg-white/5 border-white/10 text-brand-ink/40'
              }`}>
                {selectedIndices.length >= 1 ? <CheckCircle2 className="w-4 h-4 text-brand-gold" /> : <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">1</span>}
                1st 카드: {selectedIndices.length >= 1 ? spreadCards[selectedIndices[0]] : "선택 중..."} (현재)
              </div>

              <ArrowRight className="w-4 h-4 text-brand-gold/40" />

              <div className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all ${
                selectedIndices.length >= 2 
                  ? 'bg-brand-gold/20 border-brand-gold text-brand-gold' 
                  : 'bg-white/5 border-white/10 text-brand-ink/40'
              }`}>
                {selectedIndices.length >= 2 ? <CheckCircle2 className="w-4 h-4 text-brand-gold" /> : <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px]">2</span>}
                2nd 카드: {selectedIndices.length >= 2 ? spreadCards[selectedIndices[1]] : "선택 중..."} (미래)
              </div>
            </div>

            {/* 10 Card Fan Spread Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 py-4 max-w-4xl mx-auto">
              {spreadCards.map((cardName, i) => {
                const selectedOrder = selectedIndices.indexOf(i); // -1, 0, or 1
                const isSelected = selectedOrder !== -1;

                return (
                  <motion.div
                    key={i}
                    whileHover={!isSelected ? { y: -8, scale: 1.03 } : {}}
                    whileTap={!isSelected ? { scale: 0.98 } : {}}
                    className={`h-48 md:h-56 rounded-xl border flex flex-col items-center justify-center cursor-pointer relative group overflow-hidden transition-all duration-300 ${
                      isSelected
                        ? 'bg-brand-gold/20 border-brand-gold shadow-lg shadow-brand-gold/20 scale-105'
                        : 'glass-card border-brand-gold/20 hover:border-brand-gold/50'
                    }`}
                    onClick={() => handleSelectCard(i)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 to-transparent pointer-events-none" />

                    {isSelected ? (
                      <div className="flex flex-col items-center justify-center gap-2 relative z-10 px-2 text-center">
                        <span className="w-8 h-8 rounded-full bg-brand-gold text-brand-bg font-bold text-sm flex items-center justify-center shadow-md">
                          {selectedOrder + 1}
                        </span>
                        <span className="text-xs font-bold text-brand-gold-light mt-1">
                          {selectedOrder === 0 ? "현재 상황" : "미래 흐름"}
                        </span>
                        <span className="text-xs text-brand-ink/90 font-serif font-bold line-clamp-2">
                          {cardName}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-3 relative z-10">
                        <Sparkles className="w-8 h-8 text-brand-gold/30 group-hover:text-brand-gold/60 transition-colors" />
                        <span className="text-[11px] text-brand-gold/50 tracking-widest font-mono">TAROT</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={initSpread}
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-medium text-brand-ink/70 transition-colors"
              >
                카드 다시 셔플
              </button>
              
              <button
                onClick={handleStartAnalysis}
                disabled={selectedIndices.length < 2}
                className="gold-button px-10 py-4 rounded-xl font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                {selectedIndices.length === 0 && "2장의 카드를 선택해주세요"}
                {selectedIndices.length === 1 && "두 번째 카드를 선택하세요"}
                {selectedIndices.length === 2 && "운명의 2카드 운세 해석하기"}
              </button>
            </div>
          </motion.div>
        ) : isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 space-y-6 text-center"
          >
            <Loader2 className="w-12 h-12 text-brand-gold animate-spin" />
            <div className="space-y-2">
              <h3 className="text-2xl font-serif font-bold text-brand-gold-light">두 카드의 깊은 울림을 읽는 중...</h3>
              <p className="text-sm text-brand-ink/60">현재 상황에서 미래로 이어지는 운명의 흐름을 연계 해석합니다.</p>
            </div>
          </motion.div>
        ) : result && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-12"
          >
            {/* Header Title */}
            <div className="text-center space-y-3">
              <span className="text-brand-gold font-bold tracking-widest text-xs uppercase flex items-center justify-center gap-2">
                <Compass className="w-4 h-4" /> SEQUENTIAL TAROT READING
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold gold-gradient">2-Card 운명 리포트</h2>
              <p className="text-brand-ink/60 text-sm max-w-xl mx-auto">
                첫 번째 카드에서부터 두 번째 카드로 이어지는 서사적 흐름과 종합 조언입니다.
              </p>
            </div>

            {/* 2-Cards Side-by-Side Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="glass-card p-8 space-y-6 relative overflow-hidden border-brand-gold/30">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 text-brand-gold font-bold text-xs">
                  [1] {result.card1.roleTitle}
                </div>

                <div className="aspect-[2/3] max-w-[220px] mx-auto w-full rounded-xl overflow-hidden border border-brand-gold/30 shadow-xl relative bg-brand-slate flex items-center justify-center">
                  {card1Img ? (
                    <img 
                      src={card1Img} 
                      alt={result.card1.cardName} 
                      className="w-full h-full object-cover animate-fade-in"
                      referrerPolicy="no-referrer"
                    />
                  ) : isCard1ImgLoading ? (
                    <div className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                      <Loader2 className="w-7 h-7 text-brand-gold animate-spin" />
                      <span className="text-[11px] text-brand-gold/70 font-medium">카드 이미지 그리는 중...</span>
                    </div>
                  ) : (
                    <Sparkles className="w-12 h-12 text-brand-gold/30" />
                  )}
                </div>

                <div className="space-y-3 text-center md:text-left">
                  <h3 className="text-2xl font-serif font-bold text-brand-gold-light">{result.card1.cardName}</h3>
                  <div className="text-xs font-semibold text-brand-gold bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg inline-block">
                    핵심 키워드: {result.card1.meaning}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">상황 & 원인 분석</h4>
                    <div className="text-sm text-brand-ink/80 leading-relaxed">
                      <TypewriterText text={result.card1.interpretation} speed={10} />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <h5 className="text-xs font-bold text-brand-gold-light">현재를 위한 조언</h5>
                    <div className="text-xs text-brand-ink/90 italic">
                      "<TypewriterText text={result.card1.advice} speed={12} />"
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="glass-card p-8 space-y-6 relative overflow-hidden border-brand-gold/30">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 text-brand-gold font-bold text-xs">
                  [2] {result.card2.roleTitle}
                </div>

                <div className="aspect-[2/3] max-w-[220px] mx-auto w-full rounded-xl overflow-hidden border border-brand-gold/30 shadow-xl relative bg-brand-slate flex items-center justify-center">
                  {card2Img ? (
                    <img 
                      src={card2Img} 
                      alt={result.card2.cardName} 
                      className="w-full h-full object-cover animate-fade-in"
                      referrerPolicy="no-referrer"
                    />
                  ) : isCard2ImgLoading ? (
                    <div className="flex flex-col items-center justify-center p-4 text-center space-y-2">
                      <Loader2 className="w-7 h-7 text-brand-gold animate-spin" />
                      <span className="text-[11px] text-brand-gold/70 font-medium">카드 이미지 그리는 중...</span>
                    </div>
                  ) : (
                    <Sparkles className="w-12 h-12 text-brand-gold/30" />
                  )}
                </div>

                <div className="space-y-3 text-center md:text-left">
                  <h3 className="text-2xl font-serif font-bold text-brand-gold-light">{result.card2.cardName}</h3>
                  <div className="text-xs font-semibold text-brand-gold bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg inline-block">
                    핵심 키워드: {result.card2.meaning}
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider">미래 흐름 & 해결책</h4>
                    <div className="text-sm text-brand-ink/80 leading-relaxed">
                      <TypewriterText text={result.card2.interpretation} speed={10} />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <h5 className="text-xs font-bold text-brand-gold-light">실천해야 할 행동</h5>
                    <div className="text-xs text-brand-ink/90 italic">
                      "<TypewriterText text={result.card2.advice} speed={12} />"
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Combined Synthesis Section */}
            <div className="glass-card p-8 md:p-10 space-y-6 border-brand-gold/40 relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-brand-gold-light">두 카드의 시너지 & 종합 연계 해석</h3>
              </div>

              <div className="text-brand-ink/90 text-base md:text-lg leading-relaxed whitespace-pre-wrap border-l-2 border-brand-gold/40 pl-6 py-2">
                <TypewriterText text={result.combinedInterpretation} speed={10} />
              </div>

              <div className="p-6 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 space-y-2">
                <h4 className="font-bold text-brand-gold flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> 최종 종합 조언
                </h4>
                <p className="text-brand-ink font-serif text-lg italic leading-relaxed">
                  "<TypewriterText text={result.finalAdvice} speed={12} />"
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
