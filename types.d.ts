import "@jest/globals";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeNumberOrNull(): R;
    }
  }
}

export {};
