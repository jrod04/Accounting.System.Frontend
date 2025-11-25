import { type MouseEvent } from 'react';
import { beforeEach, describe, test, expect, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import createUser from './../../../utils/createUser.tsx';
import SearchDateRange from './../SearchDateRange.tsx';

let user: any;
const cb_handlerClick = vi.fn((e: MouseEvent<HTMLButtonElement>) => {});
const cb_handlerCheckError = vi.fn((e: MouseEvent<HTMLButtonElement>, error: string) => {});;
let fromDate: HTMLInputElement, toDate: HTMLInputElement;

describe('Search Date Range component', () => {
    beforeEach(() => {
        user = createUser();
        cb_handlerClick.mockClear();
        cb_handlerCheckError.mockClear();

        render(<SearchDateRange cb_handlerClick={cb_handlerClick}
                                cb_handlerCheckError={cb_handlerCheckError} />);

        fromDate = screen.getByLabelText('fromDate');
        toDate = screen.getByLabelText('toDate');
    });

    test('Search date range component container displays', () => {
        const container = screen.getByRole('form', { name: 'Search Date Range Container' });
        expect(container).toBeInTheDocument();
    });

    test('Init from date with blank values', () => {
        const fromDate = screen.getByLabelText('fromDate');
        expect(fromDate.textContent).toBe('');
    });

    test('Init to date with blank values', () => {
        const toDate = screen.getByLabelText('toDate');
        expect(toDate.textContent).toBe('');
    });

    test('Enter fromDate that is after toDate, expect class fromDateError, most recent entry that causes the error', async () => {
        await user.type(toDate, '2024-12-01');
        await user.type(fromDate, '2025-01-01');

        expect(fromDate).toHaveAttribute(
            'class',
            expect.stringContaining('fromDateError')
        );
    });

    test('Enter toDate that is before fromDate, expect class toDateError', async () => {
        await user.type(fromDate, '2025-01-01');
        await user.type(toDate, '2024-12-01');

        expect(toDate).toHaveAttribute(
            'class',
            expect.stringContaining('toDateError')
        );
    });

    test('Test button and resulting styling', async () => {
        const button = screen.getByRole('button', { name: 'Search Date Range Button'});
        await user.type(fromDate, '2025-01-01');
        await user.type(toDate, '2024-12-01');
        await user.click(button);

        expect(toDate).toHaveAttribute(
            'class',
            expect.stringContaining('toDateError')
        );
    });
});