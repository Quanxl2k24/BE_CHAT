import { Router } from "express";
import { AIController } from "./chatWithAiController";
import { GeminiService } from "../../infrastructure/services/chatWithAIService";

const router = Router();

const geminiService = new GeminiService();
const aiController = new AIController(geminiService);

/**
 * @openapi
 * /v1/api/chat:
 *   post:
 *     tags:
 *       - Chat
 *     summary: Ask AI a question
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question to ask AI
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     answer:
 *                       type: string
 */
router.post("/chat", aiController.askAI);

export { router };
