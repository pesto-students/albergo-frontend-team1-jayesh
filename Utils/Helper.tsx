import { Fragment, useState } from 'react';

export const Rupee = () => <span>&#8377;</span>;

export const MaterialIcon = ({ iconName }: { iconName: string }) => {
  return <span className="material-symbols-outlined">{iconName}</span>;
};

export type UserRole = 'partner' | 'user';

export const inValidPasswordMsg =
  'Password must be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter and special character';

export const ReadMore = ({
  text,
  maxLength = 100
}: {
  text: string;
  maxLength?: number;
}) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <Fragment>
      {isReadMore ? text.slice(0, maxLength) : text}
      <span onClick={toggleReadMore} className="readMore">
        {isReadMore && '...read more'}
      </span>
    </Fragment>
  );
};