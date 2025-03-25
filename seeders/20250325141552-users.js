"use strict";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    config();
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const salt = bcrypt.genSaltSync(12);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: process.env.DEFAULT_USER_NAME,
          email: process.env.DEFAULT_USER_EMAIL,
          password: process.env.DEFAULT_USER_PASSWORD_HASH,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
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
  },
};
