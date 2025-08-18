import { faker } from '@faker-js/faker'
import { User } from '../generated/api/index.js'

/**
 * A utility object for generating dynamic and realistic test data for users.
 */
export const userData = {
  /**
   * Generates a new user object with randomized data.
   * @returns {User} A new user object conforming to the User schema.
   */
  newUser: (): User => ({
    id: faker.number.int({ min: 1000, max: 9999 }),
    username: faker.internet.username(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number(),
    userStatus: 0,
  }),
}
