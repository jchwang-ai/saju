import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, SajuResult } from "../types";

const MODEL_NAME = "gemini-3.1-pro-preview";

export async function analyzeSaju(input: UserInput): Promise<SajuResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  const prompt = `
    사용자 정보:
    이름: ${input.name}
    성별: ${input.gender === 'male' ? '남성' : '여성'}
    생년월일: ${input.birthDate} (${input.calendarType === 'solar' ? '양력' : '음력'})
    출생시간: ${input.birthTime}

    위 정보를 바탕으로 전통 명리학(사주팔자) 분석 리포트를 작성해줘.
    분위기는 전문적이고 신뢰감 있으며, 현대적인 상담 리포트 느낌이어야 해.
    너무 미신적이거나 단정적인 표현은 피하고, "이런 성향이 강합니다", "이런 흐름이 예상됩니다"와 같이 부드럽고 분석적인 말투를 사용해줘.

    다음 항목들을 포함해서 JSON 형식으로 응답해줘:
    1. summary: 전체적인 사주를 한 줄로 요약한 핵심 문구
    2. nature: 타고난 기질과 오행의 특징
    3. personality: 성격적 장단점과 사회적 태도
    4. love: 연애운과 대인관계 성향
    5. wealth: 재물운과 경제적 흐름
    6. career: 적합한 직업군과 진로 조언
    7. yearlyFlow: 올해와 전반적인 운의 흐름
    8. cautions: 주의해야 할 점이나 보완할 부분
    9. advice: 삶을 위한 종합적인 조언
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            nature: { type: Type.STRING },
            personality: { type: Type.STRING },
            love: { type: Type.STRING },
            wealth: { type: Type.STRING },
            career: { type: Type.STRING },
            yearlyFlow: { type: Type.STRING },
            cautions: { type: Type.STRING },
            advice: { type: Type.STRING },
          },
          required: ["summary", "nature", "personality", "love", "wealth", "career", "yearlyFlow", "cautions", "advice"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    
    // Map to structured sections for UI
    const sections = [
      { title: "타고난 기질", content: result.nature, icon: "Zap" },
      { title: "성격 분석", content: result.personality, icon: "User" },
      { title: "연애/관계운", content: result.love, icon: "Heart" },
      { title: "재물운", content: result.wealth, icon: "Coins" },
      { title: "직업/진로", content: result.career, icon: "Briefcase" },
      { title: "올해의 흐름", content: result.yearlyFlow, icon: "Calendar" },
      { title: "주의할 점", content: result.cautions, icon: "AlertTriangle" },
      { title: "종합 조언", content: result.advice, icon: "Lightbulb" },
    ];

    return { ...result, sections };
  } catch (error) {
    console.error("Saju analysis failed:", error);
    throw new Error("사주 분석 중 오류가 발생했습니다. 다시 시도해주세요.");
  }
}
