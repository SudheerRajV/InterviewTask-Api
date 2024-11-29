"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connect_1 = require("../db/connect");
const router = express_1.default.Router();
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
router.get("/ping", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ message: "Welcome to apis" });
}));
// Sign Up Route
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName } = req.body;
    console.log("req.body", email, password);
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const db = yield (0, connect_1.connectToDatabase)();
        const usersCollection = db.collection("users");
        //console.log("usersCollection", usersCollection);
        const existingUser = yield usersCollection.findOne({ email });
        //console.log("existingUser", existingUser);
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        //console.log("hashedPassword", hashedPassword);
        const result = yield usersCollection.insertOne({
            email,
            firstName,
            lastName,
            password: hashedPassword,
        });
        console.log("result", result);
        if (!result.insertedId) {
            return res.status(500).json({ message: "Failed to create user" });
        }
        //   const token = jwt.sign({ userId: result.insertedId.toString() }, JWT_SECRET, {
        //     expiresIn: "1h",
        //   });
        res.status(201).json({ "message": "User signed up successfully." });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}));
// Sign In Route
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const db = yield (0, connect_1.connectToDatabase)();
        const usersCollection = db.collection("users");
        const user = yield usersCollection.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ email: user.email, firstName: user.firstName }, JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}));
exports.default = router;
