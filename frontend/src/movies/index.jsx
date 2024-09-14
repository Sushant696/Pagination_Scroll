import React from "react";
import useMovies from "../hooks/useMovies";
import { Link } from "react-router-dom";

function HandlePaginationButton() {
  let total = 6 / 3;
  for (let i = 1; i < total; i++) {
    return <h1>{i}</h1>;
  }
}

function MovieList() {
  const { data, isLoading, isError } = useMovies();
  const total = data?.totalCount;
  console.log(total);
  if (isLoading) {
    return <h1 className="text-8xl text-green-400 text-center">Loading </h1>;
  }
  if (isError) {
    return <h1>Something went wrong</h1>;
  }
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold my-10">
        Welcome to the movie App.
      </h1>

      {/* Movie Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {data.movie.map((movi) => {
          return (
            <div
              key={movi.name}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
            >
              {/* Movie Image */}
              <div className="relative">
                <img
                  src={movi.img}
                  alt={movi.name}
                  className="w-full h-80 object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition duration-300 ease-in-out flex items-center justify-center text-white text-xl font-bold">
                  {movi.name}
                </div>
              </div>

              {/* Movie Content */}
              <div className="p-6">
                {/* Movie Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {movi.name}
                </h1>

                {/* Movie Description */}
                <p className="text-gray-600 text-sm">{movi.description}</p>

                {/* Button */}
                <div className="mt-4">
                  <button className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-600 transition duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div>
          here will be number
          <HandlePaginationButton />
          <h1></h1>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
