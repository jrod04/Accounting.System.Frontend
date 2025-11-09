import { describe, expect, test } from 'vitest';
import { screen, render } from '@testing-library/react';
import Card from './../../Card/Card.tsx';

describe('Basic card', () => {
   test('Card is present', () => {
       render(<Card />);
       const card = screen.getByTestId('card');
       expect(card).toBeInTheDocument();
   });

    test('Card populates children (area)', () => {
        render(<Card area='Information' />);
        const area = screen.getByText('Information');
        expect(area).toBeInTheDocument();
    });
});