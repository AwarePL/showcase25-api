import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import { petData } from '../src/data/petData'
import { PetService, OpenAPI, Pet, ApiError } from '../src/generated/api'
import { retry } from '../src/utils/retry'

/**
 * @describe Pet Endpoint
 * This test suite covers the CRUD (Create, Read, Update, Delete) operations for the /pet endpoint.
 * It ensures that pets can be added, retrieved, and deleted correctly using the auto-generated API client.
 */
describe('Pet Endpoint', () => {
  // This variable will hold the pet object created in the first test,
  // making it available for subsequent tests in this suite.
  let createdPet: Pet

  /**
   * @beforeAll
   * This hook runs once before all tests in this suite.
   * It sets up the global configuration for the auto-generated API client.
   */
  beforeAll(async () => {
    // Set the base URL for all API requests. It uses an environment variable.
    OpenAPI.BASE = `${process.env.API_BASE_URL}`
    // Set the API key required for authorization on certain endpoints.
    OpenAPI.HEADERS = {
      api_key: `${process.env.API_KEY}`,
    }
  })

  /**
   * @it should successfully add a new pet to the store
   * This test case verifies that a new pet can be created via a POST request.
   */
  it('should successfully add a new pet to the store', async () => {
    // Arrange: Prepare the data for the test.
    const newPetPayload = petData.newPet()

    // Act: Perform the action to be tested, in this case, calling the addPet service method.
    const response = await PetService.addPet({
      requestBody: newPetPayload,
    })
    createdPet = response as Pet

    // Assert: Verify that the outcome is as expected.
    expect(createdPet).toBeDefined()
    expect(createdPet.id).toBeTypeOf('number')
    expect(createdPet.name).toBe(newPetPayload.name)
    expect(createdPet.status).toBe(newPetPayload.status)
  })

  /**
   * @it should find the created pet by ID
   * This test case verifies that a pet can be retrieved by its ID after it has been created.
   * It uses a retry mechanism to handle potential API processing delays.
   */
  it('should find the created pet by ID', async () => {
    // Arrange: Ensure the pet was created in the previous test and its ID is available.
    expect(createdPet?.id, 'Pet must be created before running this test').toBeDefined()

    // Act: Attempt to fetch the pet using its ID, with a retry mechanism to handle API delays.
    const foundPet = await retry(() =>
      PetService.getPetById({
        petId: createdPet.id!,
      }),
    )

    // Assert: Check if the retrieved pet's data matches the created pet's data.
    expect(foundPet).toBeDefined()
    expect(foundPet.id).toBe(createdPet.id)
    expect(foundPet.name).toBe(createdPet.name)
  })

  /**
   * @it should throw a 404 error when finding a non-existent pet
   * This test case ensures that the API correctly handles requests for pets that do not exist
   * by returning a 404 Not Found error.
   */
  it('should throw a 404 error when finding a non-existent pet', async () => {
    // Arrange: Define an ID that is highly unlikely to exist.
    const nonExistentId = 999999999

    // Act & Assert: Expect the API call to be rejected with an ApiError and a status of 404.
    await expect(PetService.getPetById({ petId: nonExistentId })).rejects.toThrowError(ApiError)

    await expect(PetService.getPetById({ petId: nonExistentId })).rejects.toHaveProperty(
      'status',
      404,
    )
  })

  /**
   * @afterAll
   * This hook runs once after all tests in this suite have completed.
   * Its purpose is to clean up any resources created during the tests, such as the pet created earlier.
   */
  afterAll(async () => {
    if (createdPet?.id) {
      try {
        // Attempt to delete the pet that was created during the test run.
        await PetService.deletePet({
          petId: createdPet.id,
        })
        console.log(`Cleaned up pet with ID: ${createdPet.id}`)
      } catch (error) {
        // Log an error if the cleanup fails, but don't fail the test suite.
        console.error(`Failed to clean up pet with ID: ${createdPet.id}`, error)
      }
    }
  })
})
