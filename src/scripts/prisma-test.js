const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Query all documents from the 'notes' collection
  const notes = await prisma.note.findMany();
  console.log(notes);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
