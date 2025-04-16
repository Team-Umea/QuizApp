export default function StatusBtn({
  type = "button",
  onClick,
  fullWidth = true,
  statusColor,
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width: `${fullWidth ? "100%" : "fit-content"}`,
        borderColor: statusColor,
        color: statusColor,
      }}
      className="flex justify-center items-center gap-x-2 px-6 py-2 rounded-full border-3 transition-all duration-300 ease hover:opacity-70 shadow-xl cursor-pointer">
      {children}
    </button>
  );
}
