/* @jest-environment jsdom */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './Home'
import store from '@src/mock-data/redux-store'
import renderer from 'react-test-renderer'

describe('Home', () => {
  it('renders the header and footer', () => {
    const comp = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    )
    expect(comp.toJSON()).toMatchSnapshot()
    // const header = screen.getByTestId('header-component');
    // const footer = screen.getByTestId('footer-component');
    // expect(header).toBeInTheDocument();
    // expect(footer).toBeInTheDocument();
  })

  it('renders the dashboard by default', () => {
    // const comp = renderer.create(
    //     <Provider store={store}>
    //       <MemoryRouter initialEntries={["/"]}>
    //         <Home />
    //       </MemoryRouter>
    //     </Provider>
    //   );
    //   expect(comp.toJSON()).toMatchSnapshot();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Home />
        </MemoryRouter>
      </Provider>
    )
    const dashboard = screen.getByTestId('dashboard-component')
    expect(dashboard).toBeInTheDocument()
  })

  xit('renders the manage trip page when the route is /manage-trip', () => {
    // const comp = renderer.create(
    //     <Provider store={store}>
    //       <MemoryRouter initialEntries={["/"]}>
    //         <Home />
    //       </MemoryRouter>
    //     </Provider>
    //   );
    // expect(comp.toJSON()).toMatchSnapshot();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/manage-trip']}>
          <Home />
        </MemoryRouter>
      </Provider>
    )
    const manageTrip = screen.getByTestId('manage-trip-component')
    expect(manageTrip).toBeInTheDocument()
  })

  xit('toggles the dialog when the openDialog function is called', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    )
    const button = screen.getByTestId('toggle-button')
    const dialog = screen.getByTestId('dialog-component')
    expect(dialog).not.toBeVisible()
    button.click()
    expect(dialog).toBeVisible()
    button.click()
    expect(dialog).not.toBeVisible()
  })
})
