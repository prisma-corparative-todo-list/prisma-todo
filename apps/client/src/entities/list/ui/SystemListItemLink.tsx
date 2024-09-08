import { FC } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  children: React.ReactNode;
  pageUrl: string;
  tag?: 'li' | 'div';
  className?: string;
}

export const SystemListItemLink: FC<IProps> = ({
  children,
  pageUrl,
  tag: Tag = 'li',
  className,
}) => {
  return (
    <Tag
      className={`${className} mb-2 hover:bg-[#e2e3d1] w-full rounded-md ${
        // eslint-disable-next-line no-restricted-globals
        location.pathname === `${pageUrl}` && 'bg-[#e2e3d1]'
      }`}
    >
      <Link className="flex items-center gap-5 p-3" to={`${pageUrl}`}>
        {children}
      </Link>
    </Tag>
  );
};
