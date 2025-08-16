import { ofetch } from 'ofetch'

export const apiClient = ofetch.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    api_key: process.env.API_KEY || '',
  },
})
