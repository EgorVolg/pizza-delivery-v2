import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { FilterIngredients } from "../FilterIngredients";

const mockIngredients = [
  { id: 1, name: "Tomato" },
  { id: 2, name: "Cheese" },
];

describe("FilterIngredients", () => {
  it("calls onToggle with ingredient id when list item clicked", () => {
    const onToggle = vi.fn();
    render(
      <FilterIngredients
        ingredients={mockIngredients}
        selected={[]}
        onToggle={onToggle}
      />
    );

    // 点击第一个 <li>
    fireEvent.click(screen.getByText("Tomato"));
    expect(onToggle).toHaveBeenCalledWith(1);
  });

  it("toggles open/close when button clicked", () => {
    render(
      <FilterIngredients
        ingredients={mockIngredients}
        selected={[]}
        onToggle={vi.fn()}
      />
    );

    const button = screen.getByText("+ Показать всё");
    fireEvent.click(button);
    expect(screen.getByText("Скрыть")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Скрыть"));
    expect(screen.getByText("+ Показать всё")).toBeInTheDocument();
  });
});
