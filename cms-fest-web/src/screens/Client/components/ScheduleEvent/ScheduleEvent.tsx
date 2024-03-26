/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { FiMapPin } from 'react-icons/fi';
import { HomeAppContext } from '@/contexts/homeAppContext';
import { SkeletonBase } from '@/components/atoms/SkeletonBase/SkeletonBase';

import styles from './ScheduleEvent.module.css';
import { ScheduleRepository } from '@/repositories/scheduleRepository/scheduleRepository';
import { ISchedule } from '@/repositories/scheduleRepository/scheduleRepository.types';
import toast from 'react-hot-toast';

export const ScheduleEvent: React.FC = () => {
  const { loading } = useContext(HomeAppContext);
  const classTextMenu = ' text-[15px] md:text-[15px] lg:text-[22px] mx-2';

  const scheduleRepository = new ScheduleRepository();

  const [selectedMenu, setSelectedMenu] = useState(0);
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const [scheduleSelected, setScheduleSelected] = useState<ISchedule>();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const { data } = await scheduleRepository.listAll();
      data?.sort((a, b) => a.order - b.order);
      setScheduleSelected(data[0]);
      setSchedule(data);
    } catch (error) {
      toast.error('Erro ao listar Programação');
    }
  };

  return (
    <section id="schedule" className={styles['container']}>
      {loading && (
        <>
          <SkeletonBase>
            <Skeleton width={300} height={45} style={{}} />
          </SkeletonBase>
          <div style={{ height: 40 }} />
          <SkeletonBase>
            <Skeleton width={280} height={180} style={{ marginLeft: -380 }} />
            <Skeleton width={280} height={180} style={{ marginLeft: 500 }} />
            <Skeleton width={280} height={180} style={{ marginLeft: -380 }} />
            {/* <Skeleton width={620} height={20} style={{ marginTop: 10 }} /> */}
          </SkeletonBase>
        </>
      )}
      {!loading && (
        <>
          <h1 data-aos="fade-up" className="text-3xl md:text-5xl font-medium">
            Programação
          </h1>
          <div className={styles['content-about']}>
            <div className={styles['content-menu']} data-aos="fade-up">
              {Boolean(schedule?.length > 0) &&
                schedule
                  .sort((a, b) => a.order - b.order)
                  .map((item: ISchedule, index: number) => (
                    <button
                      key={index}
                      type="button"
                      className={selectedMenu === index ? styles['button-menu-active'] : styles['button-menu']}
                      onClick={() => {
                        setSelectedMenu(index), setScheduleSelected(item);
                      }}
                    >
                      <p className={styles['text-menu'] + classTextMenu}>{item?.day}</p>
                    </button>
                  ))}
            </div>
            <div className={styles['content-timeline'] + ' mt-12'}>
              {Boolean(scheduleSelected?.items?.length > 0) &&
                scheduleSelected?.items?.map((item: ISchedule['items'][0], index: number) => (
                  <div
                    key={index}
                    className={index % 2 != 0 ? styles['timeline-item-right'] : styles['timeline-item-left']}
                  >
                    <div className={styles['timeline-item-line']} />
                    <div className={styles['timeline-item-circle']}>
                      <time
                        data-aos="zoom-in"
                        data-aos-delay="120"
                        className={styles['timetile-text-color'] + ' text-[12px] md:text-md'}
                      >
                        {item?.time}
                      </time>
                    </div>
                    <div
                      className={styles['timeline-content-info']}
                      data-aos={index % 2 != 0 ? 'fade-left' : 'fade-right'}
                    >
                      <h3 className={styles['timetile-text-title'] + ' text-[14px] md:text-lg font-bold my-2'}>
                        {item?.title}
                      </h3>
                      <span className={styles['content-time']}>
                        <time className={styles['timetile-text-color'] + ' text-[12px] md:text-md'}>{item?.time}</time>{' '}
                        <span>-</span>
                        <FiMapPin size={12} color="#fff" />
                        <p className={styles['timetile-text-color'] + ' text-[12px] md:text-md ml-2'}>{item?.locale}</p>
                      </span>
                      <p className={styles['timetile-text-description'] + ' text-[11px] md:text-sm'}>
                        {item?.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
