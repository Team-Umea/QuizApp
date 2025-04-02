export default function OutlineBtn({ type = "button", onClick, fullWidth = true, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ width: `${fullWidth ? "100%" : "fit-content"}` }}
      className="flex justify-center items-center gap-x-2 px-6 py-2 text-gray-200 rounded-full border-3 border-gray-200 transition-all duration-300 ease hover:opacity-70 focus:opacity-70 shadow-xl cursor-pointer">
      {children}
    </button>
  );
}
