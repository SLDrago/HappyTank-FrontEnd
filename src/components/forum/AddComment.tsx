import { Avatar, IconButton, Textarea } from "@material-tailwind/react";
import { useEffect, useState } from "react";

function AddComment({
  rows,
  userInfo,
  loading,
  setLoading,
  replyData,
  parentPost,
  callBackAddComment,
}: any) {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!loading) {
      setMsg("");
    }
  }, [loading]);

  const handleSubmitMsg = () => {
    if (msg?.trim() !== "") {
      setLoading(true);
      if (!replyData) {
        callBackAddComment({ action: "comment", data: msg, parentPost });
      } else {
        callBackAddComment({
          action: "reply",
          data: msg,
          parentComment: replyData,
          parentPost,
        });
      }
    }
  };

  return (
    <>
      <div className="w-full md:w-2/3 mx-auto px-2 md:px-0">
        <div className="flex items-center gap-4 mt-10 p-2 border border-gray-900/10 bg-gray-900/5 rounded-[99px]">
          {userInfo?.img?.trim() !== "" ? (
            <Avatar
              size="lg"
              alt="avatar"
              src={userInfo?.img}
              className="border border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          ) : (
            <div className="border border-green-500 shadow-xl shadow-green-900/20 ring-4 ring-green-500/30 relative w-auto h-[58px] min-w-[58px] overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
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

          <div className="flex flex-grow items-center gap-2 rounded-[99px] p-2 border border-gray-900/10 bg-gray-900/5">
            <Textarea
              rows={rows}
              resize={true}
              placeholder="Your Message"
              className="min-h-full !border-0 focus:border-transparent"
              containerProps={{
                className: "grid h-full",
              }}
              value={msg || ""}
              onChange={(e) => {
                setMsg(e?.target?.value || "");
              }}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
            <div>
              <IconButton
                variant="text"
                className="rounded-full"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                onClick={handleSubmitMsg}
                disabled={loading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AddComment;
