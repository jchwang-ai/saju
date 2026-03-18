import React from 'react';
import { motion } from 'motion/react';
import { SajuResult, UserInput } from '../types';
import { 
  Zap, User, Heart, Coins, Briefcase, Calendar, AlertTriangle, Lightbulb,
  Download, Share2, RefreshCw
} from 'lucide-react';

interface SajuResultPageProps {
  result: SajuResult;
  input: UserInput;
  onReset: () => void;
}

const iconMap: Record<string, any> = {
  Zap, User, Heart, Coins, Briefcase, Calendar, AlertTriangle, Lightbulb
};

export const SajuResultPage: React.FC<SajuResultPageProps> = ({ result, input, onReset }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('링크가 복사되었습니다. 친구들에게 공유해보세요!');
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-12"
      >
        {/* Character Card Section */}
        <div className="grid md:grid-cols-5 gap-8 items-center glass-card p-8 md:p-12 overflow-hidden relative">
          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-gold/10 rounded-full blur-[80px]" />
          
          <div className="md:col-span-2 relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="aspect-square rounded-2xl overflow-hidden border-2 border-brand-gold/30 shadow-2xl shadow-brand-gold/10"
            >
              {result.characterImageUrl ? (
                <img 
                  src={result.characterImageUrl} 
                  alt={result.characterType}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full bg-brand-slate flex items-center justify-center text-brand-gold/20">
                  <User className="w-20 h-20" />
                </div>
              )}
            </motion.div>
          </div>

          <div className="md:col-span-3 space-y-6">
            <div className="space-y-2">
              <span className="text-brand-gold font-bold tracking-widest text-xs uppercase">Your Character Type</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold gold-gradient leading-tight">
                {result.characterType}
              </h2>
            </div>
            <p className="text-brand-ink/70 text-lg leading-relaxed italic">
              "{result.summary}"
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium">#사주캐릭터</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium">#운명리포트</span>
              <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium">#명운</span>
            </div>
          </div>
        </div>

        {/* User Info Summary */}
        <div className="flex justify-center gap-4 text-sm text-brand-ink/50 border-b border-white/5 pb-8">
          <span>{input.name}님</span>
          <span>•</span>
          <span>{input.birthDate} {input.birthTime}</span>
          <span>•</span>
          <span>{input.calendarType === 'solar' ? '양력' : '음력'}</span>
          <span>•</span>
          <span>{input.gender === 'male' ? '남성' : '여성'}</span>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {result.sections.map((section, idx) => {
            const Icon = iconMap[section.icon] || Zap;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 hover:bg-white/[0.07] transition-colors"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-brand-gold-light">{section.title}</h3>
                </div>
                <p className="text-brand-ink/80 leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4 pt-12">
          <p className="text-brand-gold font-medium text-sm">이 결과를 친구들과 공유해보세요!</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold"
          >
            <Download className="w-4 h-4" /> 리포트 저장하기
          </button>
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-gold text-brand-bg hover:bg-brand-gold-light transition-colors text-sm font-bold"
          >
            <RefreshCw className="w-4 h-4" /> 다시 분석하기
          </button>
          <button 
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold"
          >
            <Share2 className="w-4 h-4" /> 결과 공유하기
          </button>
        </div>
      </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-brand-ink/30 max-w-2xl mx-auto leading-relaxed">
          본 리포트는 전통 명리학 해석을 바탕으로 생성된 참고용 자료입니다. <br />
          운명은 스스로의 의지와 노력으로 개척해 나가는 것임을 잊지 마세요.
        </div>
      </motion.div>
    </div>
  );
};
