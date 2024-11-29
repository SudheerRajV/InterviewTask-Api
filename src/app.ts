import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes";

const app = express();

// Middleware
 app.use(cors());
// app.options('*', cors());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//         credentials: true
//     })
//   );
app.use(bodyParser.json());

// Routes
app.use("/api", authRoutes);

export default app;
