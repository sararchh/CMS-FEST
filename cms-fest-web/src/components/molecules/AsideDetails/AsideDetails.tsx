import React, { useContext } from 'react';
import styles from './AsideDetails.module.css';

import { AuthContext } from '@/contexts/authContext';

import { DropDownMenu } from '../DropDownMenu/DropDownMenu';

export const AsideDetails: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <aside className={styles['aside-container-details']}>
      <div className={styles['avatar-container'] + ' mb-4'}>
        <DropDownMenu title={`${user?.name}`} />
      </div>
    </aside>
  );
};
