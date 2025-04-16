const useScrollTo = () => {
  const scrollToTopSmooth = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { scrollToTopSmooth };
};

export default useScrollTo;
