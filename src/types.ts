export type Gender = 'male' | 'female';
export type CalendarType = 'solar' | 'lunar';

export interface UserInput {
  name: string;
  gender: Gender;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  calendarType: CalendarType;
}

export interface SajuSection {
  title: string;
  content: string;
  icon: string;
}

export interface SajuResult {
  summary: string;
  nature: string;
  personality: string;
  love: string;
  wealth: string;
  career: string;
  yearlyFlow: string;
  cautions: string;
  advice: string;
  characterType: string;
  imagePrompt?: string;
  characterImageUrl?: string;
  sections: SajuSection[];
}

export interface SingleTarotCardResult {
  cardName: string;
  roleTitle: string; // e.g. "첫 번째 카드: 현재 상황 & 원인"
  meaning: string;
  interpretation: string;
  advice: string;
  imagePrompt: string;
  imageUrl?: string;
}

export interface TarotResult {
  card1: SingleTarotCardResult;
  card2: SingleTarotCardResult;
  combinedInterpretation: string;
  finalAdvice: string;
}
