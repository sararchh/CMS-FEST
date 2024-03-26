/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Spinner } from '@/components/atoms/Spinner/Spinner';

interface Props {
  isOpen: boolean;
  loading: boolean;
  title: string;
  alert?: string;
  onConfirm?: () => void;
  onClose?: () => void;
  children?: React.ReactNode;
  customCssContainer?: any;
  className?: any;
}

export const DialogConfirm: React.FC<Props> = ({
  isOpen = false,
  loading = false,
  title,
  alert,
  onConfirm = () => null,
  onClose = () => null,
  children,
  customCssContainer,
  className
}) => {
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!isOpen || keyCode !== 27) return;
      onClose();
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed top-0 left-0 right-0 z-40 w-screen h-screen flex flex-col items-center bg-black/[.1]`}
      onClick={onClose}
    >
      <div
        style={customCssContainer ? customCssContainer : {}}
        className={`min-h-[200px] w-[90%] h-[200px] md:w-[500px] md:h-[200px] sm:h-[250px] mt-[30vh] bg-white shadow-md rounded-md ${className}`}
      >
        <div className="relative rounded-lg" onClick={(e) => e.stopPropagation()}>
          {!children && (
            <>
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={onClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{title}</h3>
                <p className="mb-5 text-base font-normal text-red-600 hover:text-red-800  dark:ring-red-300">{alert}</p>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white min-w-[100px] bg-red-600 hover:bg-red-800  focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center mr-8"
                  onClick={onConfirm}
                >
                  {loading ? <Spinner classSize={'w-[20px] h-[20px]'} /> : 'Confirmar'}
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-gray-500 min-w-[100px] bg-slate-200 hover:bg-slate-300  focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center"
                  onClick={onClose}
                >
                  Voltar
                </button>
              </div>
            </>
          )}

          {children && (
            <>
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="popup-modal"
                onClick={onClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 text-center">
                {children}
                {/* <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white min-w-[100px]  bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center mr-8"
                  onClick={onConfirm}
                >
                  {loading ? <Spinner classSize={'w-[20px] h-[20px]'} /> : 'Confirmar'}
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-gray-500 min-w-[100px] bg-slate-200 hover:bg-slate-300  focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm inline-flex items-center justify-center px-5 py-2.5 text-center"
                  onClick={onClose}
                >
                  Voltar
                </button> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
