/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactElement } from 'react';

import styles from './Textarea.module.css';

interface AuxProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  customCssContainer?: any;
  type?: string;
  label?: string;
  endAddorment?: React.ReactNode;
  helperText?: string | any;
  disabled?: boolean;
}

export const TextArea = ({ ...props }: AuxProps): ReactElement => {
  return (
    <div className={styles['container-input']} style={props?.customCssContainer ? props.customCssContainer : {}}>
      <label className={styles['label-input']}>{props.label}</label>

      <textarea
        className={
          styles['input-styled'] +
          ` leading-5 relative py-2 px-1  bg-white border focus:outline-none focus:border-t-transparent focus:ring-0`
        }
        {...props}
      />
      {props?.endAddorment && <div className={styles['end-addorment']}>{props?.endAddorment}</div>}
      <span className={styles['helper-text']}>{props?.helperText ? props?.helperText : ' '}</span>
    </div>
  );
};
