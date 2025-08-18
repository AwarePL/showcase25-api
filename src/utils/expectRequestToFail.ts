import { expect } from 'vitest'
import { ofetch, FetchError } from 'ofetch'

/**
 * @description A reusable test utility to make a request that is expected to fail.
 * It provides detailed error messages upon failure.
 * @param fullUrl The complete URL for the API request.
 * @param method The HTTP method to use (e.g., 'GET', 'POST').
 * @param expectedStatusCodes An array of status codes that are considered a valid failure.
 */
export const expectRequestToFail = async (
  fullUrl: string,
  method: string,
  expectedStatusCodes: number[],
) => {
  try {
    await ofetch(fullUrl, { method: method.toUpperCase(), retry: 0 })
    // If the request succeeds when it should have failed, we explicitly fail the test.
    throw new Error(
      `Request for ${method} at ${fullUrl} should have failed but succeeded with a 2xx status.`,
    )
  } catch (error: unknown) {
    if (error instanceof FetchError) {
      // Provide a detailed message in the assertion. This helps diagnose issues like receiving a 500 error.
      const message = `Expected status to be one of [${expectedStatusCodes}] for ${method} ${fullUrl}, but received ${error.status}.`
      expect(expectedStatusCodes, message).toContain(error.status)
    } else {
      // If the error is not a FetchError (e.g., the success error thrown above), re-throw it.
      throw error
    }
  }
}
