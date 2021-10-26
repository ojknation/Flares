import { LinkPreview } from "@dhaiwat10/react-link-preview";
import { LocalFireDepartment } from "@mui/icons-material";
import { Avatar, CardActions, CardContent, Typography, Box, IconButton, CardMedia } from "@mui/material";
import { orange } from '@mui/material/colors';
import { useState } from "react";



export const borderColor = orange[100]

const renderCardImage = (src) => (
  <CardMedia component="img" sx={{maxWidth: '100%', maxHeight: '100%'}} src={src}/>
)

const renderRegularText = (content) => (
    <Box borderRadius={2} sx={{borderColor: `${borderColor}`}} border="1px solid" padding={2}>
    <Typography fontSize="20px">
      {content}
    </Typography>
  </Box> 
)

const renderLink = (link) => (
  <Box borderRadius={2} sx={{borderColor: `${borderColor}`}} border="1px solid" padding={2}>
    <LinkPreview url={link} width="100%"/>
  </Box>
)

const FeedCard = ({username, content, title, type, imgUrl, id, upvotes}) => {
  const [upvoteCount, setUpvoteCount] = useState(upvotes)
  const [hasColor, setHasColor] = useState(false)

  const handleUpvote = async (id) => {
    setHasColor(true)
    try {
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({id})
      };
      const res = await fetch(`${process.env.REACT_APP_BASE_API_URL}/upvote`, options);
      const data = await res.json()
      setUpvoteCount(data.newCount)
      setHasColor(false)
    } catch (error) {
      console.log(error);
      setHasColor(false)
    }
  }

    return (
        <Box padding={1} borderRadius={3}  sx={{ maxWidth: 600, marginBottom:2, background:'#fff'}}>
        <CardContent>
          <Box mb={2} display="flex" alignItems="baseline">
            <Avatar sx={{ backgroundColor: "primary.main"}}>{username !== "" ? username.split('')[0] : 'A'}</Avatar>
            <Typography fontSize="16px" fontWeight="bold" ml={1} variant="subtitle2" gutterBottom>{username !== "" ? username : 'Anonymous'}</Typography>
          </Box>
          {!!title && 
          <Box>
            <Typography mb={2}  variant="body1">
              {title}
            </Typography>
          </Box>
          }
          {type === 1 && renderRegularText(content)}
          {type === 2 && renderCardImage(imgUrl)}
          {type === 3 && renderLink(content)}
        </CardContent>
        <CardActions>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => handleUpvote(id)}>
             <LocalFireDepartment  color={`${hasColor && 'warning'}`}/>
            </IconButton>
            <Typography marginX={1} variant="body1">{upvoteCount}</Typography>
          </Box>
        </CardActions>
     </Box>
    )
}

export default FeedCard
