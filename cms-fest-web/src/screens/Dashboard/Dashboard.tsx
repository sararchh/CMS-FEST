/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { MainTemplate } from '@/components/templates/MainTemplate/MainTemplate';
import { Card } from '@/components/atoms/Card/Card';

import { FiUsers } from 'react-icons/fi';
import { BsPeople } from 'react-icons/bs';
import { RiContactsLine } from 'react-icons/ri';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { MdMenu, MdOutlineEventAvailable, MdOutlineLiveTv } from 'react-icons/md';
import { GrGallery } from 'react-icons/gr';
import { INews } from '@/repositories/newsRepository/newsRepository.types';
import { NewsRepository } from '@/repositories/newsRepository/newsRepository';
import toast from 'react-hot-toast';
import { CardNews } from '@/components/atoms/CardNews/CardNews';

const activities = [
  { icon: <FiUsers size={30} />, info: 'Usuários', routes: '/usuarios' },
  { icon: <BsPeople size={30} />, info: 'Patrocinadores', routes: '/patrocinadores' },
  { icon: <RiContactsLine size={30} />, info: 'Contatos', routes: '/contatos' },
  { icon: <HiOutlineNewspaper size={30} />, info: 'Notícias', routes: '/noticias' },
  { icon: <MdMenu size={30} />, info: 'Cardápios', routes: '/menu' },
  { icon: <MdOutlineEventAvailable size={30} />, info: 'Programação', routes: '/evento' },
  { icon: <GrGallery size={30} />, info: 'Galeria', routes: '/galeria' },
  { icon: <MdOutlineLiveTv size={30} />, info: 'Live', routes: '/live' },
];

export const Dashboard: React.FC = () => {
  const newsRepository = new NewsRepository();

  const [newsList, setNewsList] = useState<INews[]>([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const data = await newsRepository.listAll('', '1', '3', 'createdAt', 'DESC');
      setNewsList(data.data);
    } catch (error) {
      toast.error('Erro ao listar Notícias');
    }
  };

  return (
    <MainTemplate>
      <section className={styles['container']}>
        {activities.map((activity: { icon: JSX.Element; info: string; routes: string }, index: number) => (
          <Link to={activity.routes} key={index}>
            <Card className={styles['wrapper']}>
              {activity.icon}
              <h1>{activity.info}</h1>
            </Card>
          </Link>
        ))}
      </section>

      <section>
        {Boolean(newsList.length > 0) &&
          newsList.map((news: INews, index: number) => (
            <CardNews
              key={index}
              seeMore
              longLength
              hasDelay={false}
              // @ts-ignore
              action={() => setExpandedIndex(expandedIndex === index ? null : index)}
              width="100%"
              height="auto"
              expanded={expandedIndex === index}
              date={news?.date}
              title={news?.title}
              description={news?.description}
              thumb={news?.thumb}
            />
          ))}
      </section>
    </MainTemplate>
  );
};
