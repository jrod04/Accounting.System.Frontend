import React from 'react';
import styles from './Button.module.css';

export interface iButton {
    id: string;
    value: string;
    width: number;
    input?: boolean;
    cb_handlerOperation?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({input, id, value, width, cb_handlerOperation}: iButton) => {
    //TODO:
    let btn: React.ComponentProps<'button'> = <button></button>;

    if (!input) {
        btn = <button className={styles.btn}
                      style={{width: width}}
                      id={id}
                      onClick={cb_handlerOperation}>
                      {value}
              </button>;
    };

    if (input) {
        btn = <input type='submit'
                     className={styles.btn}
                     style={{width: width}}
                     id={id}
                     value={value} />
    };

    return(<>{btn}</>);
};

export default Button;
