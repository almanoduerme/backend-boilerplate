import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // ** Get the token from the header;
  const token = req.header("auth-token");

  // ** Check if the token is present or not;
  if (!token) return res.status(401).json({ status: 401, message: "Access Denied" })

  // ** Verify the token;
  try {
    const verified = verify(token, process.env.MONGODB_SECRET as string);
    req.body.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ status: 400, message: "Invalid Token" });
  }
}

export { authMiddleware };