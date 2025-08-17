import { ofetch } from 'ofetch'

/**
 * Logs into the PetStore to get an auth session cookie.
 * Note: The target login endpoint is part of the UI, not the API,
 * so we use a separate ofetch instance.
 * @returns The JSESSIONID cookie string.
 */
export const getAuthSession = async (): Promise<string> => {
  const response = await ofetch.raw(`${process.env.API_AUTH_URL}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: `username=${process.env.API_USERNAME}&password=${process.env.API_PASSWORD}&login=`,
  })

  const setCookieHeader = response.headers.get('set-cookie')
  if (!setCookieHeader) {
    throw new Error('Could not get session cookie from login response.')
  }

  // Extract the JSESSIONID from the 'set-cookie' header
  const jsessionid = setCookieHeader.split(';').find((c) => c.trim().startsWith('JSESSIONID='))

  if (!jsessionid) {
    throw new Error('JSESSIONID not found in set-cookie header.')
  }

  return jsessionid
}
