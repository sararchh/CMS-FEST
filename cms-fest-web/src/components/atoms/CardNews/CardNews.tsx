/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './CardNews.module.css';

interface Props {
  path?: string;
  date: string;
  title: string;
  description: string;
  width?: string;
  height?: string;
  action?: () => null;
  expanded?: boolean;
  seeMore?: boolean;
  longLength?: boolean;
  thumb?: string | any;
  hasDelay?: boolean;
}

export const ContainerComponent: React.FC<Props> = ({
  date,
  title,
  description,
  width = '400px',
  height = '150px',
  action,
  expanded = false,
  seeMore = false,
  longLength = false,
  thumb = false,
  hasDelay = true,
}) => {
  const classCard = `w-[${width}] min-h-[${height}] flex flex-col m-2 md:m-4`;
  const descLength = description.length;
  const sizeLength = longLength ? 320 : 150;

  return (
    <div
      {...(hasDelay && { 'data-aos': 'fade-up', 'data-aos-delay': '200' })}
      // data-aos="fade-up"
      // data-aos-delay="200"
      className={styles['card-news'] + ` ${classCard} ${action ? ' cursor-pointer' : ' '}`}
      onClick={action}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start">
        {thumb && (
          <img
            {...(hasDelay && { 'data-aos': 'fade-up', 'data-aos-delay': '400' })}
            // data-aos="fade-up"
            // data-aos-delay="400"
            width={300}
            height={400}
            className={'max-h-[400px] mt-[10px] mb-4 md:mb-0 object-cover'}
            alt="image-news"
            src={thumb}
          />
        )}
        <div className="flex flex-col pl-4">
          <h2 className="text-lg md:text-xl font-medium">{title}</h2>
          <p className="text-[14px] md:text-md text-gray-600">{date && new Date(date).toLocaleDateString('pt-BR')}</p>
          <p
            className={
              `${expanded ? 'pb-[20px] ' : ''}` + ' text-[14px] md:text-md text-gray-600 mt-1 md:mt-2 pb-[10px]'
            }
          >
            {expanded && description}
            {!expanded && descLength > sizeLength ? `${description.substring(0, sizeLength)}...` : description}
          </p>
          {seeMore && <p className={'font-bold my-2'}>{expanded ? 'Ver Menos' : 'Ver Mais'}</p>}
        </div>
      </div>
    </div>
  );
};

const WithLink = (props: Props) => (
  <NavLink to={props.path} className={'w-full h-full'}>
    <ContainerComponent {...props} />
  </NavLink>
);

export const CardNews = (props: Props) => (props.path ? <WithLink {...props} /> : <ContainerComponent {...props} />);
