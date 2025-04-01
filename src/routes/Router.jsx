import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import SignInPage from "../pages/SignInPage";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/user" element={<UserPage />} />
    </Route>
  )
);

export default router;
