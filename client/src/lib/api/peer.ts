import Peer from 'peerjs';

const devOption = {
  host: '/',
  path: '/p2p',
  debug: 3,
  port: 5001,
};

const prodOption = {
  host: '/',
  path: '/p2p',
  debug: 3,
  secure: true,
};

console.log(process.env.NODE_ENV);

const peer = new Peer(
  undefined,
  process.env.NODE_ENV === 'development' ? devOption : prodOption,
);

export default peer;
