import { Search } from "lucide-react";

function Navbar() {
  return (
    <div className="flex justify-between py-4 px-20 bg-blue-200 ">
      <h1 className="text-blue-500 text-3xl font-bold">FlickSort</h1>
      <div className="flex gap-4">
        <div className="w-full">
          <select
            name="Algorithm"
            className="w-full h-full bg-white rounded-lg p-2 "
          >
            <option value="Binary Search">Binary Search</option>
            <option value="Linear Search">Linear Search</option>
            <option value="Interpolation Search">Interpolation Search</option>
            <option value="Sublist Search">Sublist Search</option>
          </select>
        </div>
        <div className="flex">
          <input
            type=""
            className="rounded-l-lg px-4"
            placeholder="Search for Movies"
          />
          <div className="bg-blue-500 p-3 rounded-r-lg">
            <Search color="#f8f8f8" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
