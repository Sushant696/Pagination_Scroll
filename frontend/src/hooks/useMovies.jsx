import { useQuery } from "@tanstack/react-query";

const fetchMovies = async (page) => {
  const response = await fetch(`http://localhost:4000/api/movie?page=${page}`);
  return response.json();
};

const useMovies = (page) =>
  useQuery({ queryKey: ["movie", page], queryFn: () => fetchMovies(page) });
export default useMovies;
