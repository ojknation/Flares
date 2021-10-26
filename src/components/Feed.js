import { Box } from "@mui/material";
import FeedCard from "./FeedCard";

const Feed = ({posts}) => {
  return (
    <Box>
      {posts?.map((post) => (
        <FeedCard
          key={post.id}
          username={post.username}
          content={post.content}
          type={post.type}
          imgUrl={post.imgUrl}
          title={post.title}
          id={post.id}
          upvotes={post.upvote}
        />
      ))}
    </Box>
  );
};

export default Feed;
