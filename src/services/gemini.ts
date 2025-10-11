import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import type { SkincareRoutine } from "@/types";

const API_KEY = process.env.API_KEY;
if (!API_KEY) throw new Error("API_KEY environment variable is not set");

const genAI = new GoogleGenerativeAI(API_KEY);

// Bạn có thể dùng "gemini-1.5-pro" nếu cần mạnh hơn
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const responseSchema = {
  type: SchemaType.OBJECT,
  properties: {
    skinType: { type: SchemaType.STRING },
    concerns: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
    amRoutine: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          step: { type: SchemaType.STRING },
          productType: { type: SchemaType.STRING },
          reason: { type: SchemaType.STRING }
        },
        required: ["step", "productType", "reason"]
      }
    },
    pmRoutine: {
      type: SchemaType.ARRAY,
      items: {
        type: SchemaType.OBJECT,
        properties: {
          step: { type: SchemaType.STRING },
          productType: { type: SchemaType.STRING },
          reason: { type: SchemaType.STRING }
        },
        required: ["step", "productType", "reason"]
      }
    },
    disclaimer: { type: SchemaType.STRING }
  },
  required: ["skinType", "concerns", "amRoutine", "pmRoutine", "disclaimer"]
} as const;

export async function analyzeSkin(imageBase64: string, mimeType: string): Promise<SkincareRoutine> {
  const imagePart = { inlineData: { data: imageBase64, mimeType } };
  const textPart = {
    text: `Với vai trò là một chuyên gia da liễu AI, hãy phân tích hình ảnh khuôn mặt này.
Xác định loại da và các vấn đề chính. Tạo quy trình AM/PM; mỗi bước gồm step, productType, reason.
Cuối cùng có disclaimer. Trả lời tiếng Việt và chỉ xuất JSON theo schema.`
  };

  const resp = await model.generateContent({
    contents: [{ role: "user", parts: [imagePart, textPart] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema,
      temperature: 0.5
    }
  });

  const text = resp.response.text();
  try {
    return JSON.parse(text) as SkincareRoutine;
  } catch {
    console.error("JSON from model:", text);
    throw new Error("Phản hồi từ AI không đúng định dạng JSON.");
  }
}