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
exports.connectToDatabase = void 0;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
const keys_1 = require("../config/keys");
dotenv_1.default.config();
let db;
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("db", db);
    if (db)
        return db;
    const URI = process.env.DB_URL || keys_1.configKeys.DB_URL;
    console.log("URI", URI);
    if (!URI)
        throw new Error("Invalid MongoDB connection string");
    const client = new mongodb_1.MongoClient(URI);
    yield client.connect();
    console.log("Connected to MongoDB");
    db = client.db("InterviewTask");
    return db;
});
exports.connectToDatabase = connectToDatabase;
