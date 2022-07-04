/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody, CardImg, CardTitle, CardSubtitle, Input, InputGroup, Spinner, UncontrolledAlert, Row, Col } from 'reactstrap';

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
  }, [props.keyword])

  const getCard = m => {
    return (
      <Card
        style={{ width: '100%', border: '10px solid yellow' }}
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
              <Col xs='6'>Registration:</Col>
              <Col> {m.registration}</Col>
            </Row>
            <Row>
              <Col xs='6'>ownerName:</Col>
              <Col> {m.ownerName}</Col>
            </Row>
            <Row>
              <Col xs='6'>ownerBirth:</Col>
              <Col> {m.ownerBirth}</Col>
            </Row>
            <Row>
              <Col xs='6'>ownerAddress:</Col>
              <Col> {m.ownerAddress}</Col>
            </Row>
            <Row>
              <Col xs='6'>ownerCity:</Col>
              <Col> {m.ownerCity}</Col>
            </Row>
            <Row>
              <Col xs='6'>vehicleYear:</Col>
              <Col> {m.vehicleYear}</Col>
            </Row>
            <Row>
              <Col xs='6'>vehicleMaker:</Col>
              <Col> {m.registration}</Col>
            </Row>
            <Row>
              <Col xs='6'>vehicleMaker:</Col>
              <Col> {m.registration}</Col>
            </Row>
            <Row>
              <Col xs='6'>vehicleModel:</Col>
              <Col> {m.vehicleModel}</Col>
            </Row>
            <Row>
              <Col xs='6'>vehicleColor:</Col>
              <Col> {m.vehicleColor}</Col>
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

  return (<div style={{ clear: 'both' }}>

    {found &&
      <div style={{
        position: 'fixed',
        width: '500px',
        top: '20%',
        left: '50%',
        marginLeft: '-250px',
        background: 'green',
        zIndex: 3
      }}>
        {getCard(found)}
      </div>
    }
    {props.showTestMenu && <>
      <Badge color="primary" style={{ marginBottom: '1em' }}>Assuming a plate number is found from ALPR</Badge>
      <p style={{ fontSize: '0.8em' }}>Try LKY1360 or HHF6697</p>
      <InputGroup style={{ width: '300px' }}>
        <Input type="textfield" defaultValue={detectedCarNum} onChange={e => setDetectedCarNum(e.target.value)} />
        <Button onClick={() => requestToSearch(detectedCarNum)}>Send to server</Button>
      </InputGroup>
    </>}

    {props.showDetail &&
      <div style={{ marginTop: '1em', fontSize: '0.8em' }}>
        <div style={{ marginBottom: '1em', color: 'blue' }}>{msgSent}</div>
        {ongoing ?
          <div><Spinner /> Waiting for server response...</div> :
          <div>Received: {msgReceived}</div>
        }
      </div>
    }


    {alert &&
      <div style={{ position: 'fixed', bottom: 0, width: '60%', zIndex: 9 }}>
        <UncontrolledAlert color="danger">
          {alert}
        </UncontrolledAlert>
      </div>
    }
  </div>);
}
