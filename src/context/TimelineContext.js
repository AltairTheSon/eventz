import React, { createContext, useContext, useState, useEffect } from 'react';

const TimelineContext = createContext();

export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (!context) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
};

export const TimelineProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Load events from localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('timelineEvents');
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        setEvents(parsedEvents);
        if (parsedEvents.length > 0) {
          setSelectedEvent(parsedEvents[0]);
        }
      } catch (error) {
        console.error('Error loading events from localStorage:', error);
        // Load default events if localStorage is corrupted
        loadDefaultEvents();
      }
    } else {
      loadDefaultEvents();
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem('timelineEvents', JSON.stringify(events));
  }, [events]);

  const loadDefaultEvents = () => {
    const defaultEvents = [
      {
        id: '1',
        title: 'NBA MVP',
        date: 'MAY 09',
        bodyText: 'The NBA MVP award ceremony celebrates the league\'s most valuable player of the season.',
        tags: ['Basketball', 'Awards', 'NBA'],
        imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
        metadata: {
          category: 'Sports',
          location: 'New York',
          attendees: '500+'
        }
      },
      {
        id: '2',
        title: 'NO-HITTER',
        date: 'MAY 10',
        bodyText: 'A spectacular no-hitter game that will be remembered for generations.',
        tags: ['Baseball', 'No-Hitter', 'MLB'],
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        metadata: {
          category: 'Sports',
          pitcher: 'Unknown',
          team: 'Home Team'
        }
      },
      {
        id: '3',
        title: 'NBA PLAYOFFS',
        date: 'MAY 15',
        bodyText: 'The intensity of the NBA playoffs reaches its peak as teams battle for championship glory.',
        tags: ['Basketball', 'Playoffs', 'NBA', 'Championship'],
        imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
        metadata: {
          category: 'Sports',
          series: 'Conference Finals',
          venue: 'American Airlines Center'
        }
      },
      {
        id: '4',
        title: 'RUTSCHMAN\'S DEBUT',
        date: 'MAY 21',
        bodyText: 'The highly anticipated debut of the promising young player Rutschman.',
        tags: ['Baseball', 'Debut', 'Rookie', 'MLB'],
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        metadata: {
          category: 'Sports',
          team: 'Baltimore Orioles',
          position: 'Catcher'
        }
      },
      {
        id: '5',
        title: 'FRENCH OPEN',
        date: 'MAY 31',
        bodyText: 'The prestigious French Open tennis tournament begins with world-class players competing.',
        tags: ['Tennis', 'Grand Slam', 'French Open', 'Roland Garros'],
        imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&h=600&fit=crop',
        metadata: {
          category: 'Sports',
          surface: 'Clay',
          location: 'Paris, France'
        }
      }
    ];
    setEvents(defaultEvents);
    setSelectedEvent(defaultEvents[0]);
  };

  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: Date.now().toString(),
      metadata: event.metadata || {}
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id, updatedEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
    if (selectedEvent && selectedEvent.id === id) {
      setSelectedEvent(prev => ({ ...prev, ...updatedEvent }));
    }
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    if (selectedEvent && selectedEvent.id === id) {
      const remainingEvents = events.filter(event => event.id !== id);
      setSelectedEvent(remainingEvents.length > 0 ? remainingEvents[0] : null);
    }
  };

  const selectEvent = (event) => {
    setSelectedEvent(event);
  };

  const addMetadataField = (eventId, fieldName, fieldValue) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            metadata: { 
              ...event.metadata, 
              [fieldName]: fieldValue 
            } 
          }
        : event
    ));
  };

  const removeMetadataField = (eventId, fieldName) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            metadata: { 
              ...event.metadata 
            } 
          }
        : event
    ));
    const updatedEvents = events.map(event => 
      event.id === eventId 
        ? { 
            ...event, 
            metadata: { 
              ...event.metadata 
            } 
          }
        : event
    );
    const { [fieldName]: removed, ...rest } = updatedEvents.find(e => e.id === eventId).metadata;
    updateEvent(eventId, { metadata: rest });
  };

  const value = {
    events,
    selectedEvent,
    addEvent,
    updateEvent,
    deleteEvent,
    selectEvent,
    addMetadataField,
    removeMetadataField,
    loadDefaultEvents
  };

  return (
    <TimelineContext.Provider value={value}>
      {children}
    </TimelineContext.Provider>
  );
};