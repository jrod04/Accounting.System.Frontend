import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import createUser from './../../../utils/createUser.tsx';
import userEventDefault from '@testing-library/user-event';
import Button from './../Button.tsx';

let handlerClick = vi.fn();
let user = createUser();

afterEach(() => {
    handlerClick.mockClear();
    user = createUser();
});

describe('Non-submit button component', () => {
    let rerender: any;

    beforeEach(() => {
        const renderResult = render(<Button id='1' value='value' width={75} cb_handlerOperation={handlerClick} bgColor='rgba(0,0,0,1) '/>);
        rerender = renderResult.rerender;
    });

    test('Non-submit button displays', () => {
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    test('Non-submit button displays given color', () => {
       const button = screen.getByRole('button');
       expect(button).toHaveStyle({
           backgroundColor: 'rgba(0,0,0,1)'
       });
    });

    test('Non-submit button displays default color', () => {
        rerender(<Button id='1' value='value' width={75} cb_handlerOperation={handlerClick} />);
        const button = screen.getByRole('button');
        expect(button).toHaveStyle({
            backgroundColor: 'rgba(217,215,205,1)'
        });
    });

    test('Non-submit button displays right id', () => {
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute(
            'id',
            expect.stringContaining('1')
        );
    });

    test('Non-submit button displays displays right value', () => {
        const button = screen.getByRole('button');
        expect(button.textContent).toBe('value');
    });

    test('Non-submit button displays displays right settings', () => {
        const button = screen.getByRole('button');
        expect(button).toHaveStyle({
            width: '75px'
        });
    });

    test('Non-submit button, function calls correctly', async () => {
        const button = screen.getByRole('button');
        await user.click(button);
        expect(handlerClick).toHaveBeenCalledTimes(1);
    });
});

describe('Submit button component', () => {
    let rerender: any;
    beforeEach(() => {
        const renderResult = render(<Button input={true} id='1' value='value' width={75} cb_handlerOperation={handlerClick} bgColor='rgba(0,0,0,1)' />);
        rerender = renderResult.rerender;
    });

    test('Submit button displays', () => {
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    test('Non-submit button displays given color', () => {
       const button = screen.getByRole('button');
       expect(button).toHaveStyle({
           backgroundColor: 'rgba(0,0,0,1)'
       });
    });

    test('Non-submit button displays default color', () => {
        rerender(<Button id='1' value='value' width={75} cb_handlerOperation={handlerClick} />);
        const button = screen.getByRole('button');
        expect(button).toHaveStyle({
            backgroundColor: 'rgba(217,215,205,1)'
        });
    });

    test('Submit button displays id', () => {
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute(
            'id',
            expect.stringContaining('1')
        );
    });

    test('Submit button displays value', () => {
        const button = screen.getByRole('button');
        expect(button.textContent).toBe('value');
    });

    //TODO:  Submit button function calls correctly will need to be tested inside a form
});