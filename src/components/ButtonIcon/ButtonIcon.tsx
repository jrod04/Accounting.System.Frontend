import { type MouseEvent } from 'react';
import styles from './ButtonIcon.module.css';

interface iButtonIcon {
    icon: string;
    alt: string;
    title: string;
    ariaLabel: string;
    width: number;
    height: number;
    value?: string | undefined;
    textSide?: string | undefined;
    addTextSpace?: string | undefined;
    bgColor?: string | undefined;
    cb_handlerClick?: (e: MouseEvent<HTMLButtonElement>) => void | undefined;
};

const ButtonIcon = ({...buttonIconProps}: iButtonIcon) => {
    const {
        icon,
        alt,
        title,
        ariaLabel,
        width,
        height,
        value,
        textSide,
        addTextSpace,
        bgColor,
        cb_handlerClick
    } = buttonIconProps;

    const buttonIcon = <button aria-label={ariaLabel}
                               className={styles.btn}
                               style={{width: `${width}px`,
                                       height: `${height}px`,
                                       backgroundColor: bgColor ? bgColor : '',
                                       cursor: cb_handlerClick ? 'pointer' : 'default'}}
                               onClick={cb_handlerClick}>
        <img src={icon}
             alt={alt}
             title={title}
             style={{width: `${width}px`,
                     height: `${height}px`}} />
    </button>;

    return(
        <div data-testid='buttonContainer' className={styles.buttonContainer}>
            <span data-testid='value'>
                {value}{textSide === 'left' ? '\u00A0\u00A0' : ''}
            </span>
                   {buttonIcon}
                {addTextSpace === 'right' ? '\u00A0\u00A0' : ''}
            <span data-testid='value'>
                {textSide === 'left' ? '\u00A0\u00A0' : ''}{value}
            </span>
        </div>);
};

export default ButtonIcon;