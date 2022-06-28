/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Badge, Button, Row } from 'reactstrap';

let ws;

export const WebsocketHandler = (props) => {
  const [protocol,] = useState(props.protocol || 'ws:');
  const [host,] = useState(props.host || 'localhost');
  const [port,] = useState(props.port || 9998);

  const [datauri, setDatauri] = useState(undefined);
  const [video, setVideo] = useState('beaver1');
  const [log, setLog] = useState(undefined);

  useEffect(() => {
    ws = new WebSocket(getUrl());
    ws.onopen = () => {
      console.log("connected!!");
    };
    ws.onmessage = message => {
      const m = JSON.parse(message.data);
      setDatauri("data:image/jpeg;base64," + m.data);
    };
  }, []);

  const getUrl = () => { return protocol + '//' + host + ':' + port }

  const sendInitiate = () => {
    const s = JSON.stringify({ request: 'play', data: video })
    ws.send(s);
    setLog("sendInitiate: " + s);
  }

  return (
    <div style={{ padding: '3em', width: '600px' }}>
      <Row style={{ width: '200px', margin: 'auto', marginTop: '1em', marginBottom: '1em' }} >
        <select defaultValue={video} onChange={e => setVideo(e.target.value)}>
          <option value='beaver1'>Beaver1</option>
          <option value='beaver2'>Beaver2</option>
          <option value='beaver3'>Beaver3</option>
          <option value='beaver4'>Beaver4</option>
        </select>
      </Row>
      <Row style={{ width: '200px', margin: 'auto', marginTop: '1em', marginBottom: '1em' }} >
        <Button onClick={() => sendInitiate()}>Initiate</Button>
      </Row>
      <Row style={{ width: '400px', margin: 'auto', marginTop: '1em', marginBottom: '1em' }} >
        {log && log}
      </Row>
      <Row style={{ width: '100%', margin: 'auto', marginTop: '1em', marginBottom: '1em' }}>
        <Badge style={{ width: 'fit-content', margin: '1em' }} color="warning">image received:</Badge>
        <img src={datauri} />
      </Row>
    </div>
  );
}
