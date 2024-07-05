import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import {
  MoreVert,
  ThumbUp,
  ThumbDown,
  Comment,
  Margin,
} from "@mui/icons-material";

function PostSection({
  data,
  enableComment,
  loading,
  setLoading,
  callBackPost,
}: any) {
  const handleEnableComment = () => {
    setLoading(true);
    callBackPost({ action: "comment", data });
  };

  const handleLikeDislike = (type: string) => {
    setLoading(true);
    callBackPost({ action: type, data });
  };

  return (
    <>
      <div className="w-full md:w-2/3 mx-auto px-2 md:px-0">
        <Card>
          <CardHeader
            avatar={
              <Avatar
                src={"https://docs.material-tailwind.com/img/face-2.jpg"}
              />
            }
            // action={
            //   <IconButton aria-label="settings" onClick={handleOptionsClick}>
            //     <MoreVert />
            //   </IconButton>
            // }
            title={data?.title}
          />
          {/* <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleOptionsClose}
          >
            <MenuItem onClick={handleOptionsClose}>Edit</MenuItem>
            <MenuItem onClick={handleOptionsClose}>Report</MenuItem>
            <MenuItem onClick={handleOptionsClose}>Delete</MenuItem>
          </Menu> */}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {data?.description}
            </Typography>
          </CardContent>
          {/* {postImage && ( */}
          {data?.img?.trim() !== "" && (
            <CardMedia
              component="img"
              height="194"
              image={data?.img}
              alt="Post image"
            />
          )}
          {/* )} */}
          <CardActions disableSpacing>
            <IconButton
              className={data?.userLike ? "!text-blue-800" : ""}
              aria-label="upvote"
              disabled={loading}
              onClick={(e: any) => handleLikeDislike("like")}
            >
              <ThumbUp />
            </IconButton>
            <Typography>{data?.likeV}</Typography>
            <IconButton
              className={data?.userDislike ? "!text-blue-800" : ""}
              aria-label="downvote"
              disabled={loading}
              onClick={(e: any) => handleLikeDislike("dislike")}
            >
              <ThumbDown />
            </IconButton>
            <Typography>{data?.dislikeV}</Typography>
            <IconButton aria-label="comment" onClick={handleEnableComment}>
              <Comment />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    </>
  );
}
export default PostSection;
