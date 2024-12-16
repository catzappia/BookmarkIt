
import { Link } from 'react-router-dom';
// import BookSearch from "../components/bookSearch";
import '../styles/home.css';

import React, { useState, useEffect } from 'react';
import Poll from '../components/poll'; // component location
import polls from '../../../server/src/data/polls.json'; // location of the poll content

const Home: React.FC = () => {
  const [pollData, setPollData] = useState<{ title: string; options: string[] } | null>(null);

  useEffect(() => {
    // Determine which poll to show based on the day
    const todayIndex = new Date().getDate() % polls.length; // Cycles through the polls based on the day
    setPollData(polls[todayIndex]);
  }, []);

  if (!pollData) {
    return <p>Loading...</p>; // Show a loading state until pollData is ready
  }

  return (
    <div className="main">
      <div>
        <Poll title={pollData.title} options={pollData.options} duration={30} />
      </div>
      <div className="login-button-container">
      <div className="login-button">
        <h3><Link to="/login">Log in</Link> to join the conversation</h3>
      </div>
    </div>
    </div>
  );
};

export default Home;