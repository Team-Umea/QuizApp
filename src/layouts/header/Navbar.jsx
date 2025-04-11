import { NavLink, useLocation, useNavigate } from "react-router";
import PrimaryBtn from "../../components/btn/PrimaryBtn";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { RiAdminLine } from "react-icons/ri";
import useAuthStore from "../../hooks/useAuthStore";
import { signOut } from "../../api/authecho";
import OutlineBtn from "../../components/btn/OutlineBtn";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isAdmin, resetAuth } = useAuthStore();
  const isAdminPage = location.pathname.includes("admin");

  const signInButtonBody =
    !isAdminPage && isAdmin && isAuthenticated ? (
      <>
        <span className="text-lg whitespace-nowrap">Admin</span>
        <RiAdminLine size={24} />
      </>
    ) : isAuthenticated ? (
      <>
        <span className="text-lg whitespace-nowrap">Sign out</span>
        <IoLogOutOutline size={24} />
      </>
    ) : (
      <>
        <span className="text-lg whitespace-nowrap">Sign in</span>
        <IoLogInOutline size={24} />
      </>
    );

  const handleAuthAction = async () => {
    if (!isAdminPage && isAuthenticated && isAdmin) {
      navigate("/admin");
      return;
    }

    if (isAuthenticated) {
      resetAuth();
      await signOut();
      navigate("/");
    } else {
      navigate("/signin");
    }
  };

  return (
    <nav className="px-8 py-4 bg-gray-900 text-white font-semibold flex justify-between items-center">
      <NavLink to="/" className="text-xl">
        Quizio
      </NavLink>
      <NavLink to="/join" className="">
        Join quiz
      </NavLink>
      <div className="flex gap-x-4 w-fit">
        {isAdmin && isAdminPage && (
          <OutlineBtn onClick={() => navigate("/admin")}>
            <span>My quizzes</span>
          </OutlineBtn>
        )}
        <PrimaryBtn onClick={handleAuthAction}>{signInButtonBody}</PrimaryBtn>
      </div>
    </nav>
  );
}
