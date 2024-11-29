import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export interface DecodedToken extends JwtPayload {
    email: string;
    firstName: string;
  }
  
const verifyToken = (token: string): DecodedToken | null => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
      return decoded;
    } catch (error) {
      console.error("JWT verification failed:", error);
      return null;
    }
  };

export interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: "Access Denied: No token provided." });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }

  req.user = decoded; // Attach the decoded token data to the request
  next();
};
