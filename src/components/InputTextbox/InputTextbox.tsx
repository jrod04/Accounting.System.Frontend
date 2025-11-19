import React, { type RefObject } from 'react';
import constants from './../../utils/constants.tsx';
import styles from './InputTextbox.module.css';

type tFlexDirection = 'row' | 'column' | undefined;

interface iFormInputTextBox {
    ariaLabel: string;
    width: number;
    errors: string;
    direction: tFlexDirection;
    ref?: RefObject<HTMLInputElement | null> | undefined;
};

const FormInputTextBox = ({...formInputTextBoxProps}: iFormInputTextBox) => {
    const {
        ariaLabel,
        width,
        direction,
        errors,
        ref
    } = formInputTextBoxProps;

    const inputTextBox =
        <section data-testid='inputOuterContainer'
                 style={{width: `${width}px`}}>
            <div data-testid='inputInnerContainer'
                 className={styles.inputTextBox}
                 style={{flexDirection: direction}}>
                <label htmlFor={ariaLabel}>{ariaLabel}</label>{direction === 'row' ? '\u00A0\u00A0' : ''}
                <input aria-label={ariaLabel}
                       type='textbox'
                       ref={ref}
                       className={styles.input}
                       style={{border: errors ? `1.5px solid ${constants.RED}` : '1px solid rgba(0,0,0,1)',
                               outline: errors ? `1.5px solid ${constants.RED}` : '1px solid rgba(0,0,0,1)' }} />
                 {
                     direction === 'row' &&
                     <div className={styles.placeholder}>{ariaLabel}</div>
                 }
            </div>
            <div data-testid='errorContainer'
                 className={styles.errors}
                 style={{color: `${constants.RED}`}}>
                 {errors}
            </div>
        </section>
    return(inputTextBox);
};

export default FormInputTextBox;