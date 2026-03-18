import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, SajuResult, TarotResult } from "../types";

const MODEL_NAME = "gemini-3.1-pro-preview";

export async function analyzeTarot(cardName: string): Promise<TarotResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  const prompt = `
    타로 카드: ${cardName}
    
    이 타로 카드가 오늘의 운세로 뽑혔을 때의 해석을 작성해줘.
    분위기는 신비롭고 따뜻하며, 현대적인 상담 리포트 느낌이어야 해.
    
    다음 항목들을 포함해서 JSON 형식으로 응답해줘:
    1. meaning: 카드의 핵심 키워드와 의미
    2. interpretation: 오늘의 전반적인 운세 해석
    3. advice: 오늘을 위한 조언
    4. imagePrompt: 이 타로 카드를 묘사하는 영어 이미지 생성 프롬프트 (신비롭고 고급스러운 동양 판타지 스타일의 타로 카드 디자인)
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
            meaning: { type: Type.STRING },
            interpretation: { type: Type.STRING },
            advice: { type: Type.STRING },
            imagePrompt: { type: Type.STRING },
          },
          required: ["meaning", "interpretation", "advice", "imagePrompt"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    
    // Generate Tarot Image
    let imageUrl = "";
    try {
      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `A premium, artistic, mystical oriental fantasy tarot card design for "${cardName}". ${result.imagePrompt}. High quality, cinematic lighting, gold and navy color palette, elegant brush strokes, tarot card border.`,
            },
          ],
        },
      });

      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    } catch (imgError) {
      console.error("Tarot image generation failed:", imgError);
    }

    return {
      cardName,
      meaning: result.meaning,
      interpretation: result.interpretation,
      advice: result.advice,
      imageUrl,
    };
  } catch (error) {
    console.error("Tarot analysis failed:", error);
    throw new Error("타로 분석 중 오류가 발생했습니다. 다시 시도해주세요.");
  }
}

export async function generateAtmosphereImage(prompt: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16",
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Image generation failed:", error);
    // Fallback to a high-quality Unsplash image if generation fails
    return `https://images.unsplash.com/photo-1518544801976-3e159e50e5bb?auto=format&fit=crop&q=80&w=1200`;
  }
}

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
    특히 MBTI처럼 이 사람의 사주를 상징하는 '캐릭터 유형'을 하나 정해줘. (예: "지혜로운 숲의 현자", "멈추지 않는 불꽃", "깊은 바다의 통찰자" 등)

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
    10. characterType: 이 사람을 상징하는 캐릭터 유형 명칭
    11. imagePrompt: 이 캐릭터를 묘사하는 영어 이미지 생성 프롬프트 (신비롭고 고급스러운 동양 판타지 스타일)
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
            characterType: { type: Type.STRING },
            imagePrompt: { type: Type.STRING },
          },
          required: ["summary", "nature", "personality", "love", "wealth", "career", "yearlyFlow", "cautions", "advice", "characterType", "imagePrompt"],
        },
      },
    });

    const result = JSON.parse(response.text || "{}");
    
    // Generate Character Image
    let characterImageUrl = "";
    try {
      const imageResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: `A premium, artistic, mystical oriental fantasy character portrait representing "${result.characterType}". ${result.imagePrompt}. High quality, cinematic lighting, gold and navy color palette, elegant brush strokes.`,
            },
          ],
        },
      });

      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          characterImageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    } catch (imgError) {
      console.error("Image generation failed:", imgError);
      // Fallback to a placeholder or empty string
    }

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

    return { ...result, characterImageUrl, sections };
  } catch (error) {
    console.error("Saju analysis failed:", error);
    throw new Error("사주 분석 중 오류가 발생했습니다. 다시 시도해주세요.");
  }
}
