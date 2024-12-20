import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../db/connect";
import { authenticate } from "../middleware/authenticate";
import { products } from "../db/products";
import { configKeys } from "../config/keys";
 
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || configKeys.SECRET_KEY;

type User = {
  email: string;
  firstName: String;
  lastName: String;
  password: string;
};

router.get(
    "/ping",
    async (req: Request, res: Response): Promise<any> => {
        return res.status(200).json({ message: "Welcome to apis" });
    })

// Sign Up Route
router.post(
  "/register",
  async (req: Request, res: Response): Promise<any> => {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection<User>("users");
      const existingUser = await usersCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await usersCollection.insertOne({
        email,
        firstName,
        lastName,
        password: hashedPassword,
      });
      if (!result.insertedId) {
        return res.status(500).json({ message: "Failed to create user" });
      }

    //   const token = jwt.sign({ userId: result.insertedId.toString() }, JWT_SECRET, {
    //     expiresIn: "1h",
    //   });
      res.status(201).json({ "message": "User signed up successfully." });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

// Sign In Route
router.post(
  "/login",
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    try {
      const db = await connectToDatabase();
      const usersCollection = db.collection<User>("users");

      const user = await usersCollection.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign({ email: user.email,firstName: user.firstName  }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

// Product list Route
router.get(
  "/products",authenticate,
  async (req: Request, res: Response): Promise<any> => {
    try {
      res.status(200).json({ data:  products});
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
);

export default router;
