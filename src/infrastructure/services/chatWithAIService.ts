import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

// Định nghĩa Interface để decouple code (Dependency Inversion Principle)
export interface IAIService {
  generateText(prompt: string): Promise<string>;
}

export class GeminiService implements IAIService {
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: GenerativeModel;

  constructor() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Bắn lỗi ngay lúc khởi động server (Fail-fast)
      throw new Error('CRITICAL: GEMINI_API_KEY is not defined in environment variables.');
    }

    // Khởi tạo instance của SDK    
    this.genAI = new GoogleGenerativeAI(apiKey);
    
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
  }

  /**
   * Hàm gọi AI tạo text cơ bản
   */
  public async generateText(prompt: string): Promise<string> {
    try {
      // Thực thi request
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      
      return response.text();
    } catch (error: any) {
      // Xử lý lỗi tập trung. Ở thực tế, nên dùng logger (Winston/Pino)
      console.error('[GeminiService] Error generating content:', error.message);
      
      // Bọc lại lỗi thành Custom AppError để ném ra ngoài
      throw new Error(`AI Service Unavailable: ${error.message}`);
    }
  }
}