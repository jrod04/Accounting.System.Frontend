import { type MouseEvent } from 'react';
import styles from './ButtonIcon.module.css';

interface iButtonIcon {
    icon: string;
    alt: string;
    title: string;
    ariaLabel: string;
    width: number;
    height: number;
    id?: string | number | undefined;
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
        id,
        value,
        textSide,
        addTextSpace,
        bgColor,
        cb_handlerClick
    } = buttonIconProps;

    const buttonIcon = <button aria-label={ariaLabel}
                               className={styles.btn}
                               data-id={id ? id : undefined}
                               style={{width: `${width}px`,
                                       height: `${height}px`,
                                       backgroundColor: bgColor ? bgColor : '',
                                       cursor: cb_handlerClick ? 'pointer' : 'default'}}
                               onClick={cb_handlerClick}>
        <img src={icon}
             alt={alt}
             title={title}
             data-id={id ? id : undefined}
             style={{width: `${width}px`,
                     height: `${height}px`}} />
    </button>;

    return(
        <div data-testid='buttonContainer' className={styles.buttonContainer}>
            <span data-testid='value'>
                {textSide === 'left' ? value : ''}
                {textSide === 'left' ? '\u00A0\u00A0' : ''}
            </span>
                   {buttonIcon}
            <span data-testid='value'>
                {textSide === 'right' ? '\u00A0\u00A0' : ''}
                {textSide === 'right' ? value : ''}
            </span>
        </div>);
};

export default ButtonIcon;