"use strict";

import { faker } from '@faker-js/faker';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let movies = [];
    for(let i = 0; i<1000; i++){
      movies.push( {
        name: faker.book.title(),
        length: faker.number.int({ min: 60, max: 180 }),
        description: faker.lorem.paragraphs(5),
        image: faker.image.urlPicsumPhotos({width: 640, height: 480, grayscale: false, blur: 0}),
        createdAt: faker.date.between({ from: '2000-01-01', to: Date.now() }),
        updatedAt: faker.date.between({ from: '2000-01-01', to: Date.now() }),
      });
    }

    await queryInterface.bulkInsert(
      "Movies",
      movies,
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Movies', null, {});
  },
};
