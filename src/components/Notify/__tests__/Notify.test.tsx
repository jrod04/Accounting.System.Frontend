import { beforeEach, afterEach, describe, test, expect, vi } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react'
import createUser from './../../../utils/createUser.tsx';
import Notify from './../Notify.tsx';

let handlerClick: () => void | undefined;
let rerender: any;
let notify: HTMLElement | undefined;

beforeEach(() => {
    handlerClick = vi.fn();
    const renderResult = render(<Notify stat='success' message='Success' cb_handlerCloseNotify={handlerClick} />)
    rerender = renderResult.rerender;
    notify = screen.getByTestId('notify');
});

afterEach(() => {
    cleanup();
    handlerClick = vi.fn();
});

describe('Notify component', () => {
    test('Notify is present', () => {
        expect(notify).toBeInTheDocument();
    });

    test('Notify with notify class', () => {
        expect(notify).toHaveAttribute(
            'class',
            expect.stringContaining('notify')
        );
    });

    test('Notify with message shown', () => {
        const message: HTMLElement = screen.getByText('Success');
        expect(message).toBeInTheDocument();
    });

    test('Notify with success color', () => {
        expect(notify).toHaveAttribute(
            'style',
            expect.stringContaining(`background-color: rgb(102, 153, 0)`)
        );
    });

    test('Notify with warn color', () => {
        rerender(<Notify stat='warn' message='Warn' cb_handlerCloseNotify={handlerClick}/>);
        const notify: HTMLElement = screen.getByTestId('notify');
        expect(notify).toHaveAttribute(
            'style',
            expect.stringContaining('background-color: rgb(255, 255, 153)')
        );
    });

    test('Notify with fail color', () => {
        rerender(<Notify stat='fail' message='Fail' cb_handlerCloseNotify={handlerClick} />);
        const notify: HTMLElement = screen.getByTestId('notify');
        expect(notify).toHaveAttribute(
            'style',
            expect.stringContaining('background-color: rgb(199, 0, 57)')
        );
    });

    test('Test cb_handlerCloseNotify', async () => {
        const user: any = createUser();
        const close: HTMLButtonElement = screen.getByRole('button');
        await user.click(close);
        expect(handlerClick).toHaveBeenCalledTimes(1);
    });
});