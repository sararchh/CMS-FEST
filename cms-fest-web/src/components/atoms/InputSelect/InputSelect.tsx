/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';

import styles from './InputSelect.module.css';

interface AuxProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  customCssContainer?: any;
  type?: string;
  label?: string;
  endAddorment?: React.ReactNode;
  helperText?: string | any;
  disabled?: boolean;
  dataArray: { _id: string; position: string }[];
}

export const InputSelect = ({ customCssContainer, dataArray, ...props }: AuxProps): ReactElement => {
  return (
    <div className={styles['container-input']} style={customCssContainer ? customCssContainer : {}}>
      <label htmlFor="input-select" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {props.label}
      </label>
      <select
       {...props}
        id="input-select"
        defaultValue="Selecione"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="Selecione">Selecione</option>
        {Boolean(dataArray.length) &&
          dataArray.map((item) => <option key={item._id} value={item._id}>{item.position}</option>)}
      </select>

      {props?.endAddorment && <div className={styles['end-addorment']}>{props?.endAddorment}</div>}
      <span className={styles['helper-text']}>{props?.helperText ? props?.helperText : ' '}</span>
    </div>
  );
};
