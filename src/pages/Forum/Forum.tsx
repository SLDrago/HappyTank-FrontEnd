import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Typography, Button, Input } from "@material-tailwind/react";
import {
  PencilSquareIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import DefaultLayout from "../../layout/default_layout";
import Post from "../../components/forum/Post";
import NewPostDialog from "../../components/forum/NewPostDialog";
import axios from "axios";
import PostSkeleton from "../../components/forum/PostSkeleton";
import { useAuth } from "../../context/AuthContext";

const backEndURL = import.meta.env.VITE_LARAVEL_APP_URL;

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [openNewPost, setOpenNewPost] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const initialFetchDone = useRef(false);
  const { token } = useAuth();

  const fetchPosts = async (pageNum: number) => {
    if (loading || (lastPage !== null && pageNum > lastPage)) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${backEndURL}/api/posts?page=${pageNum}`,
        {
          headers: {
            "Content-Type": "application/json",
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

  const searchPosts = async (query: string) => {
    setLoading(true);
    setIsSearching(true);
    setPosts([]); // Clear posts before displaying search results
    try {
      const response = await axios.post(
        `${backEndURL}/api/posts/search`,
        { query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const searchedPosts = response.data.data;
      setPosts(searchedPosts);
      setLastPage(null); // Reset pagination for search results
    } catch (error) {
      console.error("Failed to search posts", error);
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

  const handleSearchKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPosts(searchQuery);
    }
  };

  const handleBackToPosts = () => {
    setIsSearching(false);
    setSearchQuery("");
    setPosts([]);
    setPage(1);
    setLastPage(null);
    initialFetchDone.current = false;
    fetchPosts(1);
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
    <DefaultLayout>
      <div className="container mx-auto lg:px-72 py-8">
        <Typography variant="h3" className="mb-4">
          HappyTank Forum
        </Typography>
        <div className="flex justify-between items-center mb-6 gap-2">
          {isSearching && (
            <Button size="sm" className="mr-2" onClick={handleBackToPosts}>
              <ArrowLeftIcon className="w-5 h-5" />
            </Button>
          )}
          <Input
            type="search"
            className=""
            icon={<MagnifyingGlassIcon />}
            label="Search a post"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearchKeyPress}
          />
          {token && (
            <Button
              size="sm"
              className="flex items-center w-full lg:w-4/12 justify-center"
              onClick={() => setOpenNewPost(true)}
            >
              <PencilSquareIcon className="w-5 h-5 mr-2" />
              Create Post
            </Button>
          )}
        </div>
        {loading && <PostSkeleton />}
        {!loading && posts.length === 0 && (
          <Typography variant="lead" className="text-center mt-4">
            No posts found for your search
          </Typography>
        )}
        {!loading &&
          posts.length > 0 &&
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              updatePost={updatePost}
              deletePost={deletePost}
            />
          ))}
        {loading && <PostSkeleton />}
        {!loading && !allPostsLoaded && !isSearching && (
          <div className="text-center mt-4">
            <Button onClick={handleSeeMore}>See More</Button>
          </div>
        )}
        {allPostsLoaded && !isSearching && (
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
    </DefaultLayout>
  );
};

export default Forum;
