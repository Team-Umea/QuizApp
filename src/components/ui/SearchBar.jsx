import { IoSearch } from "react-icons/io5";

export default function SearchBar({ placeholder = "Search", autofocus, onChange }) {
  return (
    <div className="flex items-center gap-x-2 p-2 w-full border-b-[1px] border-blue-300">
      <IoSearch size={20} color="lightblue" />
      <input
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        autoFocus={autofocus}
        onChange={(e) => onChange(e.target.value.trim().toLowerCase())}
        className="w-full border-0 outline-none bg-transparent text-blue-300"
      />
    </div>
  );
}
