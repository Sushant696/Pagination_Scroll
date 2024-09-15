import React from "react";
import useMovies from "../hooks/useMovies";
import { Link, useSearchParams } from "react-router-dom";
import { Pagination } from "@mui/material";

function MovieList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 0;
  const { data, isLoading, isError } = useMovies(page);

  const total = data?.totalCount;
  const limit = data?.limit;
  const displayNumbers = Math.ceil(total / limit);

  if (isLoading) {
    return <h1 className="text-8xl text-green-400 text-center">Loading </h1>;
  }

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="w-full">
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
      </div>
      <div className="my-10">
        {/*
        <div className="flex justify-center">
          <h1>MUI Component </h1>
          <Pagination count={displayNumbers} />
        </div>*/}
        <div className="flex space-x-2 justify-center mt-4">
          {Array.from({ length: displayNumbers }, (_, i) => (
            <Link
              to={`?page=${i}`}
              onClick={() => setSearchParams({ page: i })}
              key={i}
             className={`${
              page == i
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700"
            } py-2 px-4 rounded-lg hover:bg-gray-300`}            >
              {i + 1}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MovieList;
