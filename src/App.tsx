import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Box, Grid } from '@mui/material';
import { useSpring, animated, AnimatedProps } from '@react-spring/web';
import Counter from './components/Counter';
import UserForm from './components/UserForm';
import RichTextEditor from './components/RichTextEditor';
import Dashboard from './components/Dashboard';
import SeaLine from './components/SeaLine';
import './App.css';

type DivProps = React.HTMLAttributes<HTMLDivElement>;
const AnimatedDiv = animated.div as React.FC<AnimatedProps<DivProps>>;

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <nav className="nav-container">
          <ul className="nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>

        {/* Main content area */}
        <Box sx={{ width: '100%', padding: '8px' }}>
          <Container maxWidth="md" sx={{ padding: '8px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Container>
        </Box>

        {/* Lines container placed 100px below user forms */}
        <Box className="lines-container" sx={{ marginTop: '100px', paddingBottom: '8px' }}>
          <SeaLine />
          <Box sx={{ height: '1px' }} />
          <SeaLine />
          <Box sx={{ height: '1px' }} />
          <SeaLine />
        </Box>
      </div>
    </Router>
  );
};

const Home: React.FC = () => {
  return (
    <Grid container spacing={1} className="app-container" alignItems="stretch">
      {/* Top row: Counter and RichTextEditor */}
      <Grid item xs={12} md={6}>
        <Box className="section" sx={{ minHeight: '250px', padding: '8px', margin: '4px' }}>
          <Counter />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box className="section" sx={{ minHeight: '250px', padding: '8px', margin: '4px' }}>
          <RichTextEditor placeholder="Type here..." />
        </Box>
      </Grid>
      {/* Bottom row: Two UserForms */}
      {/* Section1: Using a normal Box so that the user form color remains as before */}
      <Grid item xs={12} md={6}>
        <Box className="section" sx={{ minHeight: '250px', padding: '8px', margin: '4px' }}>
          <UserForm fields={['User Data JSON Object', 'Name']} section="section1" includeUserId={true} />
        </Box>
      </Grid>
      {/* Section2: Normal Box */}
      <Grid item xs={12} md={6}>
        <Box className="section" sx={{ minHeight: '250px', padding: '8px', margin: '4px' }}>
          <UserForm fields={['Address', 'Email', 'Phone']} section="section2" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default App;
