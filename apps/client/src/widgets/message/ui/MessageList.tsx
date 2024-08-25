import { MessageItem } from '../../../entities/message';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGroup } from '../../../shared';
import { debounce } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const MessageList = () => {
  const { ref, inView } = useInView();

  const liRef = useRef<HTMLLIElement>(null);

  const ulRef = useRef<HTMLUListElement>(null);

  const { messages, fetchNextPage, hasNextPage } = useGroup();

  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const handleScrollToBottom = () =>
    liRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    if (inView && ulRef.current && hasNextPage) {
      setPrevScrollHeight(ulRef.current.scrollHeight);
      fetchNextPage().then(() => {
        if (ulRef.current) {
          ulRef.current.scrollTop =
            ulRef.current.scrollHeight - prevScrollHeight;
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
          ulRef.current.clientHeight <
        125
      ) {
        liRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  const handleScroll = debounce(() => {
    if (ulRef.current) {
      setIsButtonVisible(
        ulRef.current.scrollHeight -
          ulRef.current.scrollTop -
          ulRef.current.clientHeight >
          125
      );
    }
  }, 100);

  return (
    <div className="h-[72%]">
      <ul
        ref={ulRef}
        className="list-none h-full overflow-auto pl-5 relative"
        onScroll={handleScroll}
      >
        <li ref={ref} />
        {messages.map((message, idx) => (
          <MessageItem message={message} key={idx} />
        ))}
        <li ref={liRef} />
      </ul>
      {isButtonVisible && (
        <button
          onClick={handleScrollToBottom}
          className="absolute right-[80px] bottom-[150px] bg-white bg-opacity-75 h-[50px] w-[50px] rounded-full"
        >
          <ArrowDownwardIcon fontSize="large" />
        </button>
      )}
    </div>
  );
};
