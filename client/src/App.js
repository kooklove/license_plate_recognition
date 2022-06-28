import './App.css';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Button } from 'reactstrap';
import { RestApiComponent } from 'unittest/RestApi';

function App() {
  const handle = useFullScreenHandle();
  return (
    <div style={{ backgroundColor: '#ebfcfc', width: '100vw', height: '100vh' }}>
      <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1 }}>
        <Button onClick={handle.enter} color="warning">
          Fullscreen Mode
        </Button>
      </div>

      <FullScreen handle={handle}>
        <RestApiComponent protocol="https:" port={3503} />
      </FullScreen>
    </div>
  );
}

export default App;
