import { Router } from "express";
import {
  deleteMovie,
  getAllMovies,
  postMovie,
  updateMovie,
} from "./movies.controller.js";

const movieRouter = Router();
movieRouter.route("/").get(getAllMovies);
movieRouter.route("/").post(postMovie);
movieRouter.route("/update/:id").patch(updateMovie);
movieRouter.route("/delete/:id").delete(deleteMovie);
export default movieRouter;
