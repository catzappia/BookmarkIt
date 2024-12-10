import React, { useState, useEffect } from 'react';
import '../styles/poll.css';

interface PollOption {
    id: number;
    label: string;
    votes: number;
}

interface PollProps {
    title: string; // title of poll
    options: string[]; // poll options
    duration?: number; // poll duration in seconds
}

const Poll: React.FC<PollProps> = ({ title, options: optionLabels, duration = 15 }) => {
    const [options, setOptions] = useState<PollOption[]>(
        optionLabels.map((label, index) => ({ id: index + 1, label, votes: 0 }))
      );
      const [totalVotes, setTotalVotes] = useState(0);
      const [pollActive, setPollActive] = useState(true);
    
      useEffect(() => {
        const timer = setTimeout(() => {
          setPollActive(false);
        }, duration * 1000);
    
        return () => clearTimeout(timer);
      }, [duration]);
    
      const handleVote = (id: number) => {
        if (!pollActive) return;
    
        setOptions((prevOptions) =>
          prevOptions.map((option) =>
            option.id === id
              ? { ...option, votes: option.votes + 1 }
              : option
          )
        );
        setTotalVotes((prevTotal) => prevTotal + 1);
      };
    
      const calculatePercentage = (votes: number): string => {
        return totalVotes > 0 ? `${((votes / totalVotes) * 100).toFixed(1)}%` : '0%';
      };
    
      return (
        <div className="poll-container">
          <h2>{pollActive ? title : `${title} - Final Results`}</h2>
          <div className="poll-options">
            {options.map((option) => (
              <div
                key={option.id}
                className={`poll-option ${pollActive ? 'active' : ''}`}
                onClick={() => handleVote(option.id)}
              >
                <span>{option.label}</span>
                <div className="poll-results">
                  <span>{option.votes} votes</span>
                  <span>{calculatePercentage(option.votes)}</span>
                </div>
              </div>
            ))}
          </div>
          {!pollActive && <p className="poll-end-message">Poll has ended. Thank you for voting!</p>}
        </div>
      );
    };

export default Poll;