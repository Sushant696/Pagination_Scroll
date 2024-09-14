import React from "react";
import useMovies from "../hooks/useMovies";

function MovieList() {
  const { data, isLoading, isError } = useMovies();
  console.log(data);
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

      {/* Movie Cards*/}
      <div>
        {data.movie.map((movi) => {
          return (
            <div className="shadow-md">
              <h1>{movi.name}</h1>
              <h1>{movi.description}</h1>
              <div className="w-96">
                <img src={movi.img} alt={movi.name} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MovieList;
