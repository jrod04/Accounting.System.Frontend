import { useState, useRef, type ChangeEvent, type FocusEvent } from 'react';
import ButtonIcon from './../ButtonIcon/ButtonIcon.tsx';
import MagnifyingGlass from './../../assets/magnifyingGlass.svg';
import styles from './InputSearchTextbox.module.css';

interface iInputSearchTextbox {
    ariaLabel: string;
    textboxWidth: number;
    textboxHeight: number;
    iconWidth: number;
    iconHeight: number;
    showImage: boolean;
    searchValue: string;
    cb_handlerOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    cb_handlerOnFocus: (e: ChangeEvent<HTMLInputElement>) => void;
    cb_handlerOnBlur: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputSearchTextbox = ({...inputSearchTextboxInputs}: iInputSearchTextbox) => {
    const {
        ariaLabel,
        textboxWidth,
        textboxHeight,
        showImage,
        iconWidth,
        iconHeight,
        searchValue,
        cb_handlerOnChange,
        cb_handlerOnBlur,
        cb_handlerOnFocus
    } = inputSearchTextboxInputs;

    const refInputSearchTextbox = useRef<HTMLInputElement | null>(null);

    return(
        <div className={styles.container}>
            <input className={styles.input}
                   style={{width: textboxWidth,
                           height: textboxHeight,
                           zIndex: '2',
                           color: searchValue === 'Search...' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,1)'}}
                   aria-label={ariaLabel}
                   type='textbox'
                   onChange={cb_handlerOnChange}
                   onFocus={cb_handlerOnFocus}
                   onBlur={cb_handlerOnBlur}
                   value={searchValue}
                   ref={refInputSearchTextbox} />
            {showImage &&
                <div className={styles.btn}>
                    <ButtonIcon ariaLabel='Chart of Accounts Search Button Icon'
                                alt='Search Button Icon'
                                title='Search Button Icon'
                                icon={MagnifyingGlass}
                                width={iconWidth}
                                height={iconHeight}
                                value=''
                                bgColor='rgba(0,0,0,0)'/>
                </div>
            }
        </div>
    );
};

export default InputSearchTextbox;