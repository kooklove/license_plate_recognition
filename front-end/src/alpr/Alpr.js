import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { RestApiComponent } from './module/RestApi';
import { Preview } from './module/Preview';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconButton } from '@mui/material';
import Iconify from '../components/Iconify';

function Alpr(props) {
  const handle = useFullScreenHandle();
  return (
    <div style={{ minWidth: '30vw', minHeight: '40vh', position: 'relative' }}>
      <FullScreen handle={handle}>
        <Preview showDetail={true} fitToWindow={true} />
        <RestApiComponent showDetail={true} protocol="https:" port={3503} keyword={props.keyword} />
      </FullScreen>

      <div style={{ color: 'black', position: 'absolute', bottom: 20, right: 10, zIndex: 1 }}>
        <IconButton onClick={handle.enter}>
          <Iconify icon="map:fullscreen" />
        </IconButton>
      </div>
    </div>
  );
}

export default Alpr;
