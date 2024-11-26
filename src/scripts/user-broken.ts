const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Test: Create a User
  await prisma.user.create({
    data: {
      name: "Test User",
      username: "testuser",
      password: "securepassword",
    },
  });

  // Test: Query the User by `username`
  const user = await prisma.user.findUnique({
    where: { username: "testuser" }, // Testing the problematic query
  });

  console.log("Queried User:", user);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
