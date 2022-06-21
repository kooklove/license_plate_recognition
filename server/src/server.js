import RestApiServer from './RestApiServer.js'
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REST_API_PORT_HTTP = 3502;
const REST_API_PORT_HTTPS = 3503;

function getTLSOption() {
  let options;
  try {
    const dir = path.resolve(__dirname, '../cert/');
    console.log('[TLS] Cert/keys from ' + dir);
    options = {
      ca: fs.readFileSync(path.resolve(dir, 'fullchain.pem')),
      key: fs.readFileSync(path.resolve(dir, 'privkey.pem')),
      cert: fs.readFileSync(path.resolve(dir, 'cert.pem'))
    };
  } catch (err) {
    console.log("failed to get TLS options");
    console.log(err);
  }
  return options;
}

new RestApiServer(getTLSOption(), REST_API_PORT_HTTP, REST_API_PORT_HTTPS);

export { };

