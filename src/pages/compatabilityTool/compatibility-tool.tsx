import DefaultLayout from "../../layout/default_layout";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button, Input, Typography } from "@material-tailwind/react";

const defaultValues = {
  name1: "",
  name2: "",
  name3: "",
};

export function CompatibilityTool() {
  const validationSchema = Yup.object().shape({
    name1: Yup.string()
      .required("This field is required!")
      .min(3, "At least 3 characters")
      .max(50, "Maximum length is 50"),
    name2: Yup.string().required("This field is required!"),
    name3: Yup.string(),
  });
  const navigate = useNavigate();
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState,
    control,
    watch,
  } = methods;
  const { isValid, dirtyFields, errors, setError, touchedFields } = formState;
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
    navigate({
      pathname: "/compatibility/compatibility-result",
      search: createSearchParams(data).toString(),
    });
    // setLoading(true);
    // HappyTankAPISvc.createCompatible(data)
    //   .then((res: any) => {
    //     navigate({
    //       pathname: "/compatibility/compatibility-result",
    //       search: createSearchParams(data).toString(),
    //     });
    //     setLoading(false);
    //   })
    //   .catch((e: any) => {
    //     alert(e?.message || "Error");
    //     setLoading(false);
    //   });
  };

  function name() {}

  return (
    <div className="relative min-h-screen bg-cover bg-center">
      <DefaultLayout>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <section className="grid p-8 bg-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="col-span-1 lg:col-span-5 p-8 lg:p-12 bg-white shadow-lg rounded-lg">
                <Typography
                  variant="h1"
                  className="text-3xl lg:text-4xl text-center"
                >
                  Do you want to see what your aquarium will look like?
                </Typography>
              </div>

              <div className="col-span-1 lg:col-span-7 p-8 lg:p-12 bg-white shadow-lg rounded-lg flex flex-col justify-center">
                <Typography
                  variant={"h2"}
                  className="text-2xl mb-4 text-gray-700"
                >
                  Check Fish Compatibility
                </Typography>
                <div className="mb-3">
                  <Input
                    label="First Fish"
                    type="text"
                    id="name1"
                    className=" mb-8"
                    autoComplete="off"
                    {...register("name1")}
                  />
                  {errors.name1 && (
                    <p className="text-red-500">{errors.name1.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <Input
                    label="Second Fish"
                    type="text"
                    {...register("name2")}
                    autoComplete="off"
                    className="mb-4"
                  />
                  {errors.name2 && (
                    <p className="text-red-500">{errors.name2.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <Input
                    label="Third Fish"
                    type="text"
                    autoComplete="off"
                    className="mb-4"
                    {...register("name3")}
                  />
                  {errors.name3 && (
                    <p className="text-red-500">{errors.name3.message}</p>
                  )}
                </div>

                <div className="submit-ctx">
                  <Button type="submit" className="" disabled={loading}>
                    {loading && (
                      <svg
                        aria-hidden="true"
                        className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300 mr-2"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    )}
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </form>
      </DefaultLayout>
    </div>
  );
}

export default CompatibilityTool;
