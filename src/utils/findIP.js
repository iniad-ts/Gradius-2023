import { networkInterfaces } from 'os';

export const getIpAddress = () => {
  const nets = networkInterfaces();
  const net = nets['eth0']?.find((v) => v.family === 'IPv4');
  if (!net) return nets['en0']?.find((v) => v.family === 'IPv4').address;
  return net.address;
};
