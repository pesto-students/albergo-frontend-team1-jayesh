export const Rupee = () => <span>&#8377;</span>;

export const MaterialIcon = ({ iconName }: { iconName: string }) => {
  return <span className="material-symbols-outlined">{iconName}</span>;
};

export type UserRole = 'partner' | 'user';

export const inValidPasswordMsg =
  'Password must be at least 8 characters long and contain at least one number, one uppercase letter, one lowercase letter and special character';
