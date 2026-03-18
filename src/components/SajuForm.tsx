import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserInput, Gender, CalendarType } from '../types';
import { Calendar, Clock, User, ArrowRight, Loader2 } from 'lucide-react';

interface SajuFormProps {
  onSubmit: (input: UserInput) => void;
  isLoading: boolean;
}

export const SajuForm: React.FC<SajuFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<UserInput>({
    name: '',
    gender: 'male',
    birthDate: '',
    birthTime: '',
    calendarType: 'solar',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (gender: Gender) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleCalendarChange = (calendarType: CalendarType) => {
    setFormData(prev => ({ ...prev, calendarType }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.birthDate || !formData.birthTime) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif font-bold mb-3">정보 입력</h2>
          <p className="text-brand-ink/60">정확한 분석을 위해 태어난 시간을 포함한 정보를 입력해주세요.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-ink/80 flex items-center gap-2">
              <User className="w-4 h-4 text-brand-gold" /> 이름
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="성함을 입력하세요"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-gold/50 transition-colors text-brand-ink"
              required
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-ink/80 mb-2 block">성별</label>
            <div className="grid grid-cols-2 gap-4">
              {(['male', 'female'] as Gender[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleGenderChange(g)}
                  className={`py-4 rounded-xl border transition-all duration-300 ${
                    formData.gender === g
                      ? 'bg-brand-gold/20 border-brand-gold text-brand-gold'
                      : 'bg-white/5 border-white/10 text-brand-ink/60 hover:border-white/30'
                  }`}
                >
                  {g === 'male' ? '남성' : '여성'}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-brand-ink/80 mb-2 block">양력/음력</label>
            <div className="grid grid-cols-2 gap-4">
              {(['solar', 'lunar'] as CalendarType[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => handleCalendarChange(c)}
                  className={`py-4 rounded-xl border transition-all duration-300 ${
                    formData.calendarType === c
                      ? 'bg-brand-gold/20 border-brand-gold text-brand-gold'
                      : 'bg-white/5 border-white/10 text-brand-ink/60 hover:border-white/30'
                  }`}
                >
                  {c === 'solar' ? '양력' : '음력'}
                </button>
              ))}
            </div>
          </div>

          {/* Birth Date & Time */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-ink/80 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-gold" /> 생년월일
              </label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-gold/50 transition-colors text-brand-ink [color-scheme:dark]"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-ink/80 flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-gold" /> 태어난 시간
              </label>
              <input
                type="time"
                name="birthTime"
                value={formData.birthTime}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-brand-gold/50 transition-colors text-brand-ink [color-scheme:dark]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full gold-button py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                분석 중...
              </>
            ) : (
              <>
                결과 확인하기
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
