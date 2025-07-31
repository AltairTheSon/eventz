import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimeline } from '../context/TimelineContext';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const Timeline2Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  overflow-x: hidden;
`;

const Timeline2Content = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 100px 0 50px 0;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  color: white;
`;

const HeaderTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 10px;
  background: linear-gradient(45deg, #ffffff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeaderSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
`;

const TimelineWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const TimelineScroll = styled.div`
  display: flex;
  gap: 30px;
  padding: 20px 0;
  will-change: transform;
  transform: translateX(${props => props.scrollOffset}px) translateZ(0);
`;

const TimelineCard = styled(motion.div)`
  min-width: 400px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  will-change: transform;
  transform: translateZ(0);
  
  &:hover {
    transform: translateY(-10px) translateZ(0);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
  }
  
  ${props => props.isSelected && `
    transform: scale(1.05) translateZ(0);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
    border: 2px solid #667eea;
  `}
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3));
    z-index: 1;
  }
`;

const CardImageElement = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
  transform: translateZ(0);
  
  ${TimelineCard}:hover & {
    transform: scale(1.1) translateZ(0);
  }
`;

const CardDate = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
`;

const CardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.3;
`;

const CardBody = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const CardTag = styled.span`
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardMetadata = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MetadataLabel = styled.span`
  font-size: 11px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 4px;
`;

const MetadataValue = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 600;
`;

const NavigationButtons = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  pointer-events: none;
  z-index: 10;
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  pointer-events: all;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: white;
    transform: scale(1.1);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ScrollIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 30px;
`;

const ScrollDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.3)'};
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.7);
  }
`;

const Timeline2 = () => {
  const { events, selectedEvent, selectEvent } = useTimeline();
  const [scrollOffset, setScrollOffset] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const cardWidth = 430; // 400px card + 30px gap

  // Initialize with first event selected
  useEffect(() => {
    if (events.length > 0 && !selectedEvent) {
      selectEvent(events[0]);
    }
  }, [events, selectedEvent, selectEvent]);

  const handleCardClick = (event) => {
    selectEvent(event);
  };

  const scrollToIndex = (index) => {
    setCurrentIndex(index);
    setScrollOffset(-index * cardWidth);
  };

  const scrollNext = () => {
    if (currentIndex < events.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const scrollPrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };



  return (
    <Timeline2Container>
      <Timeline2Content>
        <Header>
          <HeaderTitle>Timeline Journey</HeaderTitle>
          <HeaderSubtitle>Explore our story through time</HeaderSubtitle>
        </Header>

        <TimelineWrapper>
          <NavigationButtons>
            <NavButton onClick={scrollPrev} disabled={currentIndex === 0}>
              <IoChevronBack size={24} color="#667eea" />
            </NavButton>
            <NavButton onClick={scrollNext} disabled={currentIndex === events.length - 1}>
              <IoChevronForward size={24} color="#667eea" />
            </NavButton>
          </NavigationButtons>

          <TimelineScroll ref={scrollRef} scrollOffset={scrollOffset}>
            <AnimatePresence>
              {events.map((event, index) => (
                <TimelineCard
                  key={event.id}
                  isSelected={selectedEvent?.id === event.id}
                  onClick={() => handleCardClick(event)}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ 
                    delay: index * 0.05, 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                >
                  <CardImage>
                    <CardImageElement src={event.imageUrl} alt={event.title} />
                  </CardImage>
                  
                  <CardDate>{event.date}</CardDate>
                  <CardTitle>{event.title}</CardTitle>
                  <CardBody>{event.bodyText}</CardBody>
                  
                  <CardTags>
                    {event.tags.map((tag, tagIndex) => (
                      <CardTag key={tagIndex}>{tag}</CardTag>
                    ))}
                  </CardTags>
                  
                  {Object.keys(event.metadata || {}).length > 0 && (
                    <CardMetadata>
                      {Object.entries(event.metadata).map(([key, value]) => (
                        <MetadataItem key={key}>
                          <MetadataLabel>{key}</MetadataLabel>
                          <MetadataValue>{value}</MetadataValue>
                        </MetadataItem>
                      ))}
                    </CardMetadata>
                  )}
                </TimelineCard>
              ))}
            </AnimatePresence>
          </TimelineScroll>
        </TimelineWrapper>

        <ScrollIndicator>
          {events.map((_, index) => (
            <ScrollDot
              key={index}
              active={index === currentIndex}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </ScrollIndicator>
      </Timeline2Content>
    </Timeline2Container>
  );
};

export default Timeline2;