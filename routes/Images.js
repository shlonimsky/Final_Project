import ImageKit from 'imagekit';
import express from 'express';
const routerImage = express.Router();

const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/helperapp',
    publicKey: 'public_SZZWi2y0FSQ+d9ha463+dyHJGwE=',
    privateKey: 'private_eEWK6qxDc0mS3Dpe6CovFTci9fA='
  });

  routerImage.get('/auth', function (req, res) {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
  });

export default routerImage