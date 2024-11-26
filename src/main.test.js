import { render, screen } from '@testing-library/react';
import { NavigationContainer } from '@react-navigation/native';
import Navigate from './main';

const MockApp = () => (
    <NavigationContainer>
        <Navigate />
    </NavigationContainer>
);

test('Verifica se a navegação entre as telas funciona', () => {
    render(<MockApp />);

    expect(screen.getByText(/Aproveite cada segundo/i)).toBeInTheDocument();

    fireEvent.press(screen.getByText(/Buscar/i));

    expect(screen.getByText(/Detalhes/i)).toBeInTheDocument();
});