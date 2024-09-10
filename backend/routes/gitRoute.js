import express from "express";
import { getAllRepos, getAllUsers, getUser } from "../controllers/gitController.js";

const gitRouter = express.Router();

gitRouter.post("/search", getAllUsers);
gitRouter.post("/user", getUser);
gitRouter.post("/listrepos", getAllRepos)

export default gitRouter;
