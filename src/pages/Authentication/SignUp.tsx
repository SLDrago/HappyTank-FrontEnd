import React, { useState } from "react";
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";
import UserShopRadio from "../../components/Authentication/UserShopRadio";
import { useFormik } from "formik";
import FormValidateErrorMsg from "../../components/Verification/FormValidationErrorMsg";
import * as Yup from "yup";
import axios from "axios";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

export function SignUp() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Required"),
    name: Yup.string().required("Required"),
    role: Yup.string().required("Please select User or Shop"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      password_confirmation: "",
      name: "",
      role: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${backEndURL}/api/register`, values);
        const data = response.data;
        login(data.token, data.user);
        navigate("/additionaldetails");
      } catch (error: any) {
        console.error("Registration failed.", error.response.data);
        setErrorMessage("Registration failed. Please try again.");
      }
    },
  });

  return (
    <section className="grid text-center h-screen items-center p-8 mb-20">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Join us today
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to register.
        </Typography>
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-16 py-2 rounded-md mb-4 flex items-center justify-center w-fit text-center m-auto">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            <Typography variant="small">{errorMessage}</Typography>
          </div>
        )}
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-4">
            <UserShopRadio
              name="role"
              onChange={(value) => formik.setFieldValue("role", value)}
            />
            {formik.touched.role && formik.errors.role ? (
              <FormValidateErrorMsg message={formik.errors.role} />
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="name">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Name / Shop Name
              </Typography>
            </label>
            <Input
              id="name"
              color="gray"
              size="lg"
              type="text"
              placeholder="Samantha Smith"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{ className: "hidden" }}
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <FormValidateErrorMsg message={formik.errors.name} />
            ) : null}
          </div>
          <div className="mb-4">
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
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{ className: "hidden" }}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <FormValidateErrorMsg message={formik.errors.email} />
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              id="password"
              size="lg"
              placeholder="********"
              labelProps={{ className: "hidden" }}
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
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <FormValidateErrorMsg message={formik.errors.password} />
            ) : null}
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Confirm Password
              </Typography>
            </label>
            <Input
              id="password_confirmation"
              size="lg"
              placeholder="********"
              labelProps={{ className: "hidden" }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={confirmPasswordShown ? "text" : "password"}
              icon={
                <i onClick={toggleConfirmPasswordVisibility}>
                  {confirmPasswordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
              {...formik.getFieldProps("password_confirmation")}
            />
            {formik.touched.password_confirmation &&
            formik.errors.password_confirmation ? (
              <FormValidateErrorMsg
                message={formik.errors.password_confirmation}
              />
            ) : null}
          </div>
          <div className="inline-flex items-center">
            <label
              className="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="link"
            >
              <input
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                id="link"
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                </svg>
              </span>
            </label>
            <label
              className="mt-px font-light text-gray-700 cursor-pointer select-none"
              htmlFor="link"
            >
              <p className="flex font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                I agree with the
                <NavLink
                  to="/terms-condition"
                  className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-500 transition-colors hover:text-blue-700"
                >
                  &nbsp;terms and conditions
                </NavLink>
                .
              </p>
            </label>
          </div>
          <Button
            type="submit"
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
          >
            Register Now
          </Button>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
