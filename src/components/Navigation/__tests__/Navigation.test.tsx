import { describe, test, expect } from 'vitest';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from './../Navigation.tsx';

describe('Navigation component', () => {
    test('Navigation title shown', () => {
      render(<Navigation title='Navigation Bar' />);

      const nav: HTMLElement = screen.getByRole('navigation');
      expect(nav).toHaveTextContent('Navigation Bar');
    });

    test('Init settingsContainer is hidden', () => {
        render(<Navigation title='Navigation Bar' />);
        const settingsContainer: HTMLElement | null = screen.queryByTestId(new RegExp('.*settingsContainer.*', 'i'));
        expect(settingsContainer).toBeNull();
    });

    test('Click Settings to show settingsContainer and then click again to hide it', async () => {
       render(<Navigation title='Navigation Bar' />);
        const settings: any = screen.getByAltText('Settings Button Image');

        // Show
        await userEvent.click(settings);
        await waitFor(() => {
            expect(screen.getByTestId('settingsContainer').outerHTML).toMatch(new RegExp('.*Settings Placeholder.*', 'i'));
        });

        // Hide
        await userEvent.click(settings);
        await waitFor(() => {
            const settingsContainer = screen.queryByText(/.*Settings PlaceHolder.*/i);
            expect(settingsContainer).not.toBeInTheDocument();

        });
    });

    test('Click Settings to show settingsContainer and then click the window to hide', async () => {
       render(<Navigation title='Navigation Bar' />);
        const settings: any = screen.getByAltText('Settings Button Image');

        // Show
        await userEvent.click(settings);
        await waitFor(() => {
            expect(screen.getByTestId('settingsContainer').outerHTML).toMatch(new RegExp('.*Settings Placeholder.*', 'i'));
        });

        // Hide
        const w = window.addEventListener('click', function(e: Event) {});
        await userEvent.click(w);
        await waitFor(() => {
           const settingsContainer = screen.queryByText(/.*Settings Placeholder.*/i);
           expect(settingsContainer).toBeNull();
        });
    });

});