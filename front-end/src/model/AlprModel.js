/* eslint-disable object-shorthand */
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import RestApiController from '../controller/RestApiController';
import PlateView from '../view/PlateView';
import Preview from '../view/Preview';

AlprModel.propTypes = {
  req: PropTypes.object,
  showDetail: PropTypes.bool
};

function AlprModel({ req, showDetail }) {
  const [request, setRequest] = useState(undefined);
  const [platesFound, setPlatesFound] = useState(undefined);

  const handle = useFullScreenHandle();

  useEffect(() => {
    if (req === undefined) {
      return;
    }

    console.log('props.req', req)
    setRequest(req);
  }, [req]);

  const handleFoundPlateNumber = (keyword) => {
    setRequest({ type: 'search', keyword: keyword });
  }

  return (
    <div style={{ position: 'absolute', top: '6em', left: '15%', width: '100%', zIndex: 9, border: '1px solid blue' }}>
      <FullScreen handle={handle}>
        <RestApiController
          showDetail={showDetail}
          fitToWindow
          request={request}
          onPlatesFound={(plates) => setPlatesFound(plates)}
        />
        <PlateView
          showDetail={showDetail}
          platesFound={platesFound}
        />
        <Preview
          showDetail={showDetail}
          fitToWindow
          onFoundPlate={k => handleFoundPlateNumber(k)}
        />
      </FullScreen>
    </div>
  );
}

export default AlprModel;
