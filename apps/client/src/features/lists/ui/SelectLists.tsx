import { List } from 'prisma/prisma-client';
import { FC, useEffect, useState } from 'react';
import {
  useGetLists,
  useGetList,
} from '../../../shared/api/queries/list.queries';
import { ListItemButton } from '../../../entities/list';

interface IProps {
  currentListId?: string;
}

export const SelectLists: FC<IProps> = ({ currentListId }) => {
  const [listId, setListId] = useState('');

  const [isListVisible, setIsListVisible] = useState(false);

  const { lists, listsIsError, listsIsPending, listsIsSuccess } = useGetLists();

  const { list, listIsSuccess, listIsError } = useGetList(listId);

  const toggleList = () => {
    setIsListVisible((prev) => !prev);
  };

  const handleAddList = (listId: string | null) => {
    setIsListVisible(false);
  };

  useEffect(() => {
    if (currentListId) {
      setListId(currentListId);
    }
  }, [currentListId]);

  return (
    <>
      {isListVisible && (
        <div className="absolute right-1 top-[-310px] bg-white w-[300px] h-[300px] rounded-2xl overflow-auto">
          <ul className="overflow-auto mb-5">
            <li
              onClick={() => handleAddList(null)}
              className="w-full hover:bg-slate-100 p-5 rounded-t-2xl"
            >
              <button className="">Tasks</button>
            </li>
            {listsIsSuccess &&
              lists
                ?.reverse()
                .map((list, idx) => (
                  <ListItemButton
                    idx={idx}
                    key={list?.id || idx}
                    list={list}
                    className="hover:bg-slate-100"
        
                  />
                ))}
          </ul>
        </div>
      )}
      <button onClick={toggleList}>
        {list?.id && list.id === listId ? list.title : 'Tasks'}
      </button>
    </>
  );
};
