import { useUserStore } from '../../../shared';
import { useEffect, useState } from 'react';

export const HomeGreetingTitle = () => {
  const [greeting, setGreeting] = useState('');

  const { user } = useUserStore();

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 0 && hours <= 6) {
      setGreeting('Good night');
    }
    if (hours >= 7 && hours <= 11) {
      setGreeting('Good morning');
    }
    if (hours >= 12 && hours <= 17) {
      setGreeting('Good afternoon');
    }
    if (hours >= 18 && hours <= 23) {
      setGreeting('Good evening');
    }
  }, [new Date().getHours()]);
  
  return <h3 className="text-3xl">{`${greeting}, ${user?.userName}!`}</h3>;
};
