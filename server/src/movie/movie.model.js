import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    description: { type: String, required: true },

    // may be data for pagination IDK
  },
  { timestamps: true },
);

export const Movie = new mongoose.model("Movie", movieSchema);
