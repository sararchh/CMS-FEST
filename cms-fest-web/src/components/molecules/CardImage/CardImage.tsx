import React from 'react';

import styles from './CardImage.module.css';
import { Button } from '@/components/atoms/Button/Button';

interface CardImageProps {
  className?: string;
  image: string;
  onClick?: () => void;
  onClickImage?: () => void;
}

export const CardImage = ({ image, onClick = () => null, className, onClickImage = () => null }: CardImageProps) => {
  return (
    <div className={className ? className : `${styles['container-details']}`}>
      <img src={image} alt="banner" onClick={onClickImage} className='cursor-pointer' />
      <Button className={styles['button-item-form'] + 'radius rounded-none'} onClick={onClick}>
        REMOVER
      </Button>
    </div>
  );
};
