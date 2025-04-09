import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import ProtectedAdminRoute from "../components/auth/ProtectedAdminRoute";
import ProtectedUserRoute from "../components/auth/ProtectedUserRoute";
import SignInRedirect from "../components/auth/SignInRedirect";
import CreateQuizPage from "../pages/CreateQuizPage";
import QuizPage from "../pages/QuizPage";
import QuizResultPage from "../pages/QuizResultPage";
import QuizLobbyPage from "../pages/QuizLobbyPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="quiz" element={<QuizPage />}>
        <Route path="result" element={<QuizResultPage />} />
        <Route path="lobby" element={<QuizLobbyPage />} />
      </Route>
      <Route
        path="/signin"
        element={
          <SignInRedirect>
            <SignInPage />
          </SignInRedirect>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedAdminRoute>
            <AdminPage />
          </ProtectedAdminRoute>
        }>
        <Route path="createquiz/:quiz?" element={<CreateQuizPage />} />
      </Route>
      <Route
        path="/user"
        element={
          <ProtectedUserRoute>
            <UserPage />
          </ProtectedUserRoute>
        }
      />
    </Route>
  )
);

export default router;
