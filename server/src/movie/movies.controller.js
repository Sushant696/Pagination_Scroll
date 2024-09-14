import { Movie } from "./movie.model.js";

const getAllMovies = async (req, res) => {
  // pagination stuff goes here
  const page = req.query.page || 0; // give the current page 0,1,2,3 || default 0
  const moviePerPage = 3; // movies per page
  try {
    // skip the books that are
    const total = await Movie.countDocuments();
    const movie = await Movie.find({})
      .skip(page * moviePerPage)
      .limit(moviePerPage);
    return res.status(200).json({ movie, totalCount: total,limit:moviePerPage });
  } catch (error) {
    throw new Error("Error occurred", error);
  }
};

const updateMovie = async (req, res) => {
  const { params } = req.params;
  try {
    const movie = await Movie.find({});
    console.log(movie);
    return res.status(200).json(movie);
  } catch (error) {
    throw new Error("Error occurred", error);
  }
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;
  console.log("here is the id", id);
  try {
    const movie = await Movie.findByIdAndDelete(id);

    return res.status(200).json({
      success: false,
      message: "Successfully Deleted Movie",
      movie,
    });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
const postMovie = async (req, res) => {
  const { name, description, img } = req.body;

  if (!name || !description || !img) {
    return res.status(400).json({
      success: false,
      message: "Name, description, and image are required.",
    });
  }
  try {
    // Create a new movie with the image path
    const movie = await Movie.create({ name, description, img });

    return res.status(200).json({
      success: true,
      message: "Successfully created a movie.",
      movie,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { getAllMovies, updateMovie, postMovie, deleteMovie };
