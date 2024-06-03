import { Typography, Input, Button } from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import * as Yup from "yup";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export function FogetPW() {
  const [errorMessage, setErrorMessage] = useState("");

  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");

    try {
      await signInSchema.validate({ email }, { abortEarly: false });
      // Here you can make your login API call
      // If login fails, setErrorMessage("Email and password combination do not match");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach((e) => {
          errors[e.path] = e.message;
        });
        setErrorMessage(errors.email);
      }
    }
  };
  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Reset Password
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          You will receive an e-mail in maximum 60 seconds
        </Typography>
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-16 py-2 rounded-md mb-4 flex items-center justify-center w-fit text-center m-auto">
            <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
            <Typography variant="small">{errorMessage}</Typography>
          </div>
        )}
        <form
          action="#"
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
          <Button
            color="gray"
            size="lg"
            className="mt-6"
            type="submit"
            fullWidth
          >
            reset
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Not registered?{" "}
            <NavLink to="/signup" className="font-medium text-gray-900">
              Create account
            </NavLink>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default FogetPW;
