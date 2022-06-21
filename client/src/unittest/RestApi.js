/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useState } from 'react';
import { Button, Input, InputGroup, Spinner } from 'reactstrap';

export const RestApiComponent = (props) => {
  const [protocol,] = useState(props.protocol || 'http:');
  const [host,] = useState(props.host || 'localhost');
  const [port,] = useState(props.port || 3502);

  const [msgSent, setMsgSent] = useState(undefined);
  const [msgReceived, setMsgReceived] = useState(undefined);
  const [detectedCarNum, setDetectedCarNum] = useState('LGESWA');
  const [ongoing, setOngoing] = useState(false);

  const getUrl = (api = 'plate') => {
    return protocol + '//' + host + ':' + port + '/' + api
  }

  const postPlateNumber = async (pnum) => {
    const url = getUrl();
    const param = { plateNumber: pnum };
    setOngoing(true);
    setMsgSent('Post request to ' + url + '  with param: ' + JSON.stringify(param));
    axios
      .post(url, param)
      .then(response => {
        console.log('response', response);
        setOngoing(false);
        setMsgReceived(response.data && JSON.stringify(response.data));
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  return (<>
    <InputGroup style={{width:'300px'}}>
      <Input type="textfield" defaultValue={detectedCarNum} onChange={e => setDetectedCarNum(e.target.value)} />
      <Button onClick={() => postPlateNumber(detectedCarNum)}>Request</Button>
    </InputGroup>
    <div style={{ marginTop: '1em', fontSize: '0.8em' }}>
      <p>{msgSent}</p>
      {ongoing ?
        <p><Spinner /> Waiting for server response...</p> :
        <p>Received: {msgReceived}</p>
      }
    </div>
  </>);
}
