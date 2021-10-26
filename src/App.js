import {
  Container,
  Grid,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Fab,
  Modal,
  Backdrop,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import NavBar from "./components/NavBar";
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";
import { getAuth, signInAnonymously } from "firebase/auth";
import { uploadImage } from "./util/uploadImage";

const POST_TYPES = {
  PLAIN_TEXT: 1,
  IMAGE: 2,
  LINK: 3,
};

function App() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [posts, setPosts] = useState([]);
  const [imgObj, setImgObj] = useState({});
  const [sendingFlare, setSendingFlare] = useState(false);
  const [reloadPosts, setReloadPosts] = useState(false);
  const [open, setOpen] = useState(false);
  const [postType, setPostType] = useState(POST_TYPES.PLAIN_TEXT);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  const [flare, setFlare] = useState({
    username: "",
    title: "",
    content: "",
    type: 1,
    imgUrl: "",
    upvote: "0",
  });

  const refetchPosts = () => setReloadPosts(!reloadPosts);
  const toggleModal = () => setOpen(!open);

  const sortByUpvotes = () => {
    let sorted = posts.sort((a, b) => b.upvote - a.upvote);
    setPosts(sorted);
    setAnchorEl(null);
  };

  useEffect(() => {
    loadPosts();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [reloadPosts]);

  const resetFlare = () => {
    setFlare({
      username: "",
      title: "",
      content: "",
      upvote: "0",
      type: 1,
    });
    if (imgObj.pic) {
      setImgObj({});
    }
    refetchPosts();
    setOpen(false);
  };

  const togglePostType = (postType) => {
    setFlare({ ...flare, type: postType });
    setPostType(postType);
  };

  const loadPosts = async () => {
    const res = await fetch(`${process.env.REACT_APP_BASE_API_URL}/posts`);
    const data = await res.json();
    setPosts(data.posts);
  };

  const createPost = async () => {
    setSendingFlare(true);
    const auth = getAuth();
    await signInAnonymously(auth);
    let img;
    if (imgObj.pic) {
      img = await uploadImage(imgObj.pic, "posts/");
    }
    try {
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...flare, imgUrl: img }),
      };
      await fetch(`${process.env.REACT_APP_BASE_API_URL}/posts`, options);
      resetFlare();
      setSendingFlare(false);
    } catch (error) {
      console.log(error);
      setSendingFlare(false);
    }
  };

  const renderCreatePost = () => (
    <CreatePost
      postType={postType}
      createPost={createPost}
      togglePostType={togglePostType}
      imgObj={imgObj}
      setImgObj={setImgObj}
      flare={flare}
      setFlare={setFlare}
      loading={sendingFlare}
    />
  );
  return (
    <Box>
      <Container maxWidth="lg">
        <NavBar toggleMenu={toggleMenu} />
        <Box sx={{ margin: "48px auto" }}>
          <Grid sx={{ marginTop: "100px" }} container spacing={2}>
            <Grid item sm={12} md={7}>
              {!posts.length ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="70vh"
                >
                  <CircularProgress />
                </Box>
              ) : (
                <Feed posts={posts} />
              )}
            </Grid>
            {isSmallScreen ? (
              <Box sx={{ position: "fixed", right: "3%", bottom: "4%" }}>
                <Fab color="primary" size="large" onClick={toggleModal}>
                  <AddIcon />
                </Fab>
              </Box>
            ) : (
              <Grid
                sx={{ position: "fixed", right: "2.5%", width: "100%" }}
                item
                sm={12}
                md={5}
              >
                {renderCreatePost()}
              </Grid>
            )}
          </Grid>
        </Box>
        <Modal BackdropComponent={Backdrop} open={open} onClose={toggleModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "fit-content",
            }}
          >
            {renderCreatePost()}
          </Box>
        </Modal>
        <Menu
          id="activity-card menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          open={openMenu}
          onClose={handleClose}
          anchorEl={anchorEl}
        >
          <MenuItem onClick={sortByUpvotes}>Sort by most popular</MenuItem>
          <MenuItem
            onClick={() => {
              refetchPosts();
              setAnchorEl(null);
            }}
          >
            Sort by most recent{" "}
          </MenuItem>
        </Menu>
      </Container>
    </Box>
  );
}

export default App;
