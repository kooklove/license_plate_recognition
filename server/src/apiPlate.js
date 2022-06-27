import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const apiPlate = async (req, res) => {
  try {
    console.log('[apiPlate] req.body:', req.body);
    const plateNumber = req.body.plateNumber;
    console.log('[apiPlate] plateNumber: ' + plateNumber);

    const result = await prisma.plateNumber.findMany({
      where: {
        plate: plateNumber,
      },
    });
    console.log(result);
    res.json(JSON.stringify(result));
  } catch (err) {
    console.error(err);
    res.status(500);        //sending failure to the client
  } finally {
    await prisma.$disconnect();
  }
}

export { apiPlate };
