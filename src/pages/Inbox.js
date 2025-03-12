import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
  Button
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import api from '../services/api';

function Inbox() {
  const { emailAddress } = useParams();
  const navigate = useNavigate();
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmails = async () => {
    try {
      setError(null);
      const data = await api.getEmails(emailAddress);
      setEmails(data);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('expired')) {
        setTimeout(() => navigate('/'), 3000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
    const interval = setInterval(fetchEmails, 10000);
    return () => clearInterval(interval);
  }, [emailAddress]);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">
              Inbox: {emailAddress}
            </Typography>
            <Button
              startIcon={<RefreshIcon />}
              onClick={fetchEmails}
              disabled={loading}
            >
              Refresh
            </Button>
          </Box>

          {error ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          ) : loading ? (
            <Box display="flex" justifyContent="center" p={3}>
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {emails.length === 0 ? (
                <ListItem>
                  <ListItemText 
                    primary="No emails received yet"
                    secondary="New emails will appear here automatically"
                  />
                </ListItem>
              ) : (
                emails.map((email, index) => (
                  <React.Fragment key={email.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={email.subject}
                        secondary={
                          <Box>
                            <Typography component="span" variant="body2" color="text.primary">
                              From: {email.from}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="text.secondary">
                              {new Date(email.receivedAt).toLocaleString()}
                            </Typography>
                            <Typography
                              component="p"
                              variant="body2"
                              sx={{ mt: 1 }}
                              style={{ whiteSpace: 'pre-wrap' }}
                            >
                              {email.content}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < emails.length - 1 && <Divider />}
                  </React.Fragment>
                ))
              )}
            </List>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default Inbox; 