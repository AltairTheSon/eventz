import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { useTimeline } from '../context/TimelineContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Timeline2Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
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
  margin: 60px 0;
`;

const TimelineLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
  transform: translateY(-50%);
  z-index: 1;
`;

const TimelineSlider = styled(Slider)`
  .slick-slide {
    padding: 0 15px;
    outline: none;
  }
  
  .slick-track {
    display: flex;
    align-items: center;
  }
  
  .slick-list {
    overflow: visible;
  }
  
  .slick-dots {
    bottom: -40px;
    
    li {
      margin: 0 5px;
      
      button:before {
        color: rgba(255, 255, 255, 0.5);
        font-size: 12px;
      }
      
      &.slick-active button:before {
        color: #ffd700;
      }
    }
  }
  
  .slick-prev,
  .slick-next {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    z-index: 10;
    
    &:before {
      color: #1e3c72;
      font-size: 24px;
    }
    
    &:hover {
      background: white;
    }
    
    &:focus {
      background: rgba(255, 255, 255, 0.9);
    }
  }
  
  .slick-prev {
    left: -60px;
  }
  
  .slick-next {
    right: -60px;
  }
`;

const TimelineCard = styled(motion.div)`
  position: relative;
  width: 350px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 20px 0;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: #ffd700;
  }
  
  ${props => props.isSelected && `
    border-color: #ffd700;
    box-shadow: 0 20px 40px rgba(255, 215, 0, 0.2);
    transform: translateY(-5px);
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -20px;
    width: 20px;
    height: 20px;
    background: #ffd700;
    border-radius: 50%;
    transform: translateY(-50%);
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    z-index: 2;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: -10px;
    width: 10px;
    height: 10px;
    background: white;
    border-radius: 50%;
    transform: translateY(-50%);
    z-index: 3;
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 15px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(30, 60, 114, 0.3), rgba(42, 82, 152, 0.3));
    z-index: 1;
  }
`;

const CardImageElement = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${TimelineCard}:hover & {
    transform: scale(1.05);
  }
`;

const CardDate = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #1e3c72;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
  background: #ffd700;
  padding: 4px 8px;
  border-radius: 4px;
  display: inline-block;
`;

const CardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 12px;
  line-height: 1.3;
`;

const CardBody = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 15px;
`;

const CardTag = styled.span`
  background: linear-gradient(45deg, #1e3c72, #2a5298);
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardMetadata = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 12px;
  border-top: 1px solid #eee;
`;

const MetadataItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 60px;
`;

const MetadataLabel = styled.span`
  font-size: 10px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 3px;
`;

const MetadataValue = styled.span`
  font-size: 12px;
  color: #1e3c72;
  font-weight: 600;
`;

const Timeline2 = () => {
  const { events, selectedEvent, selectEvent } = useTimeline();
  const sliderRef = useRef(null);

  // Initialize with first event selected
  useEffect(() => {
    if (events.length > 0 && !selectedEvent) {
      selectEvent(events[0]);
    }
  }, [events, selectedEvent, selectEvent]);

  const handleCardClick = (event, e) => {
    // Prevent card click when dragging
    if (e && e.type === 'mousedown') return;
    selectEvent(event);
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    swipeToSlide: true,
    draggable: true,
    touchMove: true,
    swipe: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Timeline2Container>
      <Timeline2Content>
        <Header>
          <HeaderTitle>Timeline Journey</HeaderTitle>
          <HeaderSubtitle>Explore our story through time</HeaderSubtitle>
        </Header>

        <TimelineWrapper>
          <TimelineLine />
          
          <TimelineSlider
            ref={sliderRef}
            {...sliderSettings}
          >
            {events.map((event, index) => (
                              <TimelineCard
                  key={event.id}
                  isSelected={selectedEvent?.id === event.id}
                  onClick={(e) => handleCardClick(event, e)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    duration: 0.4,
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
          </TimelineSlider>
        </TimelineWrapper>
      </Timeline2Content>
    </Timeline2Container>
  );
};

export default Timeline2;