/**
 * A utility function to retry an async operation a specified number of times.
 * This is useful for handling transient errors or race conditions in tests.
 * @param fn The async function to execute.
 * @param retries The number of times to retry before failing. Default is 3.
 * @param delay The delay in milliseconds between retries. Default is 1000ms.
 * @returns A promise that resolves with the result of the async function if it succeeds.
 * @throws Throws the last error received if all retries fail.
 */
export const retry = async <T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> => {
  try {
    // Attempt to execute the function
    return await fn()
  } catch (error) {
    // If it fails and there are retries left, wait and then try again.
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay))
      return retry(fn, retries - 1, delay)
    }
    // If no retries are left, throw the last caught error.
    throw error
  }
}
