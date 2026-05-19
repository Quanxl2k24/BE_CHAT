import type { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * Kiểu dữ liệu cho một async middleware hoặc controller.
 */
type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

/**
 * Wrapper function bọc các async controller.
 * Nó sẽ tự động bắt các lỗi (catch) và chuyển xuống Global Error Handler qua next().
 */
export const asyncHandler = (fn: AsyncRequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
