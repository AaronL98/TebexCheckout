import { describe, it, expect } from "vitest";

import { formatCurrency, formatCurrencyShort } from "../formatCurrency";

describe("formatCurrency helper functions", () => {
    it("should format currency correctly", () => {
        expect(formatCurrency(100)).toBe("100.00 USD");
        expect(formatCurrency(100.1)).toBe("100.10 USD");
        expect(formatCurrency(100.123)).toBe("100.12 USD");
    });

    it("should format currency in a short format correctly", () => {
        expect(formatCurrencyShort(100)).toBe("$100.00");
        expect(formatCurrencyShort(100.1)).toBe("$100.10");
        expect(formatCurrencyShort(100.123)).toBe("$100.12");
    });
});
