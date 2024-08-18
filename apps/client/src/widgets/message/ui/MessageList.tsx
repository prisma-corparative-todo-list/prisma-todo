import { MessageItem } from '../../../entities/message';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGroup } from '../../../shared';
import CircularProgress from '@mui/material/CircularProgress';

export const MessageList = () => {
  const { ref, inView } = useInView();

  const liRef = useRef<HTMLLIElement>(null);

  const ulRef = useRef<HTMLUListElement>(null);

  const { messages, fetchNextPage, hasNextPage } = useGroup();

  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  useEffect(() => {
    if (inView && ulRef.current && hasNextPage) {
      setPrevScrollHeight(ulRef.current.scrollHeight);
      fetchNextPage().then(() => {
        if (ulRef.current) {
          ulRef.current.scrollTop = ulRef.current.scrollHeight - prevScrollHeight;
        }
      });
    }
  }, [inView]);

  useEffect(() => {
  
    const timeout = setTimeout(() => {
      if (ulRef.current) {
        liRef.current?.scrollIntoView({ behavior: 'auto' });
      }
    }, 350);
    return () => clearTimeout(timeout);

  }, []);

  useEffect(() => {
    if (ulRef.current) {
      if (
        ulRef.current.scrollHeight -
          ulRef.current.scrollTop -
          ulRef.current.clientHeight <=
        125
      ) {
        liRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  return (
    <ul
      ref={ulRef}
      className="list-none scroll-marquee h-[87%] overflow-auto rounded-lg pl-5 border-2 border-red-300"
    >
  
      <li ref={ref} />
      {
        messages.map((message, idx) => (
          <MessageItem message={message} key={idx} />
        ))}
      <li ref={liRef} />
    </ul>
  );
};
