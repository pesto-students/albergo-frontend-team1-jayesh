import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import styles from '../../styles/Components/UserProfile/sidebar.module.scss';

const UserProfileSidebar = ({
  data
}: {
  data?: any;
}) => {

  const profilePicInp = useRef<HTMLInputElement>(null);

  return (


    
  );
};

export default UserProfileSidebar;
