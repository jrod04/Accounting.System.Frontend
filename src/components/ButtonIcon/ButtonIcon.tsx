import styles from './ButtonIcon.module.css';

interface iButtonIcon {
    icon: string;
    alt: string;
    title: string;
    ariaLabel: string;
    width: number;
    height: number;
    value?: string | undefined;
    bgColor?: string | undefined;
    cb_handlerClick?: () => void | undefined;
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
        bgColor,
        cb_handlerClick
    } = buttonIconProps;
    const buttonIcon = <button aria-label={ariaLabel}
                               className={styles.buttonIcon}
                               style={{width: `${width}px`,
                                       height: `${height}px`,
                                       backgroundColor: bgColor ? bgColor : ''}}
                               onClick={cb_handlerClick}>
        <img src={icon} alt={alt} title={title} />
    </button>;

    return(<div className={styles.buttonContainer}>{buttonIcon}&nbsp;&nbsp;{value}</div>);
};

export default ButtonIcon;