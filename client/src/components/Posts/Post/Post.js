import React from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import useStyles from "./Style";
import moment from "moment";
import { deletePost, likePost } from "../../../redux/actions/post";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}></CardMedia>
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="span" component="small">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {(user?.result.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            style={{ color: "#FFF" }}
            size="sm"
            onClick={() => setCurrentId(post._id)}>
            <Edit fontSize="small" />
          </Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {`${post.tags}`.split(",").map((p) => `#${p} `)}
        </Typography>
      </div>
      <CardContent className={classes.content}>
        <Typography variant="h6">{post.title}</Typography>
        <Typography
          style={{ textAlign: "justify" }}
          variant="body2"
          color="textSecondary"
          component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {(user?.result.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => dispatch(deletePost(post._id))}>
            <Delete fontSize="small" />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
