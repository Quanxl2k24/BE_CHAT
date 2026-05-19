import type { Request, Response, NextFunction, Application } from "express";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./core/config/swagger";

dotenv.config();
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/v1/api", (req: Request, res: Response) => {
  res.send("Hello World!");
});

import { router as chatRouter } from "./modules/chatWithAi/chatWithAiRouter";
import { router as openRouterRouter } from "./modules/chatWithOpenRoter/openRouterRouter";
app.use("/v1/api", chatRouter);
app.use("/v1/api", openRouterRouter);

app.use((err: SyntaxError | Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && "body" in err) {
    res.status(400).json({
      status: "error",
      message: "Invalid JSON body. Check for unescaped control characters (newlines, tabs, etc.) in your request.",
    });
    return;
  }
  console.error("Unhandled error:", err);
  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});

const port: number = Number(process.env.PORT);
app.listen(port, () => {
  console.log(`Bố mày đang chạy ở cổng ${port}`);
  console.log("api-docs:http://localhost:3000/api-docs");
});
