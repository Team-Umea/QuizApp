export default function PrimaryBtn({ type = "button", onClick, children }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="flex justify-center items-center w-full gap-x-2 px-6 py-2 text-white rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-700 transition-all duration-300 ease hover:opacity-70 shadow-xl cursor-pointer">
      {children}
    </button>
  );
}
