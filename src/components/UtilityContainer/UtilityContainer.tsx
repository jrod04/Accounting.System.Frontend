import React from 'react';
import Backdrop from './../../components/Backdrop/Backdrop.tsx';
import styles from './UtilityContainer.module.css';

interface iUtilityContainer {
    label: string,
    width: number;
    height: number;
    inputContainers: React.ReactNode[];
    justifyContent: string;
    bgColor: string;
    border: string;
    backdrop: boolean;
};

const UtilityContainer = ({...utilitContainerInputs}: iUtilityContainer) => {
    const {
        label,
        width,
        height,
        inputContainers,
        justifyContent,
        bgColor,
        border,
        backdrop
    } = utilitContainerInputs;

    if (inputContainers.length <= 0) {
        throw new Error('inputContainers.length attribute must be greater than 0 to populate the UtilityContainer.');
    };

    const containers: React.ReactNode[] = inputContainers.map((container, index) => {
        return(
            <div className={styles.inputContainers}
                 key={`${label}-${index}`}
                 style={{justifyContent: justifyContent,
                         border: border}}>
                {container}
            </div>
        );
    });

    return(
        <section className={styles.container}
                 style={{width: width === 0 ? '100%' : `${width}px`,
                         height: height === 0 ? '100%' : `${height}px`,
                         justifyContent: justifyContent,
                         backgroundColor: bgColor,
                         border: border}}>
            <Backdrop backdrop={backdrop} loader={false}>
                {containers}
            </Backdrop>
        </section>
    );
};

export default UtilityContainer;
