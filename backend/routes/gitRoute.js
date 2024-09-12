import express from "express";
import {
	getAllRepos,
	getAllUsers,
	getUser,
	getRepo,
	getRepoCommits,
} from "../controllers/gitController.js";

const gitRouter = express.Router();

gitRouter.post("/search", getAllUsers);
gitRouter.post("/user", getUser);
gitRouter.post("/listrepos", getAllRepos);
gitRouter.post("/repo", getRepo);
gitRouter.post("/repo/commits", getRepoCommits);


export default gitRouter;
