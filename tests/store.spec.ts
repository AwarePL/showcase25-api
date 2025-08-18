import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import { StoreService, OpenAPI, Order, PetService, Pet } from '../src/generated/api/index.js'
import { petData } from '../src/data/petData.js'
import { storeData } from '../src/data/storeData.js'
import { retry } from '../src/utils/retry.js'

/**
 * @describe Store Endpoint
 * This test suite covers the CRUD operations for the /store endpoint.
 */
describe('Store Endpoint', () => {
  let createdOrder: Order
  let testPet: Pet // We need a pet to place an order for

  /**
   * @beforeAll
   * Sets up the API client and creates a prerequisite pet for the tests.
   */
  beforeAll(async () => {
    OpenAPI.BASE = `${process.env.API_BASE_URL}`
    OpenAPI.HEADERS = {
      api_key: `${process.env.API_KEY}`,
    }

    // Create a pet to be used in the order
    testPet = await PetService.addPet({ requestBody: petData.newPet() })
  })

  /**
   * @it should successfully place a new order
   */
  it('should successfully place a new order', async () => {
    // Arrange
    const newOrderPayload = storeData.newOrder(testPet.id!)

    // Act
    const response = await StoreService.placeOrder({
      requestBody: newOrderPayload,
    })
    createdOrder = response as Order

    // Assert
    expect(createdOrder).toBeDefined()
    expect(createdOrder.id).toBe(newOrderPayload.id)
    expect(createdOrder.petId).toBe(newOrderPayload.petId)
    expect(createdOrder.status).toBe(Order.status.PLACED)
  })

  /**
   * @it should find the created order by ID
   */
  it('should find the created order by ID', async () => {
    // Arrange
    expect(createdOrder?.id, 'Order must be created first').toBeDefined()

    // Act
    const foundOrder = await retry<Order>(() =>
      StoreService.getOrderById({
        orderId: createdOrder.id!,
      }),
    )

    // Assert
    expect(foundOrder).toBeDefined()
    expect(foundOrder.id).toBe(createdOrder.id)
  })

  /**
   * @it should return pet inventories by status
   */
  it('should return pet inventories by status', async () => {
    // Act
    const inventory = await retry(() => StoreService.getInventory())

    // Assert
    expect(inventory).toBeDefined()
  })

  /**
   * @afterAll
   * Cleans up created resources (order and pet).
   */
  afterAll(async () => {
    if (createdOrder?.id) {
      try {
        await StoreService.deleteOrder({ orderId: createdOrder.id })
        console.log(`Cleaned up order with ID: ${createdOrder.id}`)
      } catch (error) {
        console.error(`Failed to clean up order with ID: ${createdOrder.id}`, error)
      }
    }
    if (testPet?.id) {
      try {
        await PetService.deletePet({ petId: testPet.id })
        console.log(`Cleaned up pet with ID: ${testPet.id}`)
      } catch (error) {
        console.error(`Failed to clean up pet with ID: ${testPet.id}`, error)
      }
    }
  })
})
