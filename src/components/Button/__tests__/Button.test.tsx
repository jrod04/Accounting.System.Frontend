import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import createUser from './../../../utils/createUser.tsx';
import userEventDefault from '@testing-library/user-event';
import Button from './../Button.tsx';

let handlerClick = vi.fn();
let user = createUser();

afterEach(() => {
    cleanup();
    handlerClick = vi.fn();
    user = createUser();
});

describe('Non-submit button component', () => {
    beforeEach(() => {
        render(<Button id='1' value='value' width={75} cb_handlerOperation={handlerClick} />);
    });

    test('Non-submit button displays', () => {
        const button: HTMLButtonElement = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    test('Non-submit button displays right id', () => {
        const button: HTMLButtonElement = screen.getByRole('button');
        expect(button).toHaveAttribute(
            'id',
            expect.stringContaining('1')
        );
    });

    test('Non-submit button displays displays right value', () => {
        const button: HTMLButtonElement = screen.getByRole('button');
        expect(button.textContent).toBe('value');
    });

    test('Non-submit button displays displays right settings', () => {
        const button: HTMLButtonElement = screen.getByRole('button');
        expect(button).toHaveAttribute(
            'style',
            expect.stringContaining('width: 75px')
        );
    });

    test('Non-submit button, function calls correctly', async () => {
        const button: HTMLButtonElement = screen.getByRole('button');
        await user.click(button);
        expect(handlerClick).toHaveBeenCalledTimes(1);
    });
});

describe('Submit button component', () => {
    beforeEach(() => {
        render(<Button input={true} id='1' value='value' width={75} cb_handlerOperation={handlerClick} />);
    });

    test('Submit button displays', () => {
        const button: HTMLInputElement = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    test('Submit button displays id', () => {
        const button: HTMLInputElement = screen.getByRole('button');
        expect(button).toHaveAttribute(
            'id',
            expect.stringContaining('1')
        );
    });

    test('Submit button displays value', () => {
       const button: HTMLInputElement = screen.getByRole('button');
       expect(button).toHaveAttribute(
           'value',
           expect.stringContaining('value')
       );
    });

    //TODO:  Submit button function calls correctly will need to be tested inside a form
});