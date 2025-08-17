import { apiClient } from '../clients/apiClient'

export interface Pet {
  id: number
  name: string
  status: 'available' | 'pending' | 'sold'
}

export const petService = {
  addPet: async (pet: Pet, headers?: { cookie: string }) => {
    try {
      const response = await apiClient('/pet', {
        method: 'POST',
        body: pet,
        headers,
      })
      return response
    } catch (error) {
      console.error('Failed to add pet:', error)
      throw error
    }
  },

  getPetById: async (id: number, headers?: { cookie: string }) => {
    try {
      const response = await apiClient(`/pet/${id}`, {
        method: 'GET',
        headers,
      })
      return response
    } catch (error) {
      console.error(`Failed to get pet with ID ${id}:`, error)
      throw error
    }
  },

  deletePet: async (id: number, headers?: { cookie: string }) => {
    try {
      const response = await apiClient(`/pet/${id}`, { method: 'DELETE', headers })
      return response
    } catch (error) {
      console.error(`Failed to delete pet with ID ${id}:`, error)
      throw error
    }
  },
}
