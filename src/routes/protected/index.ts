import { Request, Response, Router } from "express";
import { authMiddleware } from "../../middlewares";

const ProtectedRouter = Router();

ProtectedRouter.get("/protected", authMiddleware, async (req: Request, res: Response) => {
  res.status(200).json({ status: 200, message: "User Found" });
});

export { ProtectedRouter };