import { faker } from '@faker-js/faker'

export const petData = {
  /**
   * Generates a new pet object with dynamic data.
   * This is now a function to ensure fresh data is created for each test.
   */
  newPet: () => ({
    id: faker.number.int({ min: 10000, max: 99999 }), // Generates a realistic, large integer ID
    name: faker.animal.dog() + ' ' + faker.person.lastName(), // e.g., "Husky Smith"
    category: {
      id: 1,
      name: 'Dogs',
    },
    photoUrls: [faker.image.urlLoremFlickr({ category: 'dog' })], // Generates a random dog picture URL
    tags: [
      {
        id: 0,
        name: faker.word.adjective(), // e.g., "playful"
      },
    ],
    status: 'available' as const,
  }),
}
