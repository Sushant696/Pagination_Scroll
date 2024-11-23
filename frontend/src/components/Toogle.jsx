import { useState } from "react";
import PaginationComp from "../movies";
import InfiniteScroll from "../movies/InfiniteScroll";
import Navbar from "./navbar";

const Toogle = () => {
  const [displayComponent, setDisplayComponent] = useState("pagination");

  return (
    <>
      <Navbar />
      <div className="container pb-8 py-10">
        <button
          onClick={() => setDisplayComponent("pagination")}
          className={`px-4 py-2 mx-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 transition duration-150 ease-in-out ${
            displayComponent === "pagination"
              ? "bg-blue-600 text-white focus:ring-blue-400"
              : "bg-gray-200 text-gray-700 hover:bg-blue-500 focus:ring-gray-300"
          }`}
        >
          Pagination
        </button>

        <button
          onClick={() => setDisplayComponent("infinite_scrolling")}
          className={`px-4 py-2 mx-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 transition duration-150 ease-in-out ${
            displayComponent === "infinite_scrolling"
              ? "bg-green-600 text-white focus:ring-green-400"
              : "bg-gray-200 text-gray-700 hover:bg-green-500 focus:ring-gray-300"
          }`}
        >
          Infinite Scrolling
        </button>

        {displayComponent === "pagination" && <PaginationComp />}
        {displayComponent === "infinite_scrolling" && <InfiniteScroll />}
      </div>
    </>
  );
};

export default Toogle;
