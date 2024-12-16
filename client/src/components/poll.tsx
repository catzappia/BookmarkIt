import React, { useState, useEffect } from 'react';
import '../styles/poll.css';

interface PollOption {
    id: number;
    label: string;
    votes: number;
    date: string;
}

interface PollProps {
  title: string; // title of poll
  options: string[]; // poll options for each day
  duration?: number; // poll duration in seconds
}

const Poll: React.FC<PollProps> = ({ title, options: optionLabels, duration = 15 }) => {
    const [options, setOptions] = useState<PollOption[]>(
        optionLabels.map((label, index) => ({ id: index + 1, label, votes: 0, date: new Date().toISOString() }))
      );
      const [totalVotes, setTotalVotes] = useState(0);
      const [pollActive, setPollActive] = useState(true);
    useEffect(() => {
      // to vote once in a 24 hr period/once per poll
      const hasVoted = localStorage.getItem('hasVoted');
      if (hasVoted) {
        const lastVotedTime = new Date(hasVoted);
        const now = new Date();
        const timeDifference = now.getTime() - lastVotedTime.getTime();
        const hoursDifference = timeDifference / (1000 * 60 * 60);
        // if the user has voted in the last 24 hours, disable the poll
        if (hoursDifference < 24) {
          setPollActive(false);
        } else {
          localStorage.removeItem('hasVoted');
          setPollActive(true);
        }
      } else {
        // calculate the remaining time until the end of the day
        const remainingTime = calculateRemainingTime();
        setPollActive(remainingTime > 0);
        setTimeout(() => {
          setPollActive(false);
        }, remainingTime * 1000);
      }
      // save votes to local storage so the poll doesn't reset each time
      const savedVotes = localStorage.getItem('pollVotes');
      if (savedVotes) {
        const parsedVotes = JSON.parse(savedVotes);
        setOptions(parsedVotes.options);
        setTotalVotes(parsedVotes.totalVotes);
      }
    }, []);

    const calculateRemainingTime = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      return (midnight.getTime() - now.getTime()) / 1000;
    };

    useEffect(() => {
      localStorage.setItem('pollVotes', JSON.stringify({ options, totalVotes }));
    }, [options, totalVotes]);
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
          <h2>{pollActive ? title : `${title}`}</h2>
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