import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Button from './../Button.tsx';

const commonTests = (button: HTMLButtonElement) => {
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute(
        'id',
        expect.stringContaining('1')
    );
    expect(button).toHaveAttribute(
        'style',
        expect.stringContaining('width: 75px')
    );
};

describe('Gray button components', () => {
    test('Non-submit button', async () => {
        const handlerClick = vi.fn();
        render(<Button id='1' value='value' width={75} cb_handlerOperation={handlerClick} />);

        const button = screen.getByRole('button') as HTMLButtonElement;
        commonTests(button);

        const value = screen.getByText('value');
        expect(value).toBeInTheDocument();

        await userEvent.click(button);
        expect(handlerClick).toHaveBeenCalledTimes(1);
    });

    test('Submit button', async () => {
        render(<Button input={true} id='1' value='value' width={75} />);

        const button = screen.getByRole('button') as HTMLButtonElement;
        commonTests(button);

        expect(button).toHaveAttribute(
            'type',
            expect.stringContaining('submit')
        );

        expect(button).toHaveAttribute(
            'value',
            expect.stringContaining('value')
        );
        // fireEvent tests will be in integrated forms
    });
});
