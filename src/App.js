import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Timeline from './components/Timeline';
import Timeline2 from './components/Timeline2';
import CMS from './components/CMS';
import { TimelineProvider } from './context/TimelineContext';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #000000;
`;

const Navigation = styled.nav`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  gap: 10px;
`;

const NavButton = styled.button`
  background: ${props => props.active ? '#ff4444' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${props => props.active ? '#ff4444' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateY(-2px);
  }
`;

const AppContent = () => {
  const location = useLocation();
  const isCMS = location.pathname === '/cms';
  const isTimeline2 = location.pathname === '/timeline2';

  return (
    <AppContainer>
      <Navigation>
        <NavButton 
          active={!isCMS && !isTimeline2}
          onClick={() => window.location.href = '/'}
        >
          Timeline
        </NavButton>
        <NavButton 
          active={isTimeline2}
          onClick={() => window.location.href = '/timeline2'}
        >
          Timeline 2
        </NavButton>
        <NavButton 
          active={isCMS}
          onClick={() => window.location.href = '/cms'}
        >
          CMS
        </NavButton>
      </Navigation>
      
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/timeline2" element={<Timeline2 />} />
        <Route path="/cms" element={<CMS />} />
      </Routes>
    </AppContainer>
  );
};

function App() {
  return (
    <TimelineProvider>
      <Router>
        <AppContent />
      </Router>
    </TimelineProvider>
  );
}

export default App;