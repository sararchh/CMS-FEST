/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { FiAlignLeft, FiX } from 'react-icons/fi';
import { HomeAppContext } from '@/contexts/homeAppContext';
import { menuConfig } from '@/config/menuConfig';
import styles from './HeaderClient.module.css';
import { SkeletonBase } from '@/components/atoms/SkeletonBase/SkeletonBase';
import Skeleton from 'react-loading-skeleton';

interface Props {
  alternativeColor?: boolean;
}

export const HeaderClient: React.FC<Props> = ({ alternativeColor = false }) => {
  const { loading } = useContext(HomeAppContext);

  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpenMenu) {
      document.body.classList.remove('scroll-block');
    }
  }, [isOpenMenu]);

  const handleOpenMenuMobile = (bool: boolean) => {
    if (bool) {
      document.body.classList.add('scroll-block');
    }
    setIsOpenMenu(bool);
  };

  return (
    <header className={alternativeColor ? styles['container-alternative'] : styles['container']}>
      <div className={styles['content-desktop']}>
        {loading && (
          <SkeletonBase>
            <Skeleton width={150} height={20} style={{ marginRight: 5 }} />
            <Skeleton width={150} height={20} style={{ marginRight: 5 }} />
            <Skeleton width={150} height={20} style={{ marginRight: 5 }} />
            <Skeleton width={70} height={70} style={{ marginRight: 20, marginLeft: 20 }} />
            <Skeleton width={150} height={20} style={{ marginRight: 5 }} />
            <Skeleton width={150} height={20} style={{ marginRight: 5 }} />
            <Skeleton width={150} height={20} style={{ marginRight: 5 }} />
          </SkeletonBase>
        )}
        {!loading && (
          <>
            {menuConfig.map((menu: any) => {
              if (!menu.top) return;
              if (menu.showLogo) {
                return (
                  <img
                    data-aos="zoom-in"
                    data-aos-delay="300"
                    key={menu?.id}
                    className={`object-cover`}
                    src={`/assets/images/logo.png`}
                    width={80}
                    height={80}
                    alt="image"
                  />
                );
              } else {
                return (
                  <a data-aos="fade-down" key={menu?.id} href={menu.link}>
                    <p className={alternativeColor ? styles['text-menu-alternative'] + ' text-[16px] mx-2' :  styles['text-menu'] + ' text-[16px] mx-2'}>{menu.text}</p>
                  </a>
                );
              }
            })}
          </>
        )}
      </div>
      <div className={styles['content-mobile']}>
        {loading && (
          <SkeletonBase>
            <Skeleton width={80} height={70} style={{ marginRight: 5 }} />
            <Skeleton width={40} height={40} style={{ marginRight: 5 }} />
          </SkeletonBase>
        )}
        {!loading && (
          <>
            <img
              data-aos="zoom-in"
              data-aos-delay="300"
              className={`object-cover`}
              src={`/assets/images/logo.png`}
              width={80}
              height={80}
              alt="image"
            />
            <Menu>
              <Menu.Button onClick={() => handleOpenMenuMobile(!isOpenMenu)}>
                {!isOpenMenu && <FiAlignLeft size={40} color="#F8F8FF" />}
                {isOpenMenu && <FiX size={40} color="#F8F8FF" />}
              </Menu.Button>

              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute w-[100%] h-[100vh] right-0 top-[90px] z-10 p-2 origin-top shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bgc-primary">
                  <ul className="w-[100%] mt-6 px-12">
                    {menuConfig.map((menu: any, index: number) => {
                      if (menu.showLogo) return;
                      return (
                        <li
                          key={menu?.id}
                          data-aos="fade-right"
                          data-aos-delay={(index + 1) * 100 + 100}
                          className={styles['li-mobile']}
                        >
                          <Menu.Item>
                            <a data-aos="fade-down" href={menu.link} onClick={() => handleOpenMenuMobile(false)}>
                              <p className={styles['text-menu'] + ' text-[22px] hover:text-[24px] mx-2'}>
                                {menu?.text}
                              </p>
                            </a>
                          </Menu.Item>
                        </li>
                      );
                    })}
                  </ul>
                </Menu.Items>
              </Transition>
            </Menu>
          </>
        )}
      </div>
    </header>
  );
};
