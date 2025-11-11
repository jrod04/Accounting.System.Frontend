import { describe, expect, test } from 'vitest';
import { screen, render } from '@testing-library/react';
import Backdrop from './../Backdrop.tsx';

describe('Standard semi-opaque backdrop', () => {
    test('backdrop is present without the loader', () => {
        render(<Backdrop backdrop={true} loader={false} />);

        const backdrop: HTMLElement = screen.getByTestId('backdrop');
        expect(backdrop).toBeInTheDocument();

        const loader: HTMLElement | null = screen.queryByTestId('loader');
        expect(loader).toHaveClass(/.+hide.+/i);
    });

    test('backdrop is present with the loader', () => {
       render(<Backdrop backdrop={true} loader={true} />);

       const backdrop: HTMLElement = screen.getByTestId('backdrop');
       expect(backdrop).toBeInTheDocument();

       const loader: HTMLElement = screen.getByTestId('loader');
       expect(loader).toBeInTheDocument();
    });

    test('backdrop is not present', () => {
       render(<Backdrop backdrop={false} loader={false} />);

       const backdrop: HTMLElement | null = screen.queryByTestId('backdrop');
       expect(backdrop).toBeNull();
    });

    test('backdrop is present with children, loader hidden div is inconsequential', () => {
        render(<Backdrop backdrop={true} loader={false}>Children</Backdrop>);

        const children: HTMLElement = screen.getByText('Children');
        expect(children).toBeInTheDocument();
        expect(children.textContent).toBe('Children');
    });
});