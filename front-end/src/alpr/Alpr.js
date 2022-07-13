import { FullScreen, useFullScreenHandle } from "react-full-screen";
import RestApiComponent from './module/RestApi';
import { Preview } from './module/Preview';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconButton } from '@mui/material';
import Iconify from '../components/Iconify';
import { useEffect, useState } from "react";

function Alpr(props) {
  const handle = useFullScreenHandle();

  const handleFoundPlateNumber = (keyword) => {
    setRequest({ type: 'search', keyword: keyword });
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', border: '0px solid gray' }}>
      <FullScreen handle={handle}>
        <Preview
          showDetail={true}
          fitToWindow={true}
          onFoundPlate={k => handleFoundPlateNumber(k)}
        />
        <RestApiComponent
          showDetail={true}
          fitToWindow={true}
          request={props.request}
        />
        {/* <RestApiComponent showDetail={true} fitToWindow={true} protocol="https:" port={3503} request={props.request} /> */}
      </FullScreen>

      <div style={{ position: 'fixed', bottom: 20, right: 10, zIndex: 9 }}>
        <IconButton onClick={handle.enter}>
          <Iconify icon="map:fullscreen" />
        </IconButton>
      </div>
    </div>
  );
}

export default Alpr;
