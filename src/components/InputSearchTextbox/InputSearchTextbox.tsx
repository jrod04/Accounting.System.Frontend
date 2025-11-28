import { useState, useRef, useEffect, type ChangeEvent, type FocusEvent, type RefObject } from 'react';
import ButtonIcon from './../ButtonIcon/ButtonIcon.tsx';
import MagnifyingGlass from './../../assets/magnifyingGlass.svg';
import styles from './InputSearchTextbox.module.css';

interface iInputSearchTextbox {
    ariaLabel: string;
    showImage: boolean;
    searchValue: string;
    ref: RefObject<HTMLInputElement | null>;
    textboxWidth?: number | undefined;
    textboxHeight?: number | undefined;
    iconWidth? : number | undefined;
    iconHeight? : number | undefined;
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
        ref,
        cb_handlerOnChange,
        cb_handlerOnBlur,
        cb_handlerOnFocus
    } = inputSearchTextboxInputs;

    return(
        <div data-testid='Input search textbox container' className={styles.container}>
            <input className={styles.input}
                   style={{width: textboxWidth ? `${textboxWidth}px` : '',
                           height: textboxHeight ? `${textboxHeight}px` : '',
                           zIndex: '2',
                           color: ['Search...', 'Search for account...'].includes(searchValue) ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,1)'}}
                   aria-label={ariaLabel}
                   type='textbox'
                   onChange={cb_handlerOnChange}
                   onFocus={cb_handlerOnFocus}
                   onBlur={cb_handlerOnBlur}
                   value={searchValue}
                   ref={ref} />
            {showImage &&
                <div className={styles.btn}>
                    <ButtonIcon ariaLabel='Input Search Textbox'
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