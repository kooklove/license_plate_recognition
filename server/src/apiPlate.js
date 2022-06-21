const apiPlate = (req, res) => {
  try {
    console.log('[apiPlate] req.body:', req.body);
    const plateNumber = req.body.plateNumber;
    console.log('[apiPlate] plateNumber: ' + plateNumber);

    fakeDBConnector(fakeSQLGenerator(plateNumber), plateNumber)
      .then(result => {
        console.log('[apiPlate] result:', result);
        res.json(result);   //sending response to the client
      })
      .catch(err => {
        console.error(err);
        res.status(500);    //sending failure to the client
      });
  } catch (err) {
    console.error(err);
    res.status(500);        //sending failure to the client
  }
}

const fakeSQLGenerator = (plateNumber) => {
  return 'SELECT * FROM plate_table WHERE plate_number = ' + plateNumber;
};

const fakeDBConnector = (queryStatement, testData) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('[apiPlate] [emulator] given query:', queryStatement);
      setTimeout(() => {
        const queryResult = ['TEST1', testData, 'TEST3']
        console.log('[apiPlate] [emulator] assuming query has been successfully processed and returns: ', queryResult)
        resolve(queryResult);
      }, 1000);
    } catch (err) {
      console.error(err);
      reject();
    }
  })
};

export { apiPlate };
