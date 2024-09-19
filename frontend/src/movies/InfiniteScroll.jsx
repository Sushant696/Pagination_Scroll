import React, { useRef, useCallback, useState } from "react";
import useInfiniteMovies from "../hooks/useInfinityMovies";

const InfiniteScroll = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteMovies();
  const intObserver = useRef();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  console.log(data?.pages, "data.pages");
  console.log("Component render state:", {
    data,
    hasNextPage,
    isFetchingNextPage,
    status,
  });

  const lastMovieRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (intObserver.current) intObserver.current.disconnect();
      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          console.log("Fetching next page");
          setIsLoadingMore(true);
          setTimeout(() => {
            fetchNextPage().then(() => {
              setIsLoadingMore(false);
            });
          }, 1500); // Delay to show shimmer UI
        }
      });
      if (node) intObserver.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  if (status === "loading")
    return <h1 className="text-8xl text-green-400 text-center">Loading...</h1>;
  if (status === "error") return <h1>Something went wrong</h1>;
  if (!data || !data.pages) return null;

  return (
    <div className="w-full  py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {data.pages.map((page, pageIndex) =>
          page.movie.map((movi, index) => {
            const isLastMovie =
              pageIndex === data.pages.length - 1 &&
              index === page.movie.length - 1;
            return (
              <div
                ref={isLastMovie ? lastMovieRef : null}
                key={movi.name}
                className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out"
              >
                {/* Movie card content */}
                <div className="relative">
                  <img
                    src={movi.img}
                    alt={movi.name}
                    className="w-full h-96 object-contain"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition duration-300 ease-in-out flex items-center justify-center text-white text-2xl font-bold">
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
          }),
        )}
      </div>
      {(isFetchingNextPage || isLoadingMore) && (
        <div className="mt-8">
          <ShimmerUI />
        </div>
      )}
    </div>
  );
};

const ShimmerUI = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-200 rounded-lg overflow-hidden animate-pulse"
      >
        <div className="h-72 bg-gray-300"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          <div className="mt-4">
            <div className="h-10 bg-gray-300 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default InfiniteScroll;
