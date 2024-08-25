import { useUserStore } from '../../../shared';

import { ProfileMenu } from '../../../features/profile-menu';
import { useState } from 'react';

/* eslint-disable react/jsx-no-useless-fragment */
export const UserProfileButton = () => {
  const { user } = useUserStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <>
        <button onClick={handleClick} className="text-left p-2 flex flex-wrap gap-5 pb-5">
          <img
            src="https://i.pravatar.cc/300"
            alt=""
            className="h-[60px] w-[60px] rounded-full "
          />
          <div>
            <p>{user.userName}</p>
            <p>{user.email}</p>
          </div>
        </button>
        <ProfileMenu
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
        />
      </>
    </>
  );
};
