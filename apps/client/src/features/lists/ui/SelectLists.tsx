import { List } from 'prisma/prisma-client';
import { FC, useEffect, useState } from 'react';
import {
  useGetLists,
  useGetList,
} from '../../../shared/api/queries/list.queries';
import { ListItemButton } from '../../../entities/list';
import { useListStore } from '../../../shared';

export const SelectLists = () => {
  const { listId } = useListStore();

  const [isListVisible, setIsListVisible] = useState(false);

  const { lists, listsIsSuccess } = useGetLists();

  const { list } = useGetList(listId);

  const toggleList = () => {
    setIsListVisible((prev) => !prev);
  };

  return (
    <>
      {isListVisible && (
        <div className="absolute right-1 top-[-310px] bg-white w-[300px] h-[250px] rounded-2xl overflow-auto">
          <ul className="overflow-auto mb-5 flex flex-col justify-between">
            <ListItemButton onToggleVisibility={toggleList} />
            {listsIsSuccess &&
              lists
                ?.reverse()
                .map((list, idx) => (
                  <ListItemButton
                    onToggleVisibility={toggleList}
                    idx={idx}
                    key={list?.id || idx}
                    list={list}
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
