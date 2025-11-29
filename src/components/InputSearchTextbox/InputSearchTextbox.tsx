import { useState, useRef, useEffect, type MouseEvent, type ChangeEvent, type FocusEvent, type RefObject } from 'react';
import ButtonIcon from './../ButtonIcon/ButtonIcon.tsx';
import MagnifyingGlass from './../../assets/magnifyingGlass.svg';
import styles from './InputSearchTextbox.module.css';

type tDropdownValues = {
    id: string | number,
    value: string
};

interface iInputSearchTextbox {
    ariaLabel: string;
    showImage: boolean;
    searchValue: string;
    ref?: RefObject<HTMLInputElement | null> | undefined;
    dropdownValues?: tDropdownValues[] | undefined;
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

    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    const finalIconWidth = iconWidth ? iconWidth : 0;
    const finalIconHeight = iconHeight ? iconHeight : 0;

    const handlerOnFocus = (e: ChangeEvent<HTMLInputElement>) => {
        setOpenDropdown(true);
        cb_handlerOnFocus(e);
    };

    const handlerOnBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const clickedElement = e.relatedTarget;
        if (clickedElement) {
            if (dropdownValues.filter(value => value.value === clickedElement.textContent).length > 0) {
                handlerClickDropdown
                return;
            };
        };
        setOpenDropdown(false);
        cb_handlerOnBlur(e);
    };

    const handlerClickDropdown = (e: MouseEvent<HTMLButtonElement>) => {
        cb_handlerOnChange(e);
        setOpenDropdown(false);
    };

    const dropdownPopulation = dropdownValues?.map(value => (
        <button key={`inputSearchTextbox-${value.id}`}
                id={value.id}
                className={styles.dropdownButton}
                value={value.value}
                onClick={handlerClickDropdown}>
            {value.value}
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
                       onFocus={handlerOnFocus}
                       onBlur={handlerOnBlur}
                       value={searchValue}
                       ref={ref} />
                {openDropdown &&
                    <div className={styles.dropdown}
                         style={{width: dropdownWidth ? `${dropdownWidth}px` : '',
                                 height: dropdownHeight ? `${dropdownHeight}px` : ''}}>
                        {dropdownPopulation}
                </div>
                }
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
