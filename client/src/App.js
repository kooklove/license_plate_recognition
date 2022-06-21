import './App.css';
import { UnitTest } from './unittest/UnitTest.js'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Button } from 'reactstrap';

function App() {
  const handle = useFullScreenHandle();
  return (
    <>
      <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1 }}>
        <Button onClick={handle.enter} color="warning">
          Fullscreen Mode
        </Button>
      </div>

      <FullScreen handle={handle}>
        <UnitTest />
      </FullScreen>
    </>
  );
}

export default App;
