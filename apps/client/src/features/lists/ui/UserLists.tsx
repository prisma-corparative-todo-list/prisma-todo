import { useEffect, useState } from 'react';
import { ListItemLink } from '../../../entities/list';
import { useGetLists, useListStore, usePostList } from '../../../shared';
import AddIcon from '@mui/icons-material/Add';

export const UserLists = () => {
  const { lists, listsIsSuccess, refetch } = useGetLists();

  const { postList, postListIsSuccess } = usePostList();

  const [title, setTitle] = useState('');

  const [choosedListId, setChoosedListId] = useState('');

  const { deleteListIsSuccess, updateListIsSuccess } = useListStore();

  const handlePostList = () => {
    postList({
      title,
    });
    setTitle('');
  };

  useEffect(() => {
    if (postListIsSuccess || deleteListIsSuccess || updateListIsSuccess)
      refetch();
  }, [postListIsSuccess, deleteListIsSuccess, updateListIsSuccess, refetch]);

  return (
    <div className="h-[22%] relative py-2 ">
      <ul className="h-[90%] overflow-auto border-[black] border-b-2 mb-5 pb-5">
        {listsIsSuccess &&
          lists
            ?.reverse()
            .map((list, idx) => (
              <ListItemLink
                className="text-lg hover:bg-[#e2e3d1]"
                list={list}
                key={list.id}
                idx={idx}
                label={list?.title || ''}
              />
            ))}
      </ul>
      <button
        onClick={handlePostList}
        className="flex items-center gap-2 w-full bottom p-[5px]"
      >
        <AddIcon />
        <span>create new list</span>
      </button>
    </div>
  );
};
