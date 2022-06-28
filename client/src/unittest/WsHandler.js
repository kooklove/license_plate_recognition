/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody, CardImg, CardTitle, CardSubtitle, Input, InputGroup, Spinner, UncontrolledAlert, Row, Col } from 'reactstrap';

let ws;

export const WebsocketHandler = (props) => {
  const [protocol,] = useState(props.protocol || 'ws:');
  const [host,] = useState(props.host || 'localhost');
  const [port,] = useState(props.port || 9998);

  const [datauri, setDatauri] = useState(undefined);

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
    ws.send(JSON.stringify({ request: 'play', data: 'beaver1.avi' }));
  }

  return (
    <div style={{ padding: '3em' }}>
      <Button onClick={() => sendInitiate()}>GetImage</Button>
      <br />
      <img src={datauri} />
    </div>
  );
}
