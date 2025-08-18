import { faker } from '@faker-js/faker'
import { Order } from '../generated/api/models/Order.js'

/**
 * A utility object for generating dynamic and realistic test data for orders.
 */
export const storeData = {
  /**
   * Generates a new order object with randomized data.
   * @param petId The ID of the pet for which the order is placed.
   * @returns {Order} A new order object conforming to the Order schema.
   */
  newOrder: (petId: number): Order => ({
    id: faker.number.int({ min: 1, max: 10 }), // API requirement for valid IDs
    petId: petId,
    quantity: faker.number.int({ min: 1, max: 5 }),
    shipDate: faker.date.future().toISOString(),
    status: Order.status.PLACED,
    complete: false,
  }),
}
