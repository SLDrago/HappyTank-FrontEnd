import React, { useState, useEffect } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

export function SignIn() {
  const { login, token } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (token != null) {
      navigate("/");
    }
  }, [token, navigate]);

  const togglePasswordVisibility = () =>
    setPasswordShown((current) => !current);

  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const getDeviceName = (): string => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("mobile")) {
      return "mobile";
    } else if (userAgent.includes("tablet")) {
      return "tablet";
    } else {
      return "desktop";
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    const device_name = getDeviceName();

    try {
      await signInSchema.validate({ email, password }, { abortEarly: false });

      const response = await fetch(`${backEndURL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, device_name }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      login(data.token, data.user);

      navigate("/additionaldetails");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors: { [key: string]: string } = {};
        error.inner.forEach((e) => {
          if (e.path) errors[e.path] = e.message;
        });
        setErrorMessage(errors.email || errors.password || "Validation error");
      } else {
        setErrorMessage(error.message || "Unknown error occurred");
      }
    }
  };

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-16 py-2 rounded-md mb-4 flex items-center justify-center w-fit text-center m-auto">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            <Typography variant="small">{errorMessage}</Typography>
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisibility}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
              name="password"
            />
          </div>
          <Button
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
          <div className="!mt-4 flex justify-end">
            <NavLink to="/forget-password">
              <Typography
                color="blue-gray"
                variant="small"
                className="font-semibold"
              >
                Forgot password
              </Typography>
            </NavLink>
          </div>
          <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            Sign in with Google
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Not registered?{" "}
            <NavLink to="/signup" className="font-semibold text-gray-900">
              Create account
            </NavLink>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignIn;
