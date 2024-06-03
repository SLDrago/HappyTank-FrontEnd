import DefaultLayout from "../../layout/default_layout";
import { useEffect } from "react";
import AddComment from "../../components/forum/AddComment";
import CommentSection from "../../components/forum/CommentSection";
import UtilsSvc from "../../services/utils-svc";
import React, { useState } from "react";
import NewPostModal from "../../components/forum/NewPostModal";
import PostSection from "../../components/forum/PostSection";

const post = [
  {
    id: 500,
    createdBy: "Lakmal Kumara silva",
    profileImg: "https://docs.material-tailwind.com/img/face-2.jpg",
    title: "This is the Title",
    description:
      "  Get started with this simple avatar example that comes with apre-set image, ensuring that your avatars look great from thestart. You can easily replace the default src with any image URLto display user-specific avatars.",
    created: "2024-05-03 14:33:45",
    img: "https://docs.material-tailwind.com/img/face-2.jpg",
    like: 3504,
    dislike: 582,
    userLike: true,
    comments: [
      {
        id: 1,
        name: "Ruwan Kumara silva",
        created: "2024-05-03 14:33:45",
        img: "https://docs.material-tailwind.com/img/face-2.jpg",
        message:
          "Get started with this simple avatar example that comes with apre-set image, ensuring that your avatars look great from thestart. You can easily replace the default src with any image URLto display user-specific avatars.",
        like: 3504,
        dislike: 582,
        userLike: true,
        reply: {
          id: 2,
          name: "Yasath Pradeep silva",
          created: "2020-09-03 14:33:45",
          img: "",
          message:
            "sdf Get started with this simple avatar example that comes with apre-set image, ensuring that your avatars look great from thestart. You can easily replace the default src with any image URLto display user-specific avatars.",
          like: 58504,
          dislike: 1582,
          userDislike: true,
        },
      },
      {
        id: 3,
        name: "Nuwan Pradeep silva",
        created: "2023-09-03 14:33:45",
        img: "",
        message:
          "sdf Get started with this simple avatar example that comes with apre-set image, ensuring that your avatars look great from thestart. You can easily replace the default src with any image URLto display user-specific avatars.",
        like: 58504,
        dislike: 1582,
        enableReply: false,
        reply: {},
      },
      {
        id: 4,
        name: "Osad Kumara ushan",
        created: "2024-06-01 10:33:45",
        img: "",
        message:
          "Get started with this simple avatar example that comes with apre-set image, ensuring that your avatars look great from thestart. You can easily replace the default src with any image URLto display user-specific avatars.",
        like: 35084,
        dislike: 5482,
        reply: {
          id: 5,
          name: "Yasath Pradeep silva",
          created: "2020-09-03 14:33:45",
          img: "",
          message:
            "sdf Get started with this simple avatar example that comes with apre-set image, ensuring that your avatars look great from thestart. You can easily replace the default src with any image URLto display user-specific avatars.",
          like: 58504,
          dislike: 1582,
          userLike: true,
        },
      },
      {
        id: 6,
        name: "Kusum Kumara silva",
        created: "2024-02-03 14:33:45",
        img: "https://docs.material-tailwind.com/img/face-2.jpg",
        message:
          "Get started with this simple avatar example that comes with apre-set image, ensuring that your avatars look great from thestart. You can easily replace the default src with any image URLto display user-specific avatars.",
        like: 3504,
        dislike: 582,
        userDislike: true,
        reply: {
          id: 7,
          name: "ruwan Pradeep silva",
          created: "2020-09-03 14:33:45",
          img: "https://docs.material-tailwind.com/img/face-2.jpg",
          message:
            "sdf Get started with this simple avatar example that comes with apre-set image, ensuring that your avatars look great from thestart. You can easily replace the default src with any image URLto display user-specific avatars.",
          like: 58504,
          dislike: 1582,
        },
      },
    ],
  },
];

const userDetails = {
  name: "Hasitha Pawan Kumara",
  img: "https://docs.material-tailwind.com/img/face-2.jpg",
};

