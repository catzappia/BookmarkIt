import React from 'react';
import { Card, Button } from 'react-bootstrap';


interface ClubCardProps {
  title: string;
  description: string;
  profilePicture: string;
  onView: () => void;
}

const ClubCard: React.FC<ClubCardProps> = ({ title, description, profilePicture, onView }) => {
  return (
    <Card style={{ width: '18rem', margin: '1rem', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'}}>
      <Card.Img
        src={profilePicture? profilePicture : 'https://preview.redd.it/slo4soywz9l91.jpg?width=1080&crop=smart&auto=webp&s=beb1b8421b6fb4f13ae5d3a07965fabe5c7ba4b7'}
        alt="Club Cover"
        style={{ height: '150px', width: 'fit-content', objectFit: 'cover', margin: '1rem' }}
      />
      <Card.Body>
        <Card.Title style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{title}</Card.Title>
        <Card.Text style={{ fontSize: '1rem', color: '#666' }}>{description}</Card.Text>
        <Button variant="primary" onClick={onView} style={{ backgroundColor: '#6a8eb3', border: 'none' }}>
          View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ClubCard;