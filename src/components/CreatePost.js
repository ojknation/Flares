import { IconButton, TextField, Typography, Box } from "@mui/material";
import PictureUpload from "./PictureUpload";
import {
  AddPhotoAlternateOutlined,
  StickyNote2,
  AddLink,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

function isURL(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

const FlareTypes = {
  1: "a text",
  2: "an image",
  3: "a link",
};

const CharacterLimit = ({ limit, limitText }) => (
  <Box mb={1} display="flex" justifyContent="flex-end">
    <Typography
      fontSize="12px"
      variant="subtitle2"
      sx={{
        color: `${limit - limitText < 10 ? "red" : "#616161"}`,
        marginTop: "-15px",
      }}
    >
      {limitText}/{limit}
    </Typography>
  </Box>
);

const CreatePost = ({
  createPost,
  togglePostType,
  imgObj,
  setImgObj,
  flare,
  setFlare,
  loading,
}) => {
  let postType = flare.type;
  return (
    <Box
      padding={3}
      borderRadius={3}
      sx={{ maxWidth: 400, marginBottom: 2, background: "#fff" }}
    >
      <Box display="flex" alignItems="baseline">
        <Typography
          mr={1}
          sx={{ color: "primary.main" }}
          mb={2}
          fontWeight="bold"
          variant="h6"
        >
          {`Send ${FlareTypes[postType]} flare!`}
        </Typography>
        <LocalFireDepartmentIcon fontSize="40px" color="warning" />
      </Box>
      <TextField
        label="Title"
        value={flare.title}
        onChange={(e) => setFlare({ ...flare, title: e.target.value })}
        sx={{
          background: "#fff",
          marginBottom: 2,
        }}
        fullWidth
      />
      <CharacterLimit limit={50} limitText={flare.title.length} />
      <TextField
        label="Username"
        value={flare.username}
        onChange={(e) => setFlare({ ...flare, username: e.target.value })}
        sx={{
          background: "#fff",
          marginBottom: 2,
        }}
        fullWidth
      />
      <CharacterLimit limit={20} limitText={flare.username.length} />

      {postType === 2 ? (
        <PictureUpload postImgObj={imgObj} setPostImgObj={setImgObj} />
      ) : (
        <TextField
          multiline
          rows={postType === 3 ? 2 : 4}
          value={flare.content}
          label={`${postType === 1 ? "Share the flare" : "Share your link"}`}
          placeholder="write here"
          fullWidth
          onChange={(e) => setFlare({ ...flare, content: e.target.value })}
          sx={{
            background: "#fff",
            marginBottom: 2,
          }}
        />
      )}
      {postType === 1 && (
        <CharacterLimit limit={200} limitText={flare.content.length} />
      )}

      {flare.type === 3 && !isURL(flare.content) && (
        <Typography
          sx={{ color: "red" }}
          fontSize="12px"
          mb={1}
          variant="subtitle2"
        >
          You must enter a valid link to be able to submit
        </Typography>
      )}
      <Box display="flex" alignItems="center">
        <IconButton onClick={() => togglePostType(1)}>
          <StickyNote2 color={`${postType === 1 ? "primary" : "disabled"}`} />
        </IconButton>
        <IconButton sx={{ margin: "0 4px" }} onClick={() => togglePostType(2)}>
          <AddPhotoAlternateOutlined
            color={`${postType === 2 ? "primary" : "disabled"}`}
          />
        </IconButton>
        <IconButton onClick={() => togglePostType(3)}>
          <AddLink color={`${postType === 3 ? "primary" : "disabled"}`} />
        </IconButton>
        <LoadingButton
          onClick={createPost}
          sx={{ marginLeft: "auto" }}
          variant="contained"
          loading={loading}
          disabled={
            (flare.type === 3 && !isURL(flare.content)) ||
            (postType === 1 && flare.content === "") ||
            (postType === 1 && flare.content.length > 200) || 
            (flare.title.length > 50) || 
            (flare.username.length > 20) || 
            (postType === 2 && Object.keys(imgObj).length === 0)
          }
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default CreatePost;
