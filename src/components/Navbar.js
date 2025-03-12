import React from 'react';
import { AppBar, Toolbar, Typography, Container, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <EmailIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1
            }}
          >
            TempMail
          </Typography>
          <Button
            color="inherit"
            onClick={() => navigate('/')}
          >
            New Email
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar; 