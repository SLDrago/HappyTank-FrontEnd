import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Loader from "./common/Loader";
import PageTitle from "./components/PageTitle";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound404/NotFound404";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import FogetPW from "./pages/Authentication/FogetPW";
import ResetPW from "./pages/Authentication/ResetPW";
import FishSearch from "./pages/Search/Search";
import Advertisement from "./pages/Advertisement";
import ProductPage from "./pages/Advertisement/ProductPage";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="Home | HappyTank" />
              <Home />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <PageTitle title="SignIn | HappyTank" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <PageTitle title="SignUp | HappyTank" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/forget-password"
          element={
            <>
              <PageTitle title="Forget Password | HappyTank" />
              <FogetPW />
            </>
          }
        />
        <Route
          path="/reset-password"
          element={
            <>
              <PageTitle title="Reset Password | HappyTank" />
              <ResetPW />
            </>
          }
        />
        <Route
          path="/search"
          element={
            <>
              <PageTitle title="Fish Database | HappyTank" />
              <FishSearch />
            </>
          }
        />
        <Route
          path="/adverticements"
          element={
            <>
              <PageTitle title="Adverticement Platform | HappyTank" />
              <Advertisement />
            </>
          }
        />
        <Route
          path="/adverticements/product-page"
          element={
            <>
              <PageTitle title="Adverticement Platform | HappyTank" />
              <ProductPage />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <PageTitle title="404 | HappyTank" />
              <NotFound />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
