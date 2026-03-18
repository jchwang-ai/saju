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
  sections: SajuSection[];
}
