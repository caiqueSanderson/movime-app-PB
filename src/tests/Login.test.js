import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

describe("Login Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

  test("renders login form correctly", () => {
    renderComponent();

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Insira seu token")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Insira sua API Key")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Entrar/i })).toBeInTheDocument();
  });

  test("shows error message when fields are empty", () => {
    renderComponent();

    const button = screen.getByRole("button", { name: /Entrar/i });
    fireEvent.click(button);

    expect(screen.getByText("Por favor, preencha todos os campos!")).toBeInTheDocument();
  });

  test("saves token and API key to localStorage on success", () => {
    renderComponent();

    const tokenInput = screen.getByPlaceholderText("Insira seu token");
    const apiKeyInput = screen.getByPlaceholderText("Insira sua API Key");
    const button = screen.getByRole("button", { name: /Entrar/i });

    fireEvent.change(tokenInput, { target: { value: "testToken" } });
    fireEvent.change(apiKeyInput, { target: { value: "testApiKey" } });

    fireEvent.click(button);

    expect(localStorage.getItem("@VITE_PRIVATE_TOKEN")).toBe("testToken");
    expect(localStorage.getItem("@VITE_PRIVATE_API_KEY")).toBe("testApiKey");
  });
});
