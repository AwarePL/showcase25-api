import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import { UserService, OpenAPI, User, ApiError } from '../src/generated/api/index.js'
import { userData } from '../src/data/userData.js'
import { retry } from '../src/utils/retry.js'

/**
 * @describe User Endpoint
 * This test suite covers the full lifecycle of a user resource.
 */
describe('User Endpoint', () => {
  let createdUser: User

  /**
   * @beforeAll
   * Creates and verifies a new user to ensure all prerequisite data is available before tests run.
   */
  beforeAll(async () => {
    OpenAPI.BASE = `${process.env.API_BASE_URL}`
    OpenAPI.HEADERS = {
      api_key: process.env.API_KEY,
    }

    try {
      // Arrange: Prepare a new user payload.
      const newUserPayload = userData.newUser()

      // Act: Create the user.
      await UserService.createUser({
        requestBody: newUserPayload,
      })

      // Assert: Verify that the user was created
      createdUser = await retry(() =>
        UserService.getUserByName({
          username: newUserPayload.username!,
        }),
      )

      if (!createdUser) {
        throw new Error('Failed to create test user')
      }
    } catch (error) {
      console.error('Setup failed:', error)
      throw error
    }
  })

  /**
   * @it should get the created user by username
   */
  it('should get the created user by username', async () => {
    // Act
    const foundUser = await UserService.getUserByName({
      username: createdUser.username!,
    })

    // Assert
    expect(foundUser).toBeDefined()
    expect(foundUser.username).toBe(createdUser.username)
  })

  /**
   * @it should log the user in
   */
  it('should log the user in', async () => {
    // Arrange
    const { username, password } = createdUser

    // Act
    const response = await UserService.loginUser({
      username: username!,
      password: password!,
    })

    // Assert
    expect(response).toBeTypeOf('string')
    expect(response).toContain('logged in user session:')
  })

  /**
   * @it should update the user's information
   */
  it('should update the user`s information', async () => {
    // Arrange
    const newLastName = 'UpdatedLastName'
    const updatedPayload: User = { ...createdUser, lastName: newLastName }

    // Act with retry
    await retry(async () => {
      await UserService.updateUser({
        username: createdUser.username!,
        requestBody: updatedPayload,
      })
    })

    // Assert with retry
    const updatedUser = await retry<User>(() =>
      UserService.getUserByName({ username: createdUser.username! }),
    )
    expect(updatedUser.lastName).toBe(newLastName)
  })

  /**
   * @it should log the user out
   */
  it('should log the user out', async () => {
    // Act & Assert
    // A successful logout resolves without error, even if the response body is empty.
    await expect(UserService.logoutUser()).resolves.not.toThrow()
  })

  /**
   * @afterAll
   * Cleans up the created user resource.
   */
  afterAll(async () => {
    if (createdUser?.username) {
      try {
        await UserService.deleteUser({ username: createdUser.username })
        console.log(`Cleaned up user with username: ${createdUser.username}`)
      } catch (error) {
        if (error instanceof Error) {
          if (error instanceof ApiError && (error as ApiError).status === 404) {
            console.log(
              `User ${createdUser.username} already deleted or not found, cleanup skipped.`,
            )
          } else {
            console.error(`Failed to clean up user: ${createdUser.username}`, error)
          }
        }
      }
    }
  })
})
