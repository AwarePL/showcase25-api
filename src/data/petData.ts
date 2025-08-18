import { faker } from '@faker-js/faker'
import { Pet } from '../generated/api'

/**
 * A utility object for generating dynamic and realistic test data for pets.
 */
export const petData = {
  /**
   * Generates a new pet object with randomized data using the faker.js library.
   * This function ensures that each test run uses a unique pet, preventing test interference.
   * @returns {Pet} A new pet object conforming to the Pet schema.
   */
  newPet: (): Pet => ({
    // Generates a realistic, large integer ID to avoid collisions.
    id: faker.number.int({ min: 10000, max: 99999 }),
    // Creates a fun, unique name like "Bulldog Smith".
    name: `${faker.animal.dog()} ${faker.person.lastName()}`,
    category: {
      id: 1,
      name: 'Dogs',
    },
    // Provides a random dog picture URL.
    photoUrls: [faker.image.urlLoremFlickr({ category: 'dog' })],
    tags: [
      {
        id: 1,
        // Assigns a random adjective as a tag, e.g., "playful".
        name: faker.word.adjective(),
      },
    ],
    // Sets the pet's status to 'available' by default.
    status: Pet.status.AVAILABLE,
  }),
}
