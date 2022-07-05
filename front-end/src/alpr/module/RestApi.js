/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody, CardImg, CardTitle, CardSubtitle, Input, InputGroup, Spinner, UncontrolledAlert, Row, Col } from 'reactstrap';
import Draggable from 'react-draggable';
import { IconButton } from '@mui/material';
import Iconify from '../../components/Iconify';

const borderColor = 'rgba(245, 220, 145, 0.8)';

export const RestApiComponent = (props) => {
  const [protocol,] = useState(props.protocol || 'https:');
  const [host,] = useState(props.host || 'localhost');
  const [port,] = useState(props.port || 3503);

  const [msgSent, setMsgSent] = useState(undefined);
  const [msgReceived, setMsgReceived] = useState(undefined);
  const [detectedCarNum, setDetectedCarNum] = useState('LKY1360');  // or try HHF6697
  const [ongoing, setOngoing] = useState(false);

  const [alert, setAlert] = useState(undefined);
  const [found, setFound] = useState(undefined);

  useEffect(() => {
    try {
      console.log(msgReceived);
      if (msgReceived === undefined) {
        return;
      }

      const messages = JSON.parse(msgReceived);
      if (messages.length < 1) {
        setFound(undefined);
        return;
      }

      // TODO when multiple
      const m = messages[0];
      console.log(m);
      switch (m.status) {
        case "Owner Wanted":
        case "Stolen":
        case "Unpaid Fines - Tow":
          setTimeout(() => setAlert(undefined), 3000);
          const s = m.plate + " - " + m.status + "!!"
          setAlert(s);
          break;
        case "No Wants/Warrants":
          break;
        default:
          break;
      }
      setFound(m);
    } catch (err) {
      console.error(err);
    }
  }, [msgReceived]);

  useEffect(() => {
    props.keyword && requestToSearch(props.keyword)
  }, [props.keyword]);

  const getBirth = (birth) => {
    return birth;
  }

  const getCard = m => {
    const sz1 = '4';
    return (
      <Card
        style={{ width: '100%', border: '10px solid ' + borderColor }}
        color={m.status === "No Wants/Warrants" ? 'black' : 'red'}>
        <CardImg
          alt="car image"
          src={'/static/icons/logo_team.png'}
          top
          width="100%"
          height="100px"
        />
        <CardBody>
          <CardTitle tag="h5">
            {m.plate}
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            {m.status}
          </CardSubtitle>
          <div>
            <Row>
              <Col xs={sz1}>Registration:</Col>
              <Col> {m.registration}</Col>
            </Row>
            <Row>
              <Col xs={sz1}>Owner:</Col>
              <Col> {m.ownerName} {getBirth(m.ownerBirth)}</Col>
            </Row>
            <Row>
              <Col xs={sz1}>Address:</Col>
              <Col> {m.ownerAddress}, {m.ownerCity}</Col>
            </Row>
            <Row>
              <Col xs={sz1}>Vehicle</Col>
              <Col> {m.vehicleYear} / {m.vehicleMaker} / {m.vehicleModel} / {m.vehicleColor}</Col>
            </Row>
          </div>
          <hr />
          <Button color="secondary" onClick={() => setFound(undefined)}>
            CLOSE
          </Button>
        </CardBody>
      </Card>
    );
  }

  const getUrl = (api = 'plate') => {
    return protocol + '//' + host + ':' + port + '/' + api
  }

  const requestToSearch = async (pnum) => {
    const url = getUrl();
    const param = { plateNumber: pnum };
    setOngoing(true);
    setMsgSent('Post request to ' + url + '  with param: ' + JSON.stringify(param));
    axios
      .post(url, param)
      .then(response => {
        console.log('response', response);
        setOngoing(false);
        response.data && setMsgReceived(response.data);
      })
      .catch(err => {
        console.log('err', err);
      });
  }

  return (<div style={{ position: 'absolute', top:0, width: '100%', zIndex: 2 }}>

    {found && <>
      <Draggable handle=".handle">
        <div style={{
          position: 'fixed',
          width: '500px',
          top: '20%',
          left: '50%',
          marginLeft: '-250px',
          zIndex: 3
        }}>
          <div className="handle" style={{ width: '40px', background: borderColor }}>
            <IconButton>
              <Iconify icon="el:move" />
            </IconButton>
          </div>
          {getCard(found)}
        </div>
      </Draggable>
    </>
    }

    {props.showDetail &&
      <div style={
        // props.fitToWindow ?
        // { position: 'fixed', top: 0, right: 0, margin: '1em', width: '450px', padding: '2em', borderRadius: '25px', background: 'rgba(255,255,255,0.7)' } :
        { position: 'absolute', bottop: 0, right: 0, width: '40%', padding: '2em', background: 'rgba(155,145,55,0.7)', borderRadius: '25px', fontSize: '0.8em' }}>
        <Row>REST API Log</Row>
        {ongoing ?
          <Row><h6 style={{ color: 'red' }}><Spinner /> Waiting for server response...</h6></Row>
          :
          <>
            <Row>
              <Col xs='2'>Sent:</Col>
              <Col style={{ marginBottom: '1em', color: 'blue' }}>{msgSent}</Col>
            </Row>
            <Row>
              <Col xs='2'>Received:</Col>
              <Col style={{ marginBottom: '1em', color: 'blue' }}>{msgReceived}</Col>
            </Row>
          </>
        }

        {props.showTestMenu && <>
          <Badge color="primary" style={{ marginBottom: '1em' }}>Assuming a plate number is found from ALPR</Badge>
          <p style={{ fontSize: '0.8em' }}>Try LKY1360 or HHF6697</p>
          <InputGroup style={{ width: '300px' }}>
            <Input type="textfield" defaultValue={detectedCarNum} onChange={e => setDetectedCarNum(e.target.value)} />
            <Button onClick={() => requestToSearch(detectedCarNum)}>Send to server</Button>
          </InputGroup>
        </>}
      </div>
    }

    {alert &&
      <div style={{ position: 'fixed', top: '20%', width: '80%', zIndex: 3 }}>
        <UncontrolledAlert color="danger">
          {alert}
        </UncontrolledAlert>
      </div>
    }
  </div>);
}
