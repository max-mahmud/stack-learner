import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe("BUTTON TEST", () => {

  it(" initial color 1", () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /blue/i })
    expect(button).toHaveStyle('background-color: red')
  })

  it(" initial text 2", () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /blue/i })
    expect(button).toHaveTextContent('Change to Blue')
  })

  it(" color chnage when clicked 3", () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /blue/i })
    fireEvent.click(button)
    expect(button).toHaveStyle('background-color: blue')
  })
})

describe("Async TEST", () => {

  it("data wait 4", async () => {
    render(<App />)
    const txt = screen.getByTestId('mytest')
    await waitFor(() => expect(txt).toHaveTextContent("newText"), { timeout: 2000 });
  })


})

