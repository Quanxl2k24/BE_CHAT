import { OpenRouter } from "@openrouter/sdk";

export interface IOpenRouterMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface IOpenRouterService {
  chat(messages: IOpenRouterMessage[]): Promise<string>;
}

export class OpenRouterService implements IOpenRouterService {
  private readonly client: OpenRouter;

  constructor() {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error(
        "CRITICAL: OPENROUTER_API_KEY is not defined in environment variables.",
      );
    }

    this.client = new OpenRouter({
      apiKey,
      httpReferer: process.env.OPENROUTER_SITE_URL || "http://localhost:3000",
      appTitle: process.env.OPENROUTER_SITE_TITLE || "BE Chat",
    });
  }

  public async chat(messages: IOpenRouterMessage[]): Promise<string> {
    try {
      const result = await this.client.chat.send({
        chatRequest: {
          model: "deepseek/deepseek-v4-flash:free",
          messages: messages as any,
        },
      });

      const content = result?.choices?.[0]?.message?.content;
      if (content === null || content === undefined) {
        throw new Error("Empty response from OpenRouter");
      }

      return String(content);
    } catch (error: any) {
      console.error("[OpenRouterService] Error:", error.message);
      throw new Error(`AI Service Unavailable: ${error.message}`);
    }
  }
}
