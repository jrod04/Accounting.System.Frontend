import styles from './ButtonIcon.module.css';

interface iButtonIcon {
    icon: string;
    alt: string;
    title: string;
    ariaLabel: string;
    width: number;
    height: number;
    bgColor?: string | undefined;
    handlerClick?: () => void | undefined;
};

const ButtonIcon = ({...buttonIconProps}: iButtonIcon) => {
    const {
        icon,
        alt,
        title,
        ariaLabel,
        width,
        height,
        bgColor,
        handlerClick
    } = buttonIconProps;
    const buttonIcon = <button aria-label={ariaLabel}
                               className={styles.buttonIcon}
                               style={{width: `${width}px`,
                                       height: `${height}px`,
                                       backgroundColor: bgColor ? bgColor : ''}}
                               onClick={handlerClick}>
        <img src={icon} alt={alt} title={title} />
    </button>;

    return(<>{buttonIcon}</>);
};

export default ButtonIcon;