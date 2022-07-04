/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Badge, Button, Row, Col, FormGroup, Label, Input, InputGroup, InputGroupText } from 'reactstrap';

let ws;

export const Preview = (props) => {
  const [protocol,] = useState(props.protocol || 'ws:');
  const [host, setHost] = useState(props.host || 'localhost');
  const [port, setPort] = useState(props.port || 8080);
  const [setting, setSetting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [datauri, setDatauri] = useState(undefined);
  const [video, setVideo] = useState('beaver1');
  const [baseDir, setBaseDir] = useState('F:\\22_SWARCH_PROJECT\\');
  const [log, setLog] = useState(undefined);

  useEffect(() => {
    const connect = () => {
      ws = new WebSocket(getUrl());
      ws.onopen = () => {
        console.log("connected!!");
        setIsConnected(true);
      };
      ws.onclose = () => {
        console.log("disconnected!!");
        setIsConnected(false);
        setTimeout(() => {
          connect();
        }, 1000);
      }
      ws.onmessage = message => {
        const m = JSON.parse(message.data);
        setDatauri("data:image/jpeg;base64," + m.data);
      };
    }
    connect();
  }, []);

  const reconnect = () => {
    alert("TBD: reconnect");
  }

  const getUrl = () => { return protocol + '//' + host + ':' + port }

  const getRequest = () => { return "FILE:" + baseDir + video };

  const sendInitiate = () => {
    const s = JSON.stringify({ request: '<start>', data: getRequest() })
    ws.send(s);
    setLog("Send a request to ALPR: " + s);
  }

  const getInfo = () => {
    return (isConnected ? "Connected to " : "★Disconnected to ") + getUrl();
  }

  return (
    <div style={{ position: 'relative', width: '100%' }} >

      <div style={props.fitToWindow ?
        { position: 'absolute', margin: '1em', width: '450px', padding: '2em', borderRadius: '25px', background: 'rgba(255,255,255,0.7)', zIndex: 1 } :
        { float: 'left', width: '40%', padding: '2em' }}>
        {props.showDetail && <>
          <Badge
            style={{ marginBottom: '1em', fontSize: "0.8em" }}
            color={isConnected ? 'primary' : 'danger'}
            onClick={() => setSetting(!setting)}>
            {getInfo()}
          </Badge>
        </>
        }
        {setting &&
          <InputGroup size="sm" style={{ marginBottom: '1em' }}>
            <InputGroupText >
              Host
            </InputGroupText>
            <Input
              id="connect"
              name="connect"
              type="textfield"
              defaultValue={host}
              onChange={e => setHost(e.target.value)}
            />
            <InputGroupText >
              Port
            </InputGroupText>
            <Input
              id="port"
              name="port"
              type="textfield"
              defaultValue={port}
              onChange={e => setPort(e.target.value)}
            />
            <Button onClick={() => reconnect()}>
              Reconnect
            </Button>
          </InputGroup>
        }
        <InputGroup size="sm" style={{ marginBottom: '1em' }}>
          <InputGroupText >
            Path
          </InputGroupText>
          <Input
            id="selectVideoPath"
            name="selectPath"
            type="textfield"
            defaultValue={baseDir}
            onChange={e => setBaseDir(e.target.value)}
          />
        </InputGroup>
        <InputGroup size="sm">
          <InputGroupText >
            Select
          </InputGroupText>
          <Input
            id="selectVideo"
            name="select"
            type="select"
            defaultValue={video}
            onChange={e => setVideo(e.target.value)}
          >
            <option value='beaver1'>Beaver1</option>
            <option value='beaver2'>Beaver2</option>
            <option value='beaver3'>Beaver3</option>
            <option value='beaver4'>Beaver4</option>
          </Input>
          <Button onClick={() => sendInitiate()} color="primary">Play</Button>
        </InputGroup>
        {props.showDetail &&
          <><p style={{ marginTop: '1em', fontSize: "0.8em" }}>{log && log}</p>
            {props.fitToWindow || <Badge style={{ width: 'fit-content' }} color="warning">←image received</Badge>}
          </>}
      </div>

      <div style={props.fitToWindow ?
        { position: 'relative', width: '100%', zIndex: 0 } :
        { float: 'left', width: '50%' }} >
        <img src={datauri}
          style={props.fitToWindow ?
            { width: '100%' } :
            {}}
        />
      </div>
    </div >
  );
}
