import React from 'react';
import { type MouseEvent, type ComponentProps } from 'react';
import styles from './Button.module.css';

export interface iButton {
    ariaLabel: string;
    id: string;
    value: string;
    width: number;
    bgColor?: string;
    input?: boolean;
    cb_handlerClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({...buttonProps}: iButton) => {
    const {
        ariaLabel,
        input,
        bgColor,
        id,
        value,
        width,
        cb_handlerClick
    } = buttonProps;

    const backgroundColor: string = bgColor ? bgColor : 'rgba(217,215,205,1)';

    let btn: ComponentProps<'button'> = <button></button>;

    if (!input) {
        btn = <button aria-label={ariaLabel}
                      className={styles.btn}
                      style={{width: width, backgroundColor: backgroundColor}}
                      id={id}
                      onClick={cb_handlerClick}>
                      {value}
              </button>;
    };

    if (input) {
        btn = <button aria-label={ariaLabel}
                      className={styles.btn}
                      type='submit'
                      style={{width: width, backgroundColor: backgroundColor}}
                      id={id}
                      onClick={cb_handlerClick}>
                      {value}
              </button>;
    };

    return(<>{btn}</>);
};

export default Button;
