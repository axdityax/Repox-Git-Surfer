import express from "express";
import cors from "cors";
import gitRouter from "./routes/gitRoute.js"; // Import your routes

// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// API endpoints
app.use("/api/git", gitRouter); // Mount the git routes

app.get("/", (req, res) => {
	res.send("API Working");
});

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
