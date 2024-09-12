import express from "express";
import {
	getAllRepos,
	getAllUsers,
	getUser,
	getRepo,
	getRepoCommits,
	getRepoCommitsActivity,
	getRepoContributors,
	getRepoIssues,
	getRepoReadMe,
} from "../controllers/gitController.js";

const gitRouter = express.Router();

gitRouter.post("/search", getAllUsers);
gitRouter.post("/user", getUser);
gitRouter.post("/listrepos", getAllRepos);
gitRouter.post("/repo", getRepo);
gitRouter.post("/repo/commits", getRepoCommits);
gitRouter.post("/repo/commitsactivity", getRepoCommitsActivity);
gitRouter.post("/repo/contributors", getRepoContributors);
gitRouter.post("/repo/issues", getRepoIssues);
gitRouter.post("/repo/readme", getRepoReadMe);


export default gitRouter;
