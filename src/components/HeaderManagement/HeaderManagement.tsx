import React from 'react';
import styles from './HeaderManagement.module.css';

interface iHeaderManagement {
    selected: string
    bgColor: string;
    leftFirstBtn: {
        handler: () => void | undefined;
        img: React.ReactElement<React.ComponentPropsWithoutRef<'img'>> & {
            alt: string | undefined;
        };
    };
    leftSecondBtn: {
        handler: () => void | undefined;
        img: React.ReactElement<React.ComponentPropsWithoutRef<'img'>> & {
            alt: string | undefined;
        };
    };
    leftThirdBtn: {
        handler: () => void | undefined;
        img: React.ReactElement<React.ComponentPropsWithoutRef<'img'>> & {
            alt: string | undefined;
        };
    };
    leftFourthBtn: {
        handler: () => void | undefined;
        img: React.ReactElement<React.ComponentPropsWithoutRef<'img'>> & {
            alt: string | undefined;
        };
    }
    rightFirstBtn: {
        handler: () => void | undefined;
        img: React.ReactElement<React.ComponentPropsWithoutRef<'img'>> & {
            alt: string | undefined;
        };
    }
    rightSecondBtn: {
        handler: () => void | undefined;
        img: React.ReactElement<React.ComponentPropsWithoutRef<'img'>> & {
            alt: string | undefined;
        };
    }
    rightThirdBtn: {
        handler: () => void | undefined;
        img: React.ReactElement<React.ComponentPropsWithoutRef<'img'>> & {
            alt: string | undefined;
        };
    }
};

function HeaderManagement({...headerManagementInputs}: iHeaderManagement) {
    const {
        selected,
        bgColor,
        leftFirstBtn,
        leftSecondBtn,
        leftThirdBtn,
        leftFourthBtn,
        rightFirstBtn,
        rightSecondBtn,
        rightThirdBtn
    } = headerManagementInputs;
    return (
        <section className={styles.headerManagement} style={{backgroundColor: bgColor}}>
            <div className={styles.leftActions}>
                <button onClick={leftFirstBtn ? leftFirstBtn.handler : undefined}
                        className={leftFirstBtn ? styles.leftFirstBtn : styles.hide}
                        id='leftFirstBtn'
                        data-id-item={selected}
                        title={leftFirstBtn ? leftFirstBtn.img.alt : undefined} />
                {leftFirstBtn && leftFirstBtn.img}

                <button onClick={leftSecondBtn ? leftSecondBtn.handler : undefined}
                        className={leftSecondBtn ? styles.leftSecondBtn : styles.hide}
                        id='leftSecondBtn'
                        data-id-item={selected}
                        title={leftSecondBtn ? leftSecondBtn.img.alt : undefined} />
                {leftSecondBtn && leftSecondBtn.img}

                <button onClick={leftThirdBtn ? leftThirdBtn.handler : undefined}
                        className={leftThirdBtn ? styles.leftThirdBtn : styles.hide}
                        id='leftThirdBtn'
                        data-id-item={selected}
                        title={leftThirdBtn ? leftThirdBtn.img.alt : undefined} />
                {leftThirdBtn && leftThirdBtn.img}

                <button onClick={leftFourthBtn ? leftFourthBtn.handler : undefined}
                        className={leftFourthBtn ? styles.leftFourthBtn : styles.hide}
                        id='leftFourthBtn'
                        data-id-item={selected}
                        title={leftFourthBtn ? leftFourthBtn.img.alt : undefined} />
                {leftFourthBtn && leftFourthBtn.img}
            </div>
            <div className={styles.rightActions}>
                <button onClick={rightFirstBtn ? rightFirstBtn.handler : undefined}
                        className={rightFirstBtn ? styles.rightFirstBtn : styles.hide}
                        id='rightFirstBtn'
                        data-id-item={selected}
                        title={rightFirstBtn ? rightFirstBtn.img.alt : undefined} />
                {rightFirstBtn && rightFirstBtn.img}

                <button onClick={rightSecondBtn ? rightSecondBtn.handler : undefined}
                        className={rightSecondBtn ? styles.rightSecondBtn : styles.hide}
                        id='rightSecondBtn'
                        data-id-item={selected}
                        title={rightSecondBtn ? rightSecondBtn.img.alt : undefined} />
                {rightSecondBtn && rightSecondBtn.img}

                <button onClick={rightThirdBtn ? rightThirdBtn.handler : undefined}
                        className={rightThirdBtn ? styles.rightThirdBtn : styles.hide}
                        id='rightThirdBtn'
                        data-id-item={selected}
                        title={rightThirdBtn ? rightThirdBtn.img.alt : undefined} />
                {rightThirdBtn && rightThirdBtn.img}
            </div>
        </section>
    );
};

export default HeaderManagement;
