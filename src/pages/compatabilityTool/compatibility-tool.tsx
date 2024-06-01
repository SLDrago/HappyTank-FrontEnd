import DefaultLayout from "../../layout/default_layout";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

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
              <div className="col-span-1 lg:col-span-5 p-8 lg:p-12 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800 leading-relaxed text-center">
                  Do you want to see what your aquarium will look like?
                </h1>
              </div>

              <div className="form-fields col-span-1 lg:col-span-7 p-8 lg:p-12 bg-white shadow-lg rounded-lg flex flex-col justify-center">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                  Check Fish Compatibility
                </h2>

                <input
                  type="text"
                  id="name1"
                  placeholder="Fish Name 1"
                  className="field w-full p-2 mb-4 border border-gray-300 rounded"
                  {...register("name1")}
                />
                {errors.name1 && (
                  <p className="text-red-500">{errors.name1.message}</p>
                )}
                <input
                  type="text"
                  {...register("name2")}
                  placeholder="Fish Name 2"
                  className="field w-full p-2 mb-4 border border-gray-300 rounded"
                />
                {errors.name2 && (
                  <p className="text-red-500">{errors.name2.message}</p>
                )}

                <input
                  type="text"
                  placeholder="Fish Name 3"
                  className="field w-full p-2 mb-4 border border-gray-300 rounded"
                  {...register("name3")}
                />
                {errors.name3 && (
                  <p className="text-red-500">{errors.name3.message}</p>
                )}

                <div className="submit-ctx">
                  <button
                    type="submit"
                    className="submit-btn bg-indigo-500 text-white p-2 rounded w-full flex items-center justify-center disabled:opacity-50"
                    disabled={loading}
                  >
                    {loading && (
                      <svg
                        className="animate-spin h-5 w-5 mr-3 text-white"
                        viewBox="0 0 24 24"
                      >
                        {/* <!-- ... --> */}
                      </svg>
                    )}
                    Submit
                  </button>
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
