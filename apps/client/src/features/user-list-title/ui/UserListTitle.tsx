import { List } from 'prisma/prisma-client';
import { useUpdateList, useListStore } from '../../../shared/';
import { FC, useEffect, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

interface IProps {
  list?: List;
}

export const UserListTitle: FC<IProps> = ({ list }) => {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const { updateList, updateListIsSuccess } = useUpdateList(list?.id);

  const { defineUpdateListIsSuccess } = useListStore();

  const handleShowChangeTitleList = () => {
    setIsInputVisible(true);
  };

  const handleChangeInputValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  const handleUpdateList = () => {
    updateList({ title: inputValue, id: list?.id });
    setIsInputVisible(false);
    setInputValue('');
  };

  const handleChangeEmoji = (e: any) => {
    console.log(e);
  };

  useEffect(() => {
    if (updateListIsSuccess) {
      defineUpdateListIsSuccess(true);
    } else {
      defineUpdateListIsSuccess(false);
    }

    if (list) {
      setInputValue(list.title || '');
    }
  }, [updateListIsSuccess, list, defineUpdateListIsSuccess]);

  return (
    <div className="flex gap-5 items-center">
      <span aria-label="emoji" role="img" className="text-3xl">
        🤬
      </span>
      {isInputVisible ? (
        <input
          className="text-3xl outline-none mb-2 bg-transparent border-b-2 border-black"
          placeholder="Untitled"
          type="text"
          onBlur={handleUpdateList}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdateList()}
          onChange={handleChangeInputValue}
          value={inputValue}
          autoFocus={true}
        />
      ) : (
        <button onClick={handleShowChangeTitleList} className="text-3xl mb-2">
          {list?.title === '' ? 'Untitled' : list?.title}
        </button>
      )}
    </div>
  );
};