function Forum() {
  const [posts, setPosts] = useState<any>([]);
  const [userInfo, setUserInfo] = useState(userDetails || {});
  const [loading, setLoading] = useState(false);
  const [openPostModal, setOpenPostModal] = useState(false);

  useEffect(() => {
    try {
      post.forEach((item: any) => {
        item.likeV = UtilsSvc?.numberkFormatter(item?.like);
        item.dislikeV = UtilsSvc?.numberkFormatter(item?.dislike);
        item?.comments?.forEach((obj: any) => {
          obj.createdV = UtilsSvc?.getDateDifferent(obj?.created);
          obj.likeV = UtilsSvc?.numberkFormatter(obj?.like);
          obj.dislikeV = UtilsSvc?.numberkFormatter(obj?.dislike);
          if (Object.keys(obj?.reply).length !== 0) {
            obj.reply.createdV = UtilsSvc?.getDateDifferent(
              obj?.reply?.created
            );
            obj.reply.likeV = UtilsSvc?.numberkFormatter(obj?.reply?.like);
            obj.reply.dislikeV = UtilsSvc?.numberkFormatter(
              obj?.reply?.dislike
            );
          }
        });
      });
      setPosts(post || []);
    } catch (e) {
      console.error("Error - ", e);
    }
  }, []);

  const callBackAddComment = (data: any) => {
    try {
      const formattedData = {
        id: posts?.length + 10000,
        name: userInfo?.name,
        created: new Date().toString(),
        createdV: UtilsSvc?.getDateDifferent(new Date().toString()),
        img: userInfo?.img,
        message: data?.data,
        like: 0,
        likeV: "0",
        dislike: 0,
        dislikeV: "0",
        reply: {},
      };
      switch (data?.action) {
        case "comment":
          const formattedList = posts.map((item: any) => {
            if (item?.id === data?.parentPost?.id) {
              if (item?.comments?.length > 0) {
                item.comments.unshift(formattedData);
              } else {
                item.comments.push(formattedData);
              }
              item.enableComment = false;
            }
            return item;
          });
          setPosts((oldRecord: any) => {
            oldRecord = formattedList;
            return [...oldRecord];
          });
          setTimeout(() => {
            setLoading(false);
          }, 100);
          break;
        case "reply":
          // setLoading(true);
          const formattedLists = posts.map((item: any) => {
            if (item?.id === data?.parentPost?.id) {
              item?.comments?.map((comment: any) => {
                if (comment?.id === data?.parentComment?.id) {
                  comment.reply = formattedData;
                }
              });
            }
            return item;
          });
          setPosts((oldRecord: any) => {
            oldRecord = formattedLists;
            return [...oldRecord];
          });
          setTimeout(() => {
            setLoading(false);
          }, 100);
          break;
      }
    } catch (e) {
      console.error("Error - ", e);
    }
  };

  const callBackComment = (data: any) => {
    try {
      switch (data?.action) {
        case "reply":
          const formattedList = posts.map((item: any) => {
            if (item?.id === data?.parent?.id) {
              item?.comments?.map((comment: any) => {
                if (comment.id === data?.data?.id) {
                  comment.enableReply = true;
                }
              });
            }
            return item;
          });
          setPosts((oldRecord: any) => {
            oldRecord = formattedList;
            return [...oldRecord];
          });
          setTimeout(() => {
            setLoading(false);
          }, 100);
          break;
        case "like":
        case "dislike":
          const formatted: any = {};
          formatted.like = data?.data?.like || 0;
          formatted.dislike = data?.data?.dislike || 0;
          if (data?.action === "like") {
            if (data?.data?.userLike) {
              formatted.like = data?.data?.like - 1 || 0;
              formatted.userLike = false;
            } else {
              if (data?.data?.userDislike) {
                formatted.dislike = data?.data?.dislike - 1 || 0;
              }
              formatted.userLike = true;
              formatted.like = data?.data?.like + 1 || 0;
              formatted.userDislike = false;
            }
          } else {
            if (data?.data?.userDislike) {
              formatted.dislike = data?.data?.dislike - 1 || 0;
              formatted.userDislike = false;
            } else {
              if (data?.data?.userLike) {
                formatted.like = data?.data?.like - 1 || 0;
              }
              formatted.userDislike = true;
              formatted.dislike = data?.data?.dislike + 1 || 0;
              formatted.userLike = false;
            }
          }
          formatted.likeV = UtilsSvc?.numberkFormatter(formatted?.like);
          formatted.dislikeV = UtilsSvc?.numberkFormatter(formatted?.dislike);
          const formattedLists = posts.map((item: any) => {
            if (item?.id === data?.parent?.id) {
              item?.comments?.map((comment: any) => {
                if (!data?.parentReply) {
                  if (comment.id === data?.data?.id) {
                    comment.like = formatted.like;
                    comment.dislike = formatted.dislike;
                    comment.likeV = formatted.likeV;
                    comment.dislikeV = formatted.dislikeV;
                    comment.userLike = formatted.userLike || false;
                    comment.userDislike = formatted.userDislike || false;
                  }
                } else {
                  if (comment?.id === data?.parentReply?.id) {
                    comment.reply.like = formatted.like;
                    comment.reply.dislike = formatted.dislike;
                    comment.reply.likeV = formatted.likeV;
                    comment.reply.dislikeV = formatted.dislikeV;
                    comment.reply.userLike = formatted.userLike || false;
                    comment.reply.userDislike = formatted.userDislike || false;
                  }
                }
                return comment;
              });
            }
            return item;
          });
          setPosts((oldRecord: any) => {
            oldRecord = formattedLists;
            return [...oldRecord];
          });
          setTimeout(() => {
            setLoading(false);
          }, 100);
          break;
      }
    } catch (e) {
      console.error("Error - ", e);
    }
  };

  const callBackPostModal = (data: any) => {
    try {
      switch (data?.action) {
        case "submit":
          const formattedData = {
            id: posts?.length + 1000,
            createdBy: userInfo?.name,
            profileImg: userInfo?.img || "",
            title: data?.data?.title,
            description: data?.data?.description,
            created: new Date().toString(),
            img: data?.data?.img,
            like: 0,
            dislike: 0,
            comments: [],
          };
          if (posts?.length > 0) {
            posts.unshift(formattedData);
          } else {
            posts.push(formattedData);
          }
          setPosts((oldRecord: any) => {
            oldRecord = posts;
            return [...oldRecord];
          });
          setOpenPostModal(false);
          setTimeout(() => {
            setLoading(false);
          }, 100);
          break;
        case "close":
          setOpenPostModal(false);
          break;
      }
    } catch (e) {
      console.error("Error - ", e);
    }
  };

  const callBackPost = (data: any) => {
    try {
      switch (data?.action) {
        case "comment":
          setPosts(
            posts.map((item: any) =>
              item.id === data?.data?.id
                ? { ...item, enableComment: true }
                : item
            )
          );
          setTimeout(() => {
            setLoading(false);
          }, 100);
          break;
        case "like":
        case "dislike":
          const formatted: any = {};
          formatted.like = data?.data?.like || 0;
          formatted.dislike = data?.data?.dislike || 0;
          if (data?.action === "like") {
            if (data?.data?.userLike) {
              formatted.like = data?.data?.like - 1 || 0;
              formatted.userLike = false;
            } else {
              if (data?.data?.userDislike) {
                formatted.dislike = data?.data?.dislike - 1 || 0;
              }
              formatted.userLike = true;
              formatted.like = data?.data?.like + 1 || 0;
              formatted.userDislike = false;
            }
          } else {
            if (data?.data?.userDislike) {
              formatted.dislike = data?.data?.dislike - 1 || 0;
              formatted.userDislike = false;
            } else {
              if (data?.data?.userLike) {
                formatted.like = data?.data?.like - 1 || 0;
              }
              formatted.userDislike = true;
              formatted.dislike = data?.data?.dislike + 1 || 0;
              formatted.userLike = false;
            }
          }
          formatted.likeV = UtilsSvc?.numberkFormatter(formatted?.like);
          formatted.dislikeV = UtilsSvc?.numberkFormatter(formatted?.dislike);
          setPosts((oldRecord: any) => {
            oldRecord = posts.map((item: any) => {
              return item.id === data?.data?.id
                ? { ...item, ...formatted }
                : item;
            });
            return [...oldRecord];
          });
          setTimeout(() => {
            setLoading(false);
          }, 100);
          break;
      }
    } catch (e) {
      console.error("Error - ", e);
    }
  };

  return (
    <>
      {openPostModal && (
        <NewPostModal
          userInfo={userInfo}
          loading={loading}
          setLoading={setLoading}
          callBackPostModal={callBackPostModal}
        />
      )}
      <DefaultLayout>
        <div className="flex items-center justify-between mb-10 mx-auto px-2 md:px-0 w-full max-w-3xl">
          <button
            type="button"
            onClick={(e: any) => setOpenPostModal(true)}
            className="flex items-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-6 h-6 text-white dark:text-white mr-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M8 7V2.221a2 2 0 0 0-.5.365L3.586 6.5a2 2 0 0 0-.365.5H8Zm2 0V2h7a2 2 0 0 1 2 2v.126a5.087 5.087 0 0 0-4.74 1.368v.001l-6.642 6.642a3 3 0 0 0-.82 1.532l-.74 3.692a3 3 0 0 0 3.53 3.53l3.694-.738a3 3 0 0 0 1.532-.82L19 15.149V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M17.447 8.08a1.087 1.087 0 0 1 1.187.238l.002.001a1.088 1.088 0 0 1 0 1.539l-.377.377-1.54-1.542.373-.374.002-.001c.1-.102.22-.182.353-.237Zm-2.143 2.027-4.644 4.644-.385 1.924 1.925-.385 4.644-4.642-1.54-1.54Zm2.56-4.11a3.087 3.087 0 0 0-2.187.909l-6.645 6.645a1 1 0 0 0-.274.51l-.739 3.693a1 1 0 0 0 1.177 1.176l3.693-.738a1 1 0 0 0 .51-.274l6.65-6.646a3.088 3.088 0 0 0-2.185-5.275Z"
                clipRule="evenodd"
              />
            </svg>
            New Post
          </button>

          {/* <form className="flex-grow ml-4"> */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 pr-32 text-sm text-gray-300 border border-white rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-500 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
          {/* </form> */}
        </div>

        {posts?.map((obj: any, index: number) => (
          <span key={index}>
            <div className="mb-8">
              <PostSection
                data={obj}
                loading={loading}
                setLoading={setLoading}
                enableComment={obj?.enableComment ? true : false}
                callBackPost={callBackPost}
              />
            </div>
            {obj?.enableComment && (
              <div>
                <AddComment
                  rows={1}
                  userInfo={userInfo}
                  loading={loading}
                  setLoading={setLoading}
                  replyData={null}
                  parentPost={obj}
                  callBackAddComment={callBackAddComment}
                />
              </div>
            )}

            {obj?.comments?.map((comment: any, index2: number) => (
              <span key={index2}>
                <div>
                  <CommentSection
                    data={comment}
                    loading={loading}
                    setLoading={setLoading}
                    parent={obj}
                    parentReply={null}
                    enableReply={
                      Object.keys(comment?.reply).length === 0 &&
                      !comment?.enableReply
                        ? true
                        : false
                    }
                    callBackComment={callBackComment}
                  />
                </div>
                <div className="ml-8 -mt-11">
                  {Object.keys(comment?.reply).length !== 0 ? (
                    <div className="-mb-9">
                      <CommentSection
                        data={comment?.reply}
                        parent={obj}
                        parentReply={comment}
                        enableReply={false}
                        loading={loading}
                        setLoading={setLoading}
                        callBackComment={callBackComment}
                      />
                    </div>
                  ) : (
                    comment?.enableReply && (
                      <div>
                        <AddComment
                          rows={1}
                          userInfo={userInfo}
                          loading={loading}
                          setLoading={setLoading}
                          replyData={comment}
                          parentPost={obj}
                          callBackAddComment={callBackAddComment}
                        />
                      </div>
                    )
                  )}
                </div>
              </span>
            ))}
          </span>
        ))}
      </DefaultLayout>
    </>
  );
}
export default Forum;
