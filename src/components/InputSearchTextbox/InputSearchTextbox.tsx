import { useState, useRef, useEffect, type MouseEvent, type ChangeEvent, type FocusEvent, type RefObject } from 'react';
import ButtonIcon from './../ButtonIcon/ButtonIcon.tsx';
import MagnifyingGlass from './../../assets/magnifyingGlass.svg';
import styles from './InputSearchTextbox.module.css';

type tDropdownValues = {
    id: string,
    value: string
};

interface iInputSearchTextbox {
    ariaLabel: string;
    showImage: boolean;
    searchValue: string;
    errors: string;
    ref?: RefObject<HTMLInputElement | null> | undefined;
    dropdownValues?: tDropdownValues[] | undefined;
    dropdownHeight?: number | undefined;
    dropdownWidth?: number | undefined;
    textboxWidth?: number | undefined;
    textboxHeight?: number | undefined;
    iconWidth? : number | undefined;
    iconHeight? : number | undefined;
    cb_handlerOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    cb_handlerOnFocus: (e: FocusEvent<HTMLInputElement>) => void;
    cb_handlerOnBlur: (e: FocusEvent<HTMLInputElement>) => void;
    cb_handlerSetSearchValue?: (searchValue: string) => void | undefined;
};

const InputSearchTextbox = ({...inputSearchTextboxInputs}: iInputSearchTextbox) => {
    const {
        ariaLabel,
        errors,
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
        cb_handlerOnFocus,
        cb_handlerSetSearchValue
    } = inputSearchTextboxInputs;

    const [openDropdown, setOpenDropdown] = useState<boolean>(false);

    const finalIconWidth = iconWidth ? iconWidth : 0;
    const finalIconHeight = iconHeight ? iconHeight : 0;

    const handlerOnFocus = (e: FocusEvent<HTMLInputElement>) => {
        setOpenDropdown(true);
        cb_handlerOnFocus(e);
    };

    const handlerOnBlur = (e: FocusEvent<HTMLInputElement>) => {
        const clickedElement = e.relatedTarget;
        if (clickedElement) {
            if (dropdownValues?.filter(value => value.value === clickedElement.textContent).length ?? 0 > 0) {
                if (cb_handlerSetSearchValue) cb_handlerSetSearchValue(clickedElement.textContent);
                setOpenDropdown(false);
                return;
            };
        };
        setOpenDropdown(false);
        cb_handlerOnBlur(e);
    };

    const handlerClickDropdown = (e: MouseEvent<HTMLButtonElement>) => {
        if (cb_handlerSetSearchValue) cb_handlerSetSearchValue(searchValue);
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
        <section data-testid='Input search textbox container' className={styles.outerContainer}>
            <div className={styles.innerContainer}>
                <div className={styles.outerInputContainer}>
                    <div className={styles.innerInputContainer}>
                        <input name='inputSearchTextbox'
                               className={styles.input}
                               style={{width: textboxWidth ? `${textboxWidth}px` : '',
                                       height: textboxHeight ? `${textboxHeight}px` : '',
                                       zIndex: '2',
                                       color: ['Search...', 'Search for account...'].includes(searchValue) ? 'rgba(0,0,0,0.2)' :
                                                                                                             'rgba(0,0,0,1)'}}
                               aria-label={ariaLabel}
                               type='textbox'
                               onChange={cb_handlerOnChange}
                               onFocus={handlerOnFocus}
                               onBlur={handlerOnBlur}
                               value={searchValue}
                               ref={ref}
                               autoComplete='off' />
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
                <div data-testid='errorContainer'
                     className={styles.errors}
                     style={{color: 'rgba(199,0,57,1)'}}>
                     {errors}
                </div>
            </div>
        </section>
    );
};

export default InputSearchTextbox;
