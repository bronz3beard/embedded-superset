// We can disable the assertions during runtime in release mode, if they are ever expensive (not important atm)
export function assertIsTrue(condition: boolean, errorMessage?: string): asserts condition {
  if (!condition) {
    throw new Error(errorMessage ?? 'Assertion failed');
  }
}
