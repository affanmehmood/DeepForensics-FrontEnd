import React, {useEffect, useState} from 'react';
import Drawer from './src/Drawer';
import SplashScreen from './src/SplashScreen/Splash'
import socket from '../app/src/socketIoBase';

const nodeConsole = require('console');
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);

export default function Routes() {
  const [loading, setloading] = useState(undefined);
  const [completed, setcompleted] = useState(undefined);
  const [serverReady, setServerReady] = useState(false);

  useEffect(()=>{
    socket.on('server-ready', () => {
          setloading(true);
          myConsole.log("SERVER READY");
            setTimeout(() => {
              setcompleted(true);
              setTimeout(() => {
                setServerReady(true);
              }, 3000);
            }, 1600);
    });
  }, [loading, completed])
  return (
    <div className="d-flex flex-column flex-sm-column">
      {!serverReady ? (
      <div className="splash">
        <header className="splash-header">
          <SplashScreen loading={loading} completed={completed}/>
        </header>
      </div>
      ): <Drawer />}
    </div>
  );
}
