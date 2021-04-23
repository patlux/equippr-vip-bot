export function assert(condition: unknown, msg: string): asserts condition {
  if (!condition) {
    throw new Error(msg);
  }
}

export function assertError(condition: unknown, createError: () => Error): asserts condition {
  if (!condition) {
    throw createError();
  }
}
