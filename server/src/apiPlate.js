import mongoose from 'mongoose';
//import {Schema} from 'mongoose';
//import mongodb from 'mongodb';
import levenshtein from 'fast-levenshtein';

var result;

const platenumberSchema = new mongoose.Schema({
  plate: {
    required: true,
    type: String,
  },
  status: {
    required: true,
    type: String,
  },
  registration: {
    required: true,
    type: String,
  },
  ownerName:  {
    required: true,
    type: String,
  },
  ownerBirth:  {
    required: true,
    type: String,
  },
  ownerAddress:  {
    required: true,
    type: String,
  },
  ownerCity:  {
    required: true,
    type: String,
  },
  vehicleYear:  {
    required: true,
    type: Number,
  },  
  vehicleMaker:  {
    required: true,
    type: String,
  },
  vehicleModel:  {
    required: true,
    type: String,
  },
  vehicleColor:  {
    required: true,
    type: String,
  }
});

//const prisma = new PrismaClient();
mongoose.connect('mongodb://localhost:27017/lgeswa2022');
var db = mongoose.connection;
// 4. 연결 실패
db.on('error', function(){
  console.log('Connection Failed!');
});
// 5. 연결 성공
db.once('open', function() {
  console.log('Connected!');
});
const collections = mongoose.model('platenumber', platenumberSchema);

const apiPlate = async (req, res) => {
  try {
    let distance;
    var partial_result = [];
    console.log('[apiPlate] req.body:', req.body);
    const plateNumber = req.body.plateNumber;
    console.log('[apiPlate] plateNumber: ' + plateNumber);

    let start = new Date();
    // exact match
    var result = await collections.find(
      {
        plate: plateNumber  
      }
    );
    let end = new Date();
    console.log(`${end - start}ms`)

    if (result.length)
    {
      res.json(result);
    }
    else //if no match
    {
      let word = plateNumber.substring(0, 3);
      console.log(word);
      const query = new RegExp('^'+ word);
      //TODO: partial match
      var result = await collections.find(
        {
          plate: query
        }
      );

      console.log(result.length);
      
      if (result.length)
      {
        for (var i=0;i<result.length;i++)
        {
          distance = levenshtein.get(plateNumber, result[i].plate);
          if (distance < 2)
          {
            partial_result.push(result[i]);
          }
        }
        console.log(partial_result.length);
        res.json(partial_result);
      }
      else
      {
        res.json(result);
      }
      
    }

    //console.log(result);
    //res.json(JSON.stringify(result));
  } catch (err) {
    console.error(err);
    res.status(500);        //sending failure to the client
  } finally {
    //await prisma.$disconnect();
  }
}

const apiPlatePartial = async (req, res) => {

  try {
    console.log('[apiPlatePartial] req.body:', req.body);
    const plateNumber = req.body.plateNumber;
    console.log('[apiPlatePartial] plateNumber: ' + plateNumber);

    /* CASE1 : 1000개당 약 2.5초 소요 (사용불가)
    let start, end;
    let distance;
    start = new Date();
    for (var i =1 ;i <= 25000000 ; i++) {
      result = await prisma.plateNumber.findUnique({
        where: 
        {
          id: i,
        },
      })

      distance = levenshtein.get(plateNumber, result.plate);
      if (distance < 2)
        console.log(distance);
      //console.log(result.plate);
      //console.log(i);
      if (i%1000==0)
      {
        end = new Date();
        console.log(i, end - start);
        start = new Date();
      }
    }
    */


    /* //CASE4 : 3000개당 약 850ms 소요 (사용불가) 
    const result = await prisma.$queryRaw
    `SELECT * FROM platenumber WHERE levenshtein(plate, ${plateNumber})
    BETWEEN 1 AND 2;`
    */

    /* LIKE 사용 (수십ms 소요되지만 confidence threshold 값을 넣을 수 없어서 사용불가)
    const result = await prisma.$queryRaw
    `SELECT * FROM platenumber WHERE plate LIKE "LKY136%"`; //수십ms 소요
    */
   

    /* contains 사용 50여초 소요 (사용불가)
    const result = await prisma.plateNumber.findMany({

          where: {
            //plate: plateNumber,
            plate: 
            {
              contains: "LKY136"  //50여초 소요
            }
          }
      
    });
    */

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
export { apiPlatePartial };