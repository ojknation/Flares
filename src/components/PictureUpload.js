import { styled, Box, Button, SvgIcon } from "@mui/material";
import React, { useRef, useState } from "react";
import { ReactComponent as PlaceHolder } from '../assets/image-placeholder.svg'

const beforePreview = (file) => {
  const isJpgOrPng =
    file?.type === "image/jpeg" ||
    file?.type === "image/png" ||
    file?.type === "image/gif";
  const isLt4M = file?.size / 1024 / 1024 < 4;

  return isJpgOrPng && isLt4M;
};

const PictureUpload = ({ postImgObj, setPostImgObj }) => {
  const imgRef = useRef(null);
  const [imgFile, setImgFile] = useState("");
  const [, setImgPreviewUrl] = useState("");
  const [isImageError, setIsImageError] = useState(false);

  const handleImageChange = (
    e,
    setIsError,
    setFile,
    setPreviewUrl,
    setImgObj
  ) => {
    e.preventDefault();
    setIsError(false);

    const reader = new FileReader();
    const file = e.target.files[0];

    const isValid = beforePreview(file);

    reader.onloadend = () => {
      setFile(file);
      setPreviewUrl(reader.result);
      setImgObj((img) => ({
        ...img,
        pic: file,
        picUrl: reader.result,
      }));
    };

    if (!file) {
      reader.abort();
    } else if (file && !isValid) {
      reader.abort();
      setIsError(true);
    } else {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        {!!imgFile ? (
          <PostImg previewUrl={postImgObj?.picUrl} isError={isImageError} />
        ) : (
          <SvgIcon sx={{height:"200px", width:"200px"}} htmlColor="">
            <PlaceHolder fill="#d4d7d9"/>
          </SvgIcon>
        )}
        <Button
          sx={{ height: 35, marginBottom: 3 }}
          size="small"
          variant="outlined"
          onClick={() => imgRef.current.click()}
        >
          Select Image
        </Button>
      </Box>
      <Box sx={{ display: "none" }}>
        <input
          name="postImg"
          ref={imgRef}
          type="file"
          onChange={(e) =>
            handleImageChange(
              e,
              setIsImageError,
              setImgFile,
              setImgPreviewUrl,
              setPostImgObj
            )
          }
        />
      </Box>
    </Box>
  );
};

const PostImg = styled(Box)`
  border: ${(props) => (props.isError ? `2px solid red` : `2px solid white`)};
  background: ${(props) => `url(${props.previewUrl})`};
  background-size: contain;
  background-repeat: no-repeat;
  overflow: hidden;
  height: 200px;
  width: 200px;
  margin: 0 auto;
`;

export default PictureUpload;
