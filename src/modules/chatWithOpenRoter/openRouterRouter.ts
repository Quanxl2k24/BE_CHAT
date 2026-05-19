import { Router } from "express";
import { OpenRouterController } from "./openRouterController";
import { OpenRouterService } from "../../infrastructure/services/openRouterService";

const router = Router();

const openRouterService = new OpenRouterService();
const openRouterController = new OpenRouterController(openRouterService);

/**
 * @openapi
 * /v1/api/openrouter/chat:
 *   post:
 *     tags:
 *       - OpenRouter
 *     summary: Ask AI via OpenRouter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - messages
 *             properties:
 *               messages:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     role:
 *                       type: string
 *                       enum: [user, assistant, system]
 *                     content:
 *                       type: string
 *                 description: Array of chat messages
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
router.post("/openrouter/chat", openRouterController.askAI);

export { router };
