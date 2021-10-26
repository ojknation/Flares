import { AppBar, Typography, Box, Container, IconButton } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';

const NavBar = ({ toggleMenu }) => {
  return (
    <Box>
      <AppBar position="fixed" sx={{ padding: 2 }}>
        <Container maxWidth="lg">
          <Box display="flex" alignItems="center">
            <IconButton sx={{backgroundColor:'#e2f1fe'}} size="large" onClick={toggleMenu}>
              <FilterListIcon color="warning" />
            </IconButton>
            <Typography ml={1} fontWeight="bold" variant="h4">
              Flares
            </Typography>
          </Box>
        </Container>
      </AppBar>
    </Box>
  );
};

export default NavBar;
