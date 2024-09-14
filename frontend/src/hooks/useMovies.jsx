import { useQuery } from "@tanstack/react-query";

const fetchMovies = async () => {
  const response = await fetch("http://localhost:4000/api/movie");
  return response.json();
};

const useMovies = () => useQuery({ queryKey: ["movie"], queryFn: fetchMovies });
export default useMovies;
