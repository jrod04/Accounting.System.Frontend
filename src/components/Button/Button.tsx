import React from 'react';
import { type MouseEvent, type ComponentProps } from 'react';
import styles from './Button.module.css';

export interface iButton {
    id: string;
    value: string;
    width: number;
    bgColor?: string;
    input?: boolean;
    cb_handlerOperation?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({...buttonProps}: iButton) => {
    const {
        input,
        bgColor,
        id,
        value,
        width,
        cb_handlerOperation
    } = buttonProps;

    const backgroundColor: string = bgColor ? bgColor : 'rgba(217,215,205,1)';

    let btn: ComponentProps<'button'> = <button></button>;

    if (!input) {
        btn = <button className={styles.btn}
                      style={{width: width, backgroundColor: backgroundColor}}
                      id={id}
                      onClick={cb_handlerOperation}>
                      {value}
              </button>;
    };

    if (input) {
        btn = <input type='submit'
                     className={styles.btn}
                     style={{width: width, backgroundColor: bgColor}}
                     id={id}
                     value={value} />
    };

    return(<>{btn}</>);
};

export default Button;
