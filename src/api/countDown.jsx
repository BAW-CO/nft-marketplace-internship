import { useState, useEffect } from 'react';

const Countdown = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState('');

  const calculateTimeLeft = (expiryDate) => {
    const difference = new Date(expiryDate) - new Date();
    
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    return 'Expired';
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(expiryDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [expiryDate]);

  return <div className="de_countdown">{timeLeft}</div>;
};

export default Countdown;
