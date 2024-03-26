import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiHome, FiUser, FiUsers } from 'react-icons/fi';
import { GoSponsorTiers } from 'react-icons/go';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdOutlineLiveTv, MdOutlineWidthFull, MdOutlineEventAvailable, MdAppRegistration } from 'react-icons/md';
import { BsPeople } from 'react-icons/bs';
import { HiOutlineNewspaper } from 'react-icons/hi';
import { BiCarousel } from 'react-icons/bi';
import { MdMenu } from 'react-icons/md';
import { RiContactsLine } from 'react-icons/ri';
import { GrGallery } from 'react-icons/gr';
import { IoIosArrowDown } from 'react-icons/io';

import styles from './AsideNav.module.css';

import { Logo } from '@/components/atoms/Logo/Logo';
import PATHS from '@/routes/paths';
import { Disclosure } from '@headlessui/react';

const SIZEICON = 20;

export const AsideNav: React.FC = () => {
  const location = useLocation();
  const { pathname } = location;

  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth > 900);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <aside>
      <div className={`${styles['menu-icon-container']} ${isMenuOpen ? styles['hidden'] : ''}`} onClick={toggleMenu}>
        <MdMenu size={30} color="#383d49" />
      </div>
      <div className={`${styles['aside-container-nav']} ${isMenuOpen ? styles['open'] : styles['closed']}`}>
        <div className={styles['container-logo']}>
          <Logo />
          <div onClick={toggleMenu} className={styles['menu-icon']}>
            <MdMenu size={30} color="#383d49" />
          </div>
        </div>

        <nav className={styles['aside-nav']}>
          <ul className={styles['aside-ul']}>
            <li className={styles['aside-li']}>
              <div
                className={
                  styles['navlink-container'] +
                  ` ${pathname.includes(PATHS?.dashboard.index) ? 'aside-active-menu' : 'aside-desactive-menu'}`
                }
              >
                <NavLink className="active" to={PATHS?.dashboard.index}>
                  <FiHome size={SIZEICON} color="#383d49" />
                  Dashboard
                </NavLink>
              </div>
            </li>

            <Disclosure as="li" className={styles['disclosure']}>
              {({ open }) => (
                <>
                  <Disclosure.Button className={`${styles['disclosure']}  flex items-center justify-between w-full `}>
                    <div className="flex items-center  gap-2">
                      <BiCarousel size={SIZEICON} />
                      <a> Carousel</a>
                    </div>
                    <IoIosArrowDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5`} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4">
                    <li className={styles['aside-li'] + ' mt-5 m-0'}>
                      <div
                        className={
                          styles['navlink-container'] +
                          ` ${pathname.includes(PATHS?.carousel.index) ? 'aside-active-menu' : 'aside-desactive-menu'}`
                        }
                      >
                        <NavLink className="active" to={PATHS?.carousel.index}>
                          <BiCarousel size={SIZEICON} color="#383d49" />
                          Carousel
                        </NavLink>
                      </div>
                    </li>
                    <li className={styles['aside-li'] + ' mt-5 m-0'}>
                      <div
                        className={
                          styles['navlink-container'] +
                          ` ${pathname.includes(PATHS?.position.index) ? 'aside-active-menu' : 'aside-desactive-menu'}`
                        }
                      >
                        <NavLink className="active" to={PATHS?.position.index}>
                          <MdOutlineWidthFull size={SIZEICON} color="#383d49" />
                          Posição Carousel
                        </NavLink>
                      </div>
                    </li>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <li className={styles['aside-li']}>
              <div
                className={
                  styles['navlink-container'] +
                  ` ${pathname.includes(PATHS?.users.index) ? 'aside-active-menu' : 'aside-desactive-menu'}`
                }
              >
                <NavLink className="active" to={PATHS?.users.index}>
                  <FiUsers size={SIZEICON} color="#383d49" />
                  Usuários
                </NavLink>
              </div>
            </li>
            <li className={styles['aside-li']}>
              <div
                className={
                  styles['navlink-container'] +
                  ` ${pathname.includes(PATHS?.profile.index) ? 'aside-active-menu' : 'aside-desactive-menu'}`
                }
              >
                <NavLink className="active" to={PATHS?.profile.index}>
                  <FiUser size={SIZEICON} color="#383d49" />
                  Perfil
                </NavLink>
              </div>
            </li>

            <li className={styles['aside-li']}>
              <div
                className={
                  styles['navlink-container'] +
                  ` ${pathname.includes(PATHS?.menu.index) ? 'aside-active-menu' : 'aside-desactive-menu'}`
                }
              >
                <NavLink className="active" to={PATHS?.menu.index}>
                  <MdMenu size={SIZEICON} color="#383d49" />
                  Cardápio
                </NavLink>
              </div>
            </li>
            <li className={styles['aside-li']}>
              <div
                className={
                  styles['navlink-container'] +
                  ` ${pathname.includes(PATHS?.live.index) ? 'aside-active-menu' : 'aside-desactive-menu'}`
                }
              >
                <NavLink className="active" to={PATHS?.live.index}>
                  <MdOutlineLiveTv size={SIZEICON} color="#383d49" />
                  Live
                </NavLink>
              </div>
            </li>
            <li className={styles['aside-li']}>
              <div
                className={
                  styles['navlink-container'] +
                  ` ${pathname.includes(PATHS?.contact.index) ? 'aside-active-menu' : 'aside-desactive-menu'}`
                }
              >
                <NavLink className="active" to={PATHS?.contact.index}>
                  <RiContactsLine size={SIZEICON} color="#383d49" />
                  Contatos
                </NavLink>
              </div>
            </li>
            <li className={styles['aside-li']}>
              <div
                className={
                  styles['navlink-container'] +
                  ` ${pathname.includes(PATHS?.schedule.index) ? 'aside-active-menu' : 'aside-desactive-menu'}`
                }
              >
                <NavLink className="active" to={PATHS?.schedule.index}>
                  <MdOutlineEventAvailable size={SIZEICON} color="#383d49" />
                  Programação
                </NavLink>
              </div>
            </li>

            <Disclosure as="li" className={styles['disclosure']}>
              {({ open }) => (
                <>
                  <Disclosure.Button className={`${styles['disclosure']}  flex justify-between items-center w-full `}>
                    <div className="flex items-center  gap-2">
                      <BsPeople size={SIZEICON} />
                      <a> Patrocinadores</a>
                    </div>
                    <IoIosArrowDown className={`${open ? 'transform rotate-180' : ''} w-5 h-5`} />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4">
                    <li className={styles['aside-li'] + ' mt-5 m-0'}>
                      <div
                        className={
                          styles['navlink-container'] +
                          ` ${pathname.includes(PATHS?.sponsor.index) ? 'aside-active-menu' : 'aside-desactive-menu'}`
                        }
                      >
                        <NavLink className="active" to={PATHS?.sponsor.index}>
                          <FaPeopleGroup size={SIZEICON} color="#383d49" />
                          Patrocinadores
                        </NavLink>
                      </div>
                    </li>
                    <li className={styles['aside-li'] + ' mt-4 m-0'}>
                      <div
                        className={
                          styles['navlink-container'] +
                          ` ${
                            pathname.includes(PATHS?.typeSponsors.index) ? 'aside-active-menu' : 'aside-desactive-menu'
                          }`
                        }
                      >
                        <NavLink className="active" to={PATHS?.typeSponsors.index}>
                          <GoSponsorTiers size={SIZEICON} color="#383d49" />
                          Tipos Patrocinadores
                        </NavLink>
                      </div>
                    </li>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>

            <li className={styles['aside-li']}>
              <div
                className={
                  styles['navlink-container'] +
                  ` ${pathname.includes(PATHS?.gallery.index) ? 'aside-active-menu' : 'aside-desactive-menu'}`
                }
              >
                <NavLink className="active" to={PATHS?.gallery.index}>
                  <GrGallery size={SIZEICON} color="#383d49" />
                  Galeria
                </NavLink>
              </div>
            </li>
            <li className={styles['aside-li']}>
              <div
                className={
                  styles['navlink-container'] +
                  ` ${pathname.includes(PATHS?.news.index) ? 'aside-active-menu' : 'aside-desactive-menu'}`
                }
              >
                <NavLink className="active" to={PATHS?.news.index}>
                  <HiOutlineNewspaper size={SIZEICON} color="#383d49" />
                  Notícias
                </NavLink>
              </div>
            </li>
            <li className={styles['aside-li']}>
              <div
                className={
                  styles['navlink-container'] +
                  ` ${pathname.includes(PATHS?.registrations.index) ? 'aside-active-menu' : 'aside-desactive-menu'}`
                }
              >
                <NavLink className="active" to={PATHS?.registrations.index}>
                  <MdAppRegistration  size={SIZEICON} color="#383d49" />
                  Incrições
                </NavLink>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};
