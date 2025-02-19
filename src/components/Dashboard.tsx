import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import Counter from './Counter';
import UserProfileChart from './UserProfileChart';

const Dashboard: React.FC = () => {
  const [section1Data, setSection1Data] = useState<{ [key: string]: string }>({});
  const [section2Data, setSection2Data] = useState<{ [key: string]: string }>({});

  const loadData = () => {
    const data1 = localStorage.getItem('formDataSection1');
    const data2 = localStorage.getItem('formDataSection2');
    let parsed1 = {};
    let parsed2 = {};

    if (data1) {
      try {
        parsed1 = JSON.parse(data1);
      } catch (e) {
        console.error('Error parsing formDataSection1', e);
      }
    }
    if (data2) {
      try {
        parsed2 = JSON.parse(data2);
      } catch (e) {
        console.error('Error parsing formDataSection2', e);
      }
    }
    setSection1Data(parsed1);
    setSection2Data(parsed2);
    console.log('Dashboard loadData - Section1:', parsed1);
    console.log('Dashboard loadData - Section2:', parsed2);
  };

  useEffect(() => {
    loadData();
    const handleLocalStorageUpdated = () => {
      console.log('Dashboard received localStorageUpdated event.');
      loadData();
    };
    window.addEventListener('localStorageUpdated', handleLocalStorageUpdated);
    return () => {
      window.removeEventListener('localStorageUpdated', handleLocalStorageUpdated);
    };
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box className="section">
            <Typography variant="h6">Counter</Typography>
            <Counter />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className="section">
            <Typography variant="h6">User Profile</Typography>
            <Box>
              <Typography variant="body1">
                <strong>User ID:</strong> {section1Data.id || 'not yet saved'}
              </Typography>
              <Typography variant="body1">
                <strong>Name:</strong> {section1Data.name || 'not yet saved'}
              </Typography>
              <Typography variant="body1">
                <strong>User Data:</strong>{' '}
                {section1Data.user_data_json_object || 'not yet saved'}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {section2Data.address || 'not yet saved'}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {section2Data.email || 'not yet saved'}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {section2Data.phone || 'not yet saved'}
              </Typography>
            </Box>
          </Box>
          <Box className="section">
            <Typography variant="h6">User Profile Trends</Typography>
            <UserProfileChart formData={{ ...section1Data, ...section2Data }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
