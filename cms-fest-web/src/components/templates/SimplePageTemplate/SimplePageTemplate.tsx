import { appConfig } from '@/config/appConfig';
import styles from './SimplePageTemplate.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import PATHS from '@/routes/paths';

interface Props {
  alternativeColor?: boolean;
  title?: string;
  children: React.ReactNode;
}

export const SimplePageTemplate: React.FC<Props> = ({ alternativeColor = true, title, children }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-screen min-h-screen h-auto">
      <header className={alternativeColor ? styles['container-alternative'] : styles['container']}>
        <div className={styles['content-desktop']}>
          <NavLink to={PATHS.index} className="flex flex-row items-center">
            <img
              data-aos="zoom-in"
              data-aos-delay="300"
              className={`object-cover`}
              src={`/assets/images/logo.png`}
              width={80}
              height={80}
              alt="image"
            />
            <h3 className="font-bold text-[30px] text-white">{appConfig?.name}</h3>
          </NavLink>
        </div>
      </header>
      <div className="w-full h-full py-8 px-0 flex flex-col items-center mb-[300px]">
        <div className="w-[95vw] md:w-[90vw] h-full py-8 px-0 flex flex-col items-left">
          <div className="flex flex-row items-center">
            <button className="flex items-center text-slate-800 hover:text-slate-600" onClick={handleBack}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[40px] w-[40px] mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.707 3.293a1 1 0 010 1.414L6.414 9H16a1 1 0 110 2H6.414l4.293 4.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h1 className="text-[45px] text-left">{title}</h1>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
