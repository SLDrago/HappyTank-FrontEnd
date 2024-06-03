import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import FormValidationErrorMsg from "../../components/Verification/FormValidationErrorMsg";

export function SignUp() {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Hey, Welcome Back!
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your new password here.
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-4">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                New Password
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
              {...formik.getFieldProps("password")}
              icon={
                <i onClick={togglePasswordVisibility}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
            {formik.touched.password && formik.errors.password && (
              <FormValidationErrorMsg message={formik.errors.password} />
            )}
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Confirm Password
              </Typography>
            </label>
            <Input
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={confirmPasswordShown ? "text" : "password"}
              {...formik.getFieldProps("confirmPassword")}
              icon={
                <i onClick={toggleConfirmPasswordVisibility}>
                  {confirmPasswordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <FormValidationErrorMsg
                  message={formik.errors.confirmPassword}
                />
              )}
          </div>

          <Button
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
            type="submit"
          >
            Update Password
          </Button>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
