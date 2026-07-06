import express from "express";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatusText from "./utilities/httpStatusText.js";

const app = express();
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

// app.all('*', );

app.use((error, req, res, next) => res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.error,
    statusCode: error.statusCode || 500,
    message: error.message,
} || error));

app.listen(5000, () => {
    console.log("Server is running");
});
