export default function Footer() {
  return (
    <footer className="p-4 text-gray-300 bg-gray-900">
      <div className="flex flex-col lg:flex-row justify-between gap-y-12 md:max-w-[80%] lg:max-w-[70%] mx-auto my-4 px-20 border-l-4 border-r-8 border-r-fuchsia-400 border-l-blue-400">
        <div>
          <p className="text-lg">Quizio &copy;{new Date().getFullYear()}</p>
          <p>
            Powered by&nbsp;
            <a
              href="https://authecho.com"
              target="_blank"
              className="text-blue-500 border-b-[1px] border-transparent transition-all duration-300 ease hover:border-blue-500">
              authehco.com
            </a>
          </p>
        </div>
        <div>
          <p>App made by Team Umeå.</p>
          <p>
            Check out more of our work at&nbsp;
            <a
              href="https://teamumea.se"
              target="_blank"
              className="text-purple-500 border-b-[1px] border-transparent transition-all duration-300 ease hover:border-purple-500">
              teamumea.se
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
