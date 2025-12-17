import React from 'react';
import Backdrop from './../../components/Backdrop/Backdrop.tsx';
import styles from './UtilityContainer.module.css';

interface iUtilityContainer {
    ariaLabel: string,
    width: number;
    height: number;
    inputContainers: React.ReactNode[];
    justifyContent: string;
    bgColor: string;
    border: string;
    backdrop: boolean;
};

const UtilityContainer = ({...utilityContainerInputs}: iUtilityContainer) => {
    const {
        ariaLabel,
        width,
        height,
        inputContainers,
        justifyContent,
        bgColor,
        border,
        backdrop
    } = utilityContainerInputs;

    if (inputContainers.length <= 0) {
        throw new Error('inputContainers.length attribute must be greater than 0 to populate the UtilityContainer.');
    };

    const containers: React.ReactNode[] = inputContainers.map((container, index) => {
        return(
            <div className={styles.inputContainers}
                 key={`${ariaLabel}-${index}`}
                 style={{justifyContent: justifyContent}}>
                {container}
            </div>
        );
    });

    return(
        <section data-testid='Utility container'
                 className={styles.container}
                 style={{width: width === 0 ? '100%' : `${width}px`,
                         height: height === 0 ? '100%' : `${height}px`,
                         justifyContent: justifyContent,
                         border: border,
                         backgroundColor: bgColor}}>
            <Backdrop backdrop={backdrop} loader={false}>
                {containers}
            </Backdrop>
        </section>
    );
};

export default UtilityContainer;
