import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useTimeline } from '../context/TimelineContext';
import { IoAdd, IoTrash, IoPencil } from 'react-icons/io5';

const CMSContainer = styled.div`
  min-height: 100vh;
  background-color: #000000;
  padding: 40px;
  color: #ffffff;
`;

const CMSHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const CMSTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 48px;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CMSSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  color: #cccccc;
`;

const CMSContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

const EventsList = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const EventsListHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 30px;
`;

const EventsListTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
`;

const AddButton = styled.button`
  background: #ff4444;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff6666;
    transform: translateY(-2px);
  }
`;

const EventCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
  }
  
  ${props => props.isSelected && `
    border-color: #ff4444;
    background: rgba(255, 68, 68, 0.1);
  `}
`;

const EventCardTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
`;

const EventCardDate = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #ffd700;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const EventCardTags = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const EventCardTag = styled.span`
  background: rgba(255, 68, 68, 0.2);
  color: #ff4444;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
`;

const EventCardActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  background: ${props => props.variant === 'delete' ? 'rgba(255, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.variant === 'delete' ? '#ff4444' : '#ffffff'};
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.variant === 'delete' ? 'rgba(255, 68, 68, 0.3)' : 'rgba(255, 255, 255, 0.2)'};
    transform: scale(1.05);
  }
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 30px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: fit-content;
`;

const FormTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ff4444;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ff4444;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const TagInput = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
`;

const TagInputField = styled.input`
  flex: 1;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #ffffff;
  font-size: 12px;
  
  &:focus {
    outline: none;
    border-color: #ff4444;
  }
`;

const AddTagButton = styled.button`
  background: #ff4444;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  
  &:hover {
    background: #ff6666;
  }
`;

const MetadataSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const MetadataTitle = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 15px;
`;

const MetadataField = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

const MetadataInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #ffffff;
  font-size: 12px;
  
  &:focus {
    outline: none;
    border-color: #ff4444;
  }
`;

const RemoveMetadataButton = styled.button`
  background: rgba(255, 68, 68, 0.2);
  color: #ff4444;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background: rgba(255, 68, 68, 0.3);
  }
`;

const AddMetadataButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  margin-top: 10px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 30px;
`;

const SubmitButton = styled.button`
  background: #ff4444;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #ff6666;
    transform: translateY(-2px);
  }
`;

const CancelButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  overflow: hidden;
  position: relative;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
`;

const CMS = () => {
  const { 
    events, 
    addEvent, 
    updateEvent, 
    deleteEvent
  } = useTimeline();
  
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    bodyText: '',
    imageUrl: '',
    tags: [],
    metadata: {}
  });
  const [newTag, setNewTag] = useState('');
  const [newMetadataKey, setNewMetadataKey] = useState('');
  const [newMetadataValue, setNewMetadataValue] = useState('');

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      bodyText: '',
      imageUrl: '',
      tags: [],
      metadata: {}
    });
    setNewTag('');
    setNewMetadataKey('');
    setNewMetadataValue('');
    setEditingEvent(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingEvent) {
      updateEvent(editingEvent.id, formData);
    } else {
      addEvent(formData);
    }
    
    resetForm();
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      bodyText: event.bodyText,
      imageUrl: event.imageUrl,
      tags: [...event.tags],
      metadata: { ...event.metadata }
    });
  };

  const handleDelete = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId);
      if (editingEvent && editingEvent.id === eventId) {
        resetForm();
      }
    }
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addMetadata = () => {
    if (newMetadataKey.trim() && newMetadataValue.trim()) {
      setFormData(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          [newMetadataKey.trim()]: newMetadataValue.trim()
        }
      }));
      setNewMetadataKey('');
      setNewMetadataValue('');
    }
  };

  const removeMetadata = (key) => {
    setFormData(prev => {
      const newMetadata = { ...prev.metadata };
      delete newMetadata[key];
      return {
        ...prev,
        metadata: newMetadata
      };
    });
  };

  return (
    <CMSContainer>
      <CMSHeader>
        <CMSTitle>Timeline CMS</CMSTitle>
        <CMSSubtitle>Manage your epic timeline events</CMSSubtitle>
      </CMSHeader>
      
      <CMSContent>
        <EventsList>
          <EventsListHeader>
            <EventsListTitle>Events ({events.length})</EventsListTitle>
            <AddButton onClick={resetForm}>
              <IoAdd />
              Add Event
            </AddButton>
          </EventsListHeader>
          
          <AnimatePresence>
            {events.map((event, index) => (
              <EventCard
                key={event.id}
                isSelected={editingEvent?.id === event.id}
                onClick={() => handleEdit(event)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <EventCardTitle>{event.title}</EventCardTitle>
                <EventCardDate>{event.date}</EventCardDate>
                <EventCardTags>
                  {event.tags.slice(0, 3).map((tag, index) => (
                    <EventCardTag key={index}>{tag}</EventCardTag>
                  ))}
                  {event.tags.length > 3 && (
                    <EventCardTag>+{event.tags.length - 3}</EventCardTag>
                  )}
                </EventCardTags>
                <EventCardActions>
                  <ActionButton onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(event);
                  }}>
                    <IoPencil />
                    Edit
                  </ActionButton>
                  <ActionButton 
                    variant="delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(event.id);
                    }}
                  >
                    <IoTrash />
                    Delete
                  </ActionButton>
                </EventCardActions>
              </EventCard>
            ))}
          </AnimatePresence>
        </EventsList>
        
        <FormContainer>
          <FormTitle>
            {editingEvent ? 'Edit Event' : 'Add New Event'}
          </FormTitle>
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel>Title</FormLabel>
              <FormInput
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter event title"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Date</FormLabel>
              <FormInput
                type="text"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                placeholder="e.g., MAY 15"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Body Text</FormLabel>
              <FormTextarea
                value={formData.bodyText}
                onChange={(e) => setFormData(prev => ({ ...prev, bodyText: e.target.value }))}
                placeholder="Enter event description"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Image URL</FormLabel>
              <FormInput
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="Enter image URL"
                required
              />
              {formData.imageUrl && (
                <ImagePreview>
                  <PreviewImage src={formData.imageUrl} alt="Preview" />
                </ImagePreview>
              )}
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Tags</FormLabel>
              <TagInput>
                <TagInputField
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <AddTagButton type="button" onClick={addTag}>
                  Add
                </AddTagButton>
              </TagInput>
              <TagsContainer>
                {formData.tags.map((tag, index) => (
                  <EventCardTag key={index}>
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        marginLeft: '5px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      ×
                    </button>
                  </EventCardTag>
                ))}
              </TagsContainer>
            </FormGroup>
            
            <MetadataSection>
              <MetadataTitle>Custom Metadata</MetadataTitle>
              {Object.entries(formData.metadata).map(([key, value]) => (
                <MetadataField key={key}>
                  <MetadataInput
                    type="text"
                    value={key}
                    disabled
                    placeholder="Field name"
                  />
                  <MetadataInput
                    type="text"
                    value={value}
                    disabled
                    placeholder="Field value"
                  />
                  <RemoveMetadataButton
                    type="button"
                    onClick={() => removeMetadata(key)}
                  >
                    Remove
                  </RemoveMetadataButton>
                </MetadataField>
              ))}
              <MetadataField>
                <MetadataInput
                  type="text"
                  value={newMetadataKey}
                  onChange={(e) => setNewMetadataKey(e.target.value)}
                  placeholder="Field name"
                />
                <MetadataInput
                  type="text"
                  value={newMetadataValue}
                  onChange={(e) => setNewMetadataValue(e.target.value)}
                  placeholder="Field value"
                />
                <AddMetadataButton
                  type="button"
                  onClick={addMetadata}
                >
                  Add
                </AddMetadataButton>
              </MetadataField>
            </MetadataSection>
            
            <FormActions>
              <SubmitButton type="submit">
                {editingEvent ? 'Update Event' : 'Add Event'}
              </SubmitButton>
              <CancelButton type="button" onClick={resetForm}>
                Cancel
              </CancelButton>
            </FormActions>
          </form>
        </FormContainer>
      </CMSContent>
    </CMSContainer>
  );
};

export default CMS;