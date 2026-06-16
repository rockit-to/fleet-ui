import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePricing } from "../hooks/usePricing";

const baseProps = {
  basePrice: 100,
  nights: 7,
  cleaningFee: 50,
  serviceFeePercentage: 12.3,
  taxPercentage: 8.5,
  discountPercentage: 10,
};

describe("usePricing", () => {
  it("calculates subtotal as basePrice * nights", () => {
    const { result } = renderHook(() => usePricing(baseProps));
    expect(result.current.subtotal).toBe(700);
  });

  it("applies discount correctly", () => {
    const { result } = renderHook(() => usePricing(baseProps));
    expect(result.current.discount).toBe(70);
  });

  it("includes cleaning fee in total", () => {
    const { result } = renderHook(() =>
      usePricing({ ...baseProps, nights: 1, discountPercentage: 0, serviceFeePercentage: 0, taxPercentage: 0 })
    );
    expect(result.current.total).toBe(baseProps.basePrice + baseProps.cleaningFee);
  });

  it("returns zero discount when discountPercentage is 0", () => {
    const { result } = renderHook(() => usePricing({ ...baseProps, discountPercentage: 0 }));
    expect(result.current.discount).toBe(0);
  });

  it("does not produce a negative total", () => {
    const { result } = renderHook(() => usePricing({ ...baseProps, discountPercentage: 0 }));
    expect(result.current.total).toBeGreaterThan(0);
  });
});
