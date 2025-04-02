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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
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
        <Route path="createquiz" element={<CreateQuizPage />} />
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
