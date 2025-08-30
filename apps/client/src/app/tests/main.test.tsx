import { vi, describe, it, expect, beforeEach } from "vitest";
import React from "react";

const mockRender = vi.fn();
vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({ render: mockRender })),
}));

const mockStore = { getState: vi.fn(), dispatch: vi.fn() };
vi.mock("../store", () => ({ store: mockStore }));

vi.mock("../App", () => ({ default: () => <div>Mocked App</div> }));

describe("main.tsx", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>';
    mockRender.mockClear();
  });

  it("вызывает createRoot с <div id='root'> и рендерит App", async () => {
    await import("../main");

    const { createRoot } = await import("react-dom/client");

    expect(createRoot).toHaveBeenCalledWith(document.getElementById("root"));

    const [ui] = mockRender.mock.calls[0] as [React.ReactElement];

    expect(ui.type).toBe(React.StrictMode);
  });
});
