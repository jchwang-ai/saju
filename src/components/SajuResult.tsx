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
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-12"
      >
        {/* Header Summary */}
        <div className="text-center space-y-6">
          <div className="inline-block px-6 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold font-serif italic">
            {input.name}님의 명운 리포트
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight max-w-3xl mx-auto">
            "{result.summary}"
          </h2>
          <div className="flex justify-center gap-4 text-sm text-brand-ink/50">
            <span>{input.birthDate} {input.birthTime}</span>
            <span>•</span>
            <span>{input.calendarType === 'solar' ? '양력' : '음력'}</span>
            <span>•</span>
            <span>{input.gender === 'male' ? '남성' : '여성'}</span>
          </div>
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-12">
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
          <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold">
            <Share2 className="w-4 h-4" /> 결과 공유하기
          </button>
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
