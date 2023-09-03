import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import App from './App';

// Prueba de la página de inicio (LandingPage)
test('renders landing page', () => {
  render(<App />);
  const welcomeTitle = screen.getByText(/Welcome to Woof/i);
  expect(welcomeTitle).toBeInTheDocument();
});

// Prueba de la página de inicio (Home)
test('renders home page', () => {
  render(
    <MemoryRouter initialEntries={['/home']}>
      <Route path="/home">
        <App />
      </Route>
    </MemoryRouter>
  );
  const homeTitle = screen.getByText(/Welcome to Woof/i);
  expect(homeTitle).toBeInTheDocument();

  // Agrega más expectativas aquí para elementos clave de la página de inicio (Home)
});

// Prueba de la página de detalles del perro (DogDetail)
test('renders dog detail page', () => {
  const mockDogData = {
    id: 1,
    name: 'Buddy',
    // ...otros datos del perro
  };

  render(
    <MemoryRouter initialEntries={['/dogs/1']}>
      <Route path="/dogs/:id">
        <App />
      </Route>
    </MemoryRouter>
  );

  const dogName = screen.getByText(/Buddy/i);
  expect(dogName).toBeInTheDocument();

  // Agrega más expectativas aquí para elementos clave de la página de detalles del perro (DogDetail)
});

// Prueba de la barra de búsqueda (SearchBar)
test('searching for a dog', async () => {
  render(
    <MemoryRouter initialEntries={['/home']}>
      <Route path="/home">
        <App />
      </Route>
    </MemoryRouter>
  );
  
  const input = screen.getByPlaceholderText(/Search a dog.../i);
  const searchButton = screen.getByRole('button', { name: /search/i });

  fireEvent.change(input, { target: { value: 'Golden Retriever' } });
  fireEvent.click(searchButton);

  // Espera a que la búsqueda se complete y verifica los resultados
  await waitFor(() => {
    const searchResults = screen.getByText(/Results for Golden Retriever/i);
    expect(searchResults).toBeInTheDocument();
  });
});

// Prueba de la página "Acerca de" (About)
test('renders about page', () => {
  render(
    <MemoryRouter initialEntries={['/about']}>
      <Route path="/about">
        <App />
      </Route>
    </MemoryRouter>
  );
  const aboutHeader = screen.getByText(/About Us/i);
  expect(aboutHeader).toBeInTheDocument();

  // Agrega más expectativas aquí para elementos clave de la página "Acerca de" (About)
});
