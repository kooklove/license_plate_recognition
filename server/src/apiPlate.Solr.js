import config from '../conf/config.json' assert {type: "json"};
import http from 'http'
import { ConnectionClosedEvent } from 'mongodb';

const query_items = '&fl=plate,status,registration,ownerName,ownerBirth,ownerAddress,ownerCity,vehicleYear,vehicleMaker,vehicleModel,vehicleColor';

const apiPlate = async (req, res) => {
  try {
    var plateNumber = req.path.split('/')[2]
    var options = {
      hostname: '127.0.0.1',
      port: '8983',
      path: '/solr/license_plate/query?q=plate:' + plateNumber + config.confidence
             + query_items,
      method: 'GET',
      json:true
    }
    function handleResponse(response) {
      var serverData = '';
      response.on('data', function (chunk) {
        serverData += chunk;
      });
      response.on('end', function () {
        // console.log(serverData);
        const fianl_data = JSON.parse(serverData).response.docs
        res.json(fianl_data);
      });
    }
    http.request(options, function(response){
      handleResponse(response);
    }).end();
  } catch (err) {
    console.error(err);
    res.status(500);        //sending failure to the client
  } finally {

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