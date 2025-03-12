import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  Typography,
  CircularProgress,
  Paper,
  Alert
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import api from '../services/api';

function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGenerateEmail = async () => {
    try {
      setLoading(true);
      setError(null);
      const tempEmail = await api.generateEmail();
      navigate(`/inbox/${tempEmail.emailAddress}`);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <EmailIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Temporary Email Service
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Generate a temporary email address that expires after 24 hours.
            Perfect for testing and avoiding spam.
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Button
            variant="contained"
            size="large"
            onClick={handleGenerateEmail}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate Email'}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default Home; 