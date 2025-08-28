const { PrismaClient } = require("../../generated/prisma");

const prisma = new PrismaClient();

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

module.exports = findUserByEmail
