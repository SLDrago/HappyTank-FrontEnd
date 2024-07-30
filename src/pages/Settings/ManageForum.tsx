import React, { useState, useEffect, useRef } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { CameraIcon } from "@heroicons/react/24/outline";
import SettingsLayout from "../../layout/settings_layout";
import Post from "../../components/forum/Post";
import NewPostDialog from "../../components/forum/NewPostDialog";
import axios from "axios";
import PostSkeleton from "../../components/forum/PostSkeleton";
import { useAuth } from "../../context/AuthContext";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

const ManageForum: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [openNewPost, setOpenNewPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const initialFetchDone = useRef(false);
  const { token, user } = useAuth();

  const fetchPosts = async (pageNum: number) => {
    if (loading || (lastPage !== null && pageNum > lastPage)) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${backEndURL}/api/posts/getUserPosts?page=${pageNum}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newPosts = response.data.data;

      if (newPosts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setLastPage(response.data.last_page);
      } else {
        setLastPage(pageNum - 1);
      }
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialFetchDone.current) {
      fetchPosts(1);
      initialFetchDone.current = true;
    }
  }, []);

  const handleSeeMore = () => {
    const nextPage = page + 1;
    if (lastPage === null || nextPage <= lastPage) {
      setPage(nextPage);
      fetchPosts(nextPage);
    }
  };

  const addNewPost = (newPost: any) => {
    if (newPost && newPost.id) {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } else {
      console.error("New post is missing required properties:", newPost);
    }
  };

  const updatePost = (updatedPost: any) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const deletePost = (postId: number) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const allPostsLoaded = lastPage !== null && page >= lastPage;

  return (
    <SettingsLayout>
      <div className="container mx-auto lg:px-72 py-8">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h3">{user?.name}</Typography>
          <Button
            className="flex items-center"
            onClick={() => setOpenNewPost(true)}
          >
            <CameraIcon className="w-5 h-5 mr-2" />
            Create Post
          </Button>
        </div>
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            updatePost={updatePost}
            deletePost={deletePost}
          />
        ))}
        {loading && <PostSkeleton />}
        {!loading && !allPostsLoaded && (
          <div className="text-center mt-4">
            <Button onClick={handleSeeMore}>See More</Button>
          </div>
        )}
        {allPostsLoaded && (
          <Typography variant="lead" className="text-center mt-4">
            No more posts
          </Typography>
        )}
        <NewPostDialog
          open={openNewPost}
          handleOpen={() => setOpenNewPost(!openNewPost)}
          addNewPost={addNewPost}
        />
      </div>
    </SettingsLayout>
  );
};

export default ManageForum;
