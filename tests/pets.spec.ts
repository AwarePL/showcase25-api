import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import { petService } from '../src/services/pet'
import { petData } from '../src/data/petData'
import { getAuthSession } from '../src/utils/auth'
import { FetchError } from 'ofetch'

describe('Pet Endpoint', () => {
  let createdPetId: number
  let createdPetName: string
  let authHeaders: { cookie: string }

  // Run login once before all tests in this suite
  beforeAll(async () => {
    const jsessionid = await getAuthSession()
    authHeaders = { cookie: jsessionid }
  })

  it('should successfully add a new pet to the store', async () => {
    // Arrange
    const newPetPayload = petData.newPet()
    createdPetName = newPetPayload.name

    // Act
    const createdPet = await petService.addPet(newPetPayload, authHeaders)

    // Assert
    expect(createdPet).toBeDefined()
    expect(createdPet.id).toBeTypeOf('number')
    expect(createdPet.name).toBe(newPetPayload.name)
    expect(createdPet.status).toBe(newPetPayload.status)

    // Store the ID for subsequent tests
    createdPetId = createdPet.id
  })

  it('should find the created pet by ID', async () => {
    // Skip this test if pet wasn't created
    if (!createdPetId) {
      throw new Error('Previous test failed to create pet')
    }

    // Act
    const foundPet = await petService.getPetById(createdPetId, authHeaders)

    // Assert
    expect(foundPet).toBeDefined()
    expect(foundPet.id).toBe(createdPetId)
    expect(foundPet.name).toBe(createdPetName)
  })

  it('should throw a 404 error when finding a non-existent pet', async () => {
    // Arrange
    const nonExistentId = 999999999

    // Act & Assert
    await expect(petService.getPetById(nonExistentId, authHeaders)).rejects.toThrowError(FetchError)
  })

  afterAll(async () => {
    if (createdPetId) {
      // Use auth headers for the cleanup call as well
      await petService.deletePet(createdPetId, authHeaders)
      console.log(`Cleaned up pet with ID: ${createdPetId}`)
    }
  })
})
