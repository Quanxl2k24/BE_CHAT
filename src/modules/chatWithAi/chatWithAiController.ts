import type { Request, Response } from "express";
import { GeminiService } from "../../infrastructure/services/chatWithAIService";
import { asyncHandler } from "../../core/middlewares/asyncHandle";

export class AIController {
  constructor(private readonly aiService: GeminiService) {}

  public askAI = asyncHandler(async (req: Request, res: Response) => {
    const { question } = req.body; // Cần validate req.body bằng Zod trước

    // Gọi service
    const answer = await this.aiService.generateText(question);

    res.status(200).json({
      status: "success",
      data: { answer },
    });
  });
}
