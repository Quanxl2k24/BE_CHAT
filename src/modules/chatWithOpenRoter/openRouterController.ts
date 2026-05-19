import type { Request, Response } from "express";
import { OpenRouterService } from "../../infrastructure/services/openRouterService";
import { asyncHandler } from "../../core/middlewares/asyncHandle";

export class OpenRouterController {
  constructor(private readonly openRouterService: OpenRouterService) {}

  public askAI = asyncHandler(async (req: Request, res: Response) => {
    const { messages } = req.body;

    const answer = await this.openRouterService.chat(messages);

    res.status(200).json({
      status: "success",
      data: { answer },
    });
  });
}
