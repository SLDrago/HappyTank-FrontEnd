import { Avatar } from "@material-tailwind/react";

function CommentSection({
  data,
  enableReply,
  loading,
  setLoading,
  parent,
  callBackComment,
}: any) {
  const handleEnableReply = () => {
    callBackComment({ action: "reply", data });
  };

  const handleLikeDislike = (type: string) => {
    setLoading(true);
    callBackComment({ action: type, data, parent });
  };

  return (
    <>
      <div className="w-full md:w-3/4 mx-auto px-2 md:px-0">
        <div className="mt-9 flex flex-row">
          {data?.img?.trim() !== "" ? (
            <Avatar
              src={data?.img}
              alt="avatar"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          ) : (
            <div className=" relative w-auto h-[58px] min-w-[58px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-full h-12 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          )}

          <div style={{ marginLeft: "10px" }}>
            <span className="font-bold">{data?.name}.</span>
            <span className="text-xs ml-2">{data?.createdV}</span>
            <p>{data?.message}</p>
            <div className="mt-3">
              <button
                type="button"
                onClick={(e: any) => handleLikeDislike("like")}
                disabled={loading}
                className={
                  (data?.userLike ? "bg-blue-900 text-white " : "") +
                  "mr-1 bg-gray-200 text-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                }
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
                </svg>
                <span className="ml-1 text-xs">{data?.likeV}</span>
              </button>

              <button
                type="button"
                onClick={(e: any) => handleLikeDislike("dislike")}
                disabled={loading}
                className={
                  (data?.userDislike ? "bg-blue-900 text-white " : "") +
                  "mr-5 bg-gray-200 text-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                }
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  {/* <path d="M17 14V2"></path> */}
                  <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z"></path>
                </svg>
                <span className="ml-1 text-xs">{data?.dislikeV}</span>
              </button>
              {enableReply && (
                <button
                  type="button"
                  onClick={handleEnableReply}
                  className="bg-gray-200 text-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-xs p-1.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                >
                  <svg
                    className="w-0 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  ></svg>
                  <span className="p-0">Reply</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
export default CommentSection;
