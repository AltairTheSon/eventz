import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimeline } from '../context/TimelineContext';


const TimelineContainer = styled.div`
  min-height: 100vh;
  background-color: #000000;
  position: relative;
  overflow: hidden;
`;

const TimelineFrame = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  right: 50px;
  bottom: 50px;
  border: 2px solid #333;
  border-radius: 10px;
  background-color: #111;
`;

const TimelineContent = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TimelineLeft = styled.div`
  position: absolute;
  left: 60px;
  top: 0;
  bottom: 0;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;
`;

const TimelineRight = styled.div`
  position: absolute;
  right: 60px;
  top: 0;
  bottom: 0;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  z-index: 10;
`;

const TimelineLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, #ff4444, transparent);
  transform: translateX(-50%);
`;

const TimelineTick = styled.div`
  position: absolute;
  left: 50%;
  width: 8px;
  height: 8px;
  background: #ff4444;
  border-radius: 50%;
  transform: translateX(-50%);
  top: ${props => props.position}%;
`;

const EventTitle = styled(motion.div)`
  font-family: 'Inter', sans-serif;
  font-weight: ${props => props.isSelected ? '700' : '400'};
  font-size: ${props => props.isSelected ? '16px' : '14px'};
  color: ${props => props.isSelected ? '#ffd700' : '#ffffff'};
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 10px 0;
  transition: all 0.3s ease;
  text-align: left;
  position: relative;
  
  &:hover {
    color: #ffd700;
    transform: translateX(5px);
  }
`;

const EventDate = styled(motion.div)`
  font-family: 'Inter', sans-serif;
  font-weight: ${props => props.isSelected ? '700' : '400'};
  font-size: ${props => props.isSelected ? '16px' : '14px'};
  color: ${props => props.isSelected ? '#ffd700' : '#ffffff'};
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  padding: 10px 0;
  transition: all 0.3s ease;
  text-align: right;
  position: relative;
  
  &:hover {
    color: #ffd700;
    transform: translateX(-5px);
  }
`;

const SelectionLine = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: #ff4444;
  transform: translateY(-50%);
  z-index: 5;
`;

const CentralContent = styled.div`
  position: relative;
  width: 60%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 15;
`;

const MainImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
`;

const ImageStack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StackedImage = styled(motion.img)`
  position: absolute;
  width: 80%;
  height: 60%;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  opacity: 0.6;
`;

const EventDetails = styled(motion.div)`
  position: absolute;
  bottom: -80px;
  left: 0;
  right: 0;
  text-align: center;
  color: #ffffff;
`;

const EventBodyText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #cccccc;
  margin-bottom: 15px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const EventTags = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 15px;
`;

const Tag = styled.span`
  background: rgba(255, 68, 68, 0.2);
  color: #ff4444;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Metadata = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 14px;
  color: #999;
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MetadataLabel = styled.span`
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
`;

const MetadataValue = styled.span`
  color: #ffffff;
`;



const Timeline = () => {
  const { events, selectedEvent, selectEvent } = useTimeline();


  const handleEventClick = (event) => {
    selectEvent(event);
  };

  const getEventPosition = (eventIndex) => {
    return (eventIndex / (events.length - 1)) * 100;
  };

  const getSelectedEventPosition = () => {
    if (!selectedEvent) return 50;
    const index = events.findIndex(event => event.id === selectedEvent.id);
    return getEventPosition(index);
  };

  return (
    <TimelineContainer>
      <TimelineFrame>
        <TimelineContent>
          <TimelineLine />
          
          {/* Timeline ticks */}
          {events.map((event, index) => (
            <TimelineTick 
              key={event.id} 
              position={getEventPosition(index)}
            />
          ))}
          
          {/* Selection line */}
          <SelectionLine 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5 }}
            style={{ top: `${getSelectedEventPosition()}%` }}
          />
          
          {/* Left side - Event titles */}
          <TimelineLeft>
            {events.map((event, index) => (
              <EventTitle
                key={event.id}
                isSelected={selectedEvent?.id === event.id}
                style={{ top: `${getEventPosition(index)}%`, transform: 'translateY(-50%)' }}
                onClick={() => handleEventClick(event)}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                {event.title}
              </EventTitle>
            ))}
          </TimelineLeft>
          
          {/* Right side - Event dates */}
          <TimelineRight>
            {events.map((event, index) => (
              <EventDate
                key={event.id}
                isSelected={selectedEvent?.id === event.id}
                style={{ top: `${getEventPosition(index)}%`, transform: 'translateY(-50%)' }}
                onClick={() => handleEventClick(event)}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: -10 }}
              >
                {event.date}
              </EventDate>
            ))}
          </TimelineRight>
          
          {/* Central content */}
          <CentralContent>
            <ImageStack>
              <AnimatePresence mode="wait">
                {selectedEvent && (
                  <MainImage
                    key={selectedEvent.id}
                    src={selectedEvent.imageUrl}
                    alt={selectedEvent.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>
              
              {/* Stacked images for context */}
              {events.map((event, index) => {
                if (event.id === selectedEvent?.id) return null;
                const distance = Math.abs(index - events.findIndex(e => e.id === selectedEvent?.id));
                if (distance <= 2) {
                  return (
                    <StackedImage
                      key={event.id}
                      src={event.imageUrl}
                      alt={event.title}
                      style={{
                        top: distance === 1 ? '-20%' : '120%',
                        opacity: 0.3,
                        zIndex: 10 - distance
                      }}
                    />
                  );
                }
                return null;
              })}
            </ImageStack>
            
            {/* Event details */}
            <AnimatePresence mode="wait">
              {selectedEvent && (
                <EventDetails
                  key={selectedEvent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <EventBodyText>{selectedEvent.bodyText}</EventBodyText>
                  
                  <EventTags>
                    {selectedEvent.tags.map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </EventTags>
                  
                  {Object.keys(selectedEvent.metadata || {}).length > 0 && (
                    <Metadata>
                      {Object.entries(selectedEvent.metadata).map(([key, value]) => (
                        <MetadataItem key={key}>
                          <MetadataLabel>{key}</MetadataLabel>
                          <MetadataValue>{value}</MetadataValue>
                        </MetadataItem>
                      ))}
                    </Metadata>
                  )}
                </EventDetails>
              )}
            </AnimatePresence>
          </CentralContent>
        </TimelineContent>
      </TimelineFrame>
    </TimelineContainer>
  );
};

export default Timeline;