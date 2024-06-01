import DefaultLayout from "../../layout/default_layout";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const defaultValues = {
  name1: "",
  name2: "",
  name3: "",
};

export function FIshCompatibilityResult() {
  const validationSchema = Yup.object().shape({
    name1: Yup.string()
      .required("This field is required!")
      .min(3, "At least 3 characters")
      .max(50, "Maximum length is 50"),
    name2: Yup.string().required("This field is required!"),
    name3: Yup.string(),
  });
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

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    // TenantsAPISvc.registerTenants(data)
    //   .then((res) => {
    //     dispatch(showMessage({ message: t('USER_CREATED_SUCCESSFULLY'), variant: 'success' }));
    //     setIsEmailSuccessfullySent(true);
    //     setLoading(false);
    //   })
    //   .catch((e) => {
    //     dispatch(showMessage({ message: e?.response?.data?.message || 'Error', variant: 'error' }));
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
              <div className="flex justify-center col-span-1 lg:col-span-5 p-8 lg:p-12 bg-white shadow-lg rounded-lg">
                <div className="relative size-40">
                  <svg
                    className="size-full"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      className="stroke-current  text-blue-600 dark:text-blue-500"
                      stroke-width="2"
                    ></circle>

                    <g className="origin-center -rotate-90 transform">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="stroke-current  text-gray-200 dark:text-neutral-700"
                        stroke-width="2"
                        stroke-dasharray="100"
                        stroke-dashoffset="72"
                      ></circle>
                    </g>
                  </svg>
                  <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                    <span className="text-center text-2xl font-bold text-gray-800 dark:text-white">
                      72%
                    </span>
                  </div>
                </div>
                <p className="content-end font-bold text-green-500">Good</p>
              </div>

              <div className="form-fields col-span-1 lg:col-span-7 p-8 lg:p-12 bg-white shadow-lg rounded-lg flex flex-col justify-center">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                  Results for your selected fish
                </h2>

                <div className="mb-4">
                  <strong>Temperament: </strong>
                  {}
                </div>
                <div className="mb-4">
                  <strong>Size Disparities: </strong>
                  {}
                </div>
                <div className="mb-4">
                  <strong>Shared Preferences for Water Parameters: </strong>
                  {}
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="gap-4 flex justify-center ">
                <div className="col-span-4 p-6 lg:p-8 w-1/3 block max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                  <div className="">
                    <h6 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
                      Noteworthy technology acquisitions 2021
                    </h6>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                  </div>
                </div>
                <div className="col-span-4 p-8 lg:p-12 bg-white shadow-lg rounded-lg w-1/3">
                  sdfsdfsd
                </div>
                <div className="col-span-4 p-8 lg:p-12 bg-white shadow-lg rounded-lg w-1/3">
                  sdfsdfsd
                </div>
              </div>
            </div>
          </section>
        </form>
      </DefaultLayout>
    </div>
  );
}

export default FIshCompatibilityResult;
