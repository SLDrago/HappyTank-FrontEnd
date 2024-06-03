import DefaultLayout from "../../layout/default_layout";
import { useEffect, useState } from "react";
import AddComment from "../../layout/AddComment";
import CommentSection from "../../layout/CommentSection";
import UtilsSvc from "../../services/utils-svc";

const comment = [
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
];

const userDetails = {
  name: "Hasitha Pawan Kumara",
  img: "https://docs.material-tailwind.com/img/face-2.jpg",
};

function Forum() {
  const [comments, setComments] = useState<any>([]);
  const [userInfo, setUserInfo] = useState(userDetails || {});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    comment.forEach((obj: any) => {
      obj.createdV = UtilsSvc?.getDateDifferent(obj?.created);
      obj.likeV = UtilsSvc?.numberkFormatter(obj?.like);
      obj.dislikeV = UtilsSvc?.numberkFormatter(obj?.dislike);
      if (Object.keys(obj?.reply).length !== 0) {
        obj.reply.createdV = UtilsSvc?.getDateDifferent(obj?.reply?.created);
        obj.reply.likeV = UtilsSvc?.numberkFormatter(obj?.reply?.like);
        obj.reply.dislikeV = UtilsSvc?.numberkFormatter(obj?.reply?.dislike);
      }
    });
    setComments(comment || []);
  }, []);

  const callBackAddComment = (data: any) => {
    const formattedData = {
      id: comments?.length + 100,
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
        // setLoading(true);
        if (comments?.length > 0) {
          comments.unshift(formattedData);
        } else {
          comments.push(formattedData);
        }
        setComments((oldRecord: any) => {
          oldRecord = comments;
          return [...oldRecord];
        });
        setTimeout(() => {
          setLoading(false);
        }, 100);
        break;
      case "reply":
        // setLoading(true);
        setComments((oldRecord: any) => {
          oldRecord = comments.map((item: any) =>
            item.id === data?.parentComment?.id
              ? { ...item, ...{ reply: formattedData, enableReply: false } }
              : item
          );
          return [...oldRecord];
        });
        setTimeout(() => {
          setLoading(false);
        }, 100);
        break;
    }
  };

  const callBackComment = (data: any) => {
    switch (data?.action) {
      case "reply":
        setComments(
          comments.map((item: any) =>
            item.id === data?.data?.id ? { ...item, enableReply: true } : item
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
        setComments((oldRecord: any) => {
          oldRecord = comments.map((item: any) => {
            if (data?.parent) {
              if (item.id === data?.parent?.id) {
                const replyObj: any = data?.parent?.reply;
                item.reply = { ...replyObj, ...formatted };
              }
              return item;
            } else {
              return item.id === data?.data?.id
                ? { ...item, ...formatted }
                : item;
            }
          });
          return [...oldRecord];
        });
        setTimeout(() => {
          setLoading(false);
        }, 100);
        break;
    }
  };

  return (
    <>
      <DefaultLayout>
        <div>
          <AddComment
            rows={2}
            userInfo={userInfo}
            loading={loading}
            setLoading={setLoading}
            replyData={null}
            callBackAddComment={callBackAddComment}
          />
        </div>
        {comments?.map((obj: any, index: number) => (
          <span key={index}>
            <div>
              <CommentSection
                data={obj}
                loading={loading}
                setLoading={setLoading}
                parent={null}
                enableReply={
                  Object.keys(obj?.reply).length === 0 && !obj?.enableReply
                    ? true
                    : false
                }
                callBackComment={callBackComment}
              />
            </div>
            <div className="ml-8 -mt-11">
              {Object.keys(obj?.reply).length !== 0 ? (
                <div className="-mb-9">
                  <CommentSection
                    data={obj?.reply}
                    parent={obj}
                    enableReply={false}
                    loading={loading}
                    setLoading={setLoading}
                    callBackComment={callBackComment}
                  />
                </div>
              ) : (
                obj?.enableReply && (
                  <div>
                    <AddComment
                      rows={1}
                      userInfo={userInfo}
                      loading={loading}
                      setLoading={setLoading}
                      replyData={obj}
                      callBackAddComment={callBackAddComment}
                    />
                  </div>
                )
              )}
            </div>
          </span>
        ))}
      </DefaultLayout>
    </>
  );
}
export default Forum;
