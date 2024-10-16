expect.extend({
  toBeNumberOrNull(received: any) {
    const pass = typeof received === "number" || received === null;

    if (pass) {
      return {
        message: () => `expected ${received} not to be a number or null`,
        pass: true,
      };
    }

    return {
      message: () => `expected ${received} to be a number or null`,
      pass: false,
    };
  },
});
