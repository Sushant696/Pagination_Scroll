import useMovies from "../hooks/useMovies";
import { Link, useSearchParams } from "react-router-dom";

function PaginationComp() {
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
    <div className="w-full ">
      <div className="flex justify-end pb-4">
        <div className="flex space-x-2 justify-center mb-8">
          {Array.from({ length: displayNumbers }, (_, i) => (
            <Link
              to={`?page=${i}`}
              onClick={() => setSearchParams({ page: i })}
              key={i}
              className={`${
                page == i
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } py-2 px-4 rounded-lg hover:bg-gray-300`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      </div>

      {/* Movie Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {data.movie.map((movi) => {
          return (
            <div
              key={movi.name}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
            >
              <div className="relative">
                <img
                  src={movi.img}
                  alt={movi.name}
                  className="w-full h-[420px] object-contain"
                />
                <div className="absolute text-white inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition duration-300 ease-in-out flex items-center justify-center text-white text-2xl font-bold">
                  {movi.name}
                </div>
              </div>
              <div className="p-4 text-left">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {movi.name}
                </h1>
                <p className="text-gray-600 text-sm">{movi.description}</p>
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
    </div>
  );
}
export default PaginationComp;
