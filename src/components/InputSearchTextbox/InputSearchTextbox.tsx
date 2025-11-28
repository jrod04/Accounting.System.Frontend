import { useState, useRef, useEffect, type ChangeEvent, type FocusEvent, type RefObject } from 'react';
import ButtonIcon from './../ButtonIcon/ButtonIcon.tsx';
import MagnifyingGlass from './../../assets/magnifyingGlass.svg';
import styles from './InputSearchTextbox.module.css';

interface iInputSearchTextbox {
    ariaLabel: string;
    showImage: boolean;
    searchValue: string;
    ref: RefObject<HTMLInputElement | null>;
    dropdownValues?: string[] | undefined;
    dropdownHeight?: number | undefined;
    dropdownWidth?: number | undefined;
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
        dropdownValues,
        dropdownHeight,
        dropdownWidth,
        ref,
        cb_handlerOnChange,
        cb_handlerOnBlur,
        cb_handlerOnFocus
    } = inputSearchTextboxInputs;

    const finalIconWidth = iconWidth ? iconWidth : 0;
    const finalIconHeight = iconHeight ? iconHeight : 0;

    const dropdown = dropdownValues?.map((value, index) => (
        <button key={`${value}-${index}`} className={styles.dropdownButton}>
            {value}
        </button>
    ));

    return(
        <div data-testid='Input search textbox container' className={styles.container}>
            <div className={styles.inputContainer}>
                <input name='inputSearchTextbox'
                       className={styles.input}
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
                <div className={styles.dropdown}
                     style={{width: dropdownWidth ? `${dropdownWidth}px` : '',
                             height: dropdownHeight ? `${dropdownHeight}px` : ''}}>
                    {dropdown}
                </div>
            </div>
            {showImage &&
                <div className={styles.btn}>
                    <ButtonIcon ariaLabel='Input Search Textbox'
                                alt='Search Button Icon'
                                title='Search Button Icon'
                                icon={MagnifyingGlass}
                                width={finalIconWidth}
                                height={finalIconHeight}
                                value=''
                                bgColor='rgba(0,0,0,0)'/>
                </div>
            }
        </div>
    );
};

export default InputSearchTextbox;