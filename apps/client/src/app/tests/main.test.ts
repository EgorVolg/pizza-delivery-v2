import { vi, describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";

const mockRender = vi.fn();
vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({ render: mockRender })),
}));

const mockStore = { getState: vi.fn(), dispatch: vi.fn() };
vi.mock("./store", () => ({ store: mockStore }));

vi.mock("./App", () => ({ default: () => <div>Mocked App</div> }));

describe("main.tsx", () => {
  it("рендерит App внутри Provider и StrictMode", async () => {
    // создаём временный root в jsdom
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    await import("../main");

    const [rootArg, ui] = mockRender.mock.calls[0] as [
      Element,
      React.ReactElement
    ];

    expect(rootArg).toBe(root);

    const { container } = render(ui);
    expect(container.innerHTML).toContain("Mocked App");
  });
});
