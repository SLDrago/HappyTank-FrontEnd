import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const defaultValues = {
  title: "",
  description: "",
  img: "",
};

function NewPostModal({
  userInfo,
  loading,
  setLoading,
  callBackPostModal,
}: any) {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("This field is required!")
      .min(3, "At least 3 characters")
      .max(50, "Maximum length is 50"),
    description: Yup.string().required("This field is required!"),
    img: Yup.string(),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const { register, handleSubmit, formState } = methods;
  const { errors } = formState;

  const handleClose = () => {
    setLoading(false);
    callBackPostModal({ action: "close", data: {} });
  };

  const onSubmit = (data: any) => {
    setLoading(true);
    callBackPostModal({ action: "submit", data });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          {/* <div className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"> */}
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  New Post
                </h3>
                <button
                  type="button"
                  onClick={handleClose}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <div className="editor mx-auto w-full flex flex-col text-gray-800 p-6 rounded-lg bg-white transition duration-300">
                  <input
                    className="title bg-gray-100 border border-gray-300 p-3 mb-4 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
                    spellCheck="false"
                    placeholder="Title"
                    type="text"
                    autoComplete="off"
                    {...register("title")}
                    required
                  />
                  {errors.title && (
                    <p className="text-red-500">{errors.title.message}</p>
                  )}
                  <textarea
                    className="description bg-gray-100 sec p-3 h-60 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
                    spellCheck="false"
                    placeholder="Describe everything about this post here"
                    required
                    autoComplete="off"
                    {...register("description")}
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500">{errors.description.message}</p>
                  )}

                  <div className="icons flex text-gray-500 mt-4 mb-2">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white mr-3 cursor-pointer hover:text-blue-500 border border-blue-500 rounded-full p-1 transition duration-300 ease-in-out"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z"
                        clipRule="evenodd"
                      />
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="count ml-auto text-gray-400 text-xs font-semibold">
                      0/300
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Post
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
export default NewPostModal;
