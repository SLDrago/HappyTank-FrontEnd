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
import CompatibilityTool from "./pages/compatabilityTool/compatibility-tool";
import FIshCompatibilityResult from "./pages/compatabilityTool/fish-compatability-result";
import Forum from "./pages/Forum/Forum";
import Products from "./pages/Advertisement/Products";
import ProfilePage from "./pages/Settings/ProfilePage";
import ManageAdvertisementPage from "./pages/Settings/ManageAdvertisment";
import AdditionalDetails from "./pages/AdditionalDetails/AdditionalDeatails";
import TankDesign from "./pages/TankDesign/TankDesign";

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
          path="/additionaldetails"
          element={
            <>
              <PageTitle title="Additional Details | HappyTank" />
              <AdditionalDetails />
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
          path="/advertisements"
          element={
            <>
              <PageTitle title="Advertisement Platform | HappyTank" />
              <Advertisement />
            </>
          }
        />
        <Route
          path="/advertisements/products"
          element={
            <>
              <PageTitle title="Advertisement Platform | HappyTank" />
              <Products />
            </>
          }
        />

        <Route
          path="/advertisements/products/*"
          element={
            <>
              <PageTitle title="Advertisement Platform | HappyTank" />
              <ProductPage />
            </>
          }
        />
        <Route
          path="/settings/profile"
          element={
            <>
              <PageTitle title="Settings | HappyTank" />
              <ProfilePage />
            </>
          }
        />
        <Route
          path="/settings/advertisements"
          element={
            <>
              <PageTitle title="Settings | HappyTank" />
              <ManageAdvertisementPage />
            </>
          }
        />
        <Route
          path="/compatibility/compatibility-tool"
          element={
            <>
              <PageTitle title="Compatibility Tool | HappyTank" />
              <CompatibilityTool />
            </>
          }
        />

        <Route
          path="/compatibility/compatibility-result"
          element={
            <>
              <PageTitle title="Compatibility Result | HappyTank" />
              <FIshCompatibilityResult />
            </>
          }
        />

        <Route
          path="/forum"
          element={
            <>
              <PageTitle title="Forum | HappyTank" />
              <Forum />
            </>
          }
        />

        <Route
          path="/tank-design"
          element={
            <>
              <PageTitle title="Tank Designer | HappyTank" />
              <TankDesign />
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
