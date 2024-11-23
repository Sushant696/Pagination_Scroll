import { useInfiniteQuery } from "@tanstack/react-query";

const fetchMovies = async ({ pageParam = 0 }) => {
  console.log("Fetching page:", pageParam);
  const response = await fetch(
    `http://localhost:4000/api/movie?page=${pageParam}`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

const useInfiniteMovies = () =>
  useInfiniteQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    // lastpage is previously returned data by fetchMovies and pages is array containing all pages of data that have been fetched so far
    getNextPageParam: (lastPage, pages) => {
      console.log("getNextPageParam:", { lastPage, pages });
      if (
        !lastPage ||
        !lastPage.movie ||
        lastPage.movie.length < lastPage.limit
      )
        return undefined;
      return pages.length;
    },
  });

export default useInfiniteMovies;
