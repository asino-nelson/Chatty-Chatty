import { MdSearch } from "react-icons/md";

const Search_input = () => {
  return (
    <div className="w-full py-3 bg-slate-300">
      <div className="flex items-center justify-center w-full mt-2">
        <input
        className="border bg-slate-100 w-2/3 outline-none rounded-lg px-3 py-2"
          type="text"
          placeholder="Search or start a new chat"
          name="username"
        />
        <button
          className="ml-1 bg-slate-200 hover:bg-slate-200/60  p-2 rounded-lg"
        >
          <MdSearch size={24} color="green"/>
        </button>
      </div>
    </div>
  );
};

export default Search_input;
