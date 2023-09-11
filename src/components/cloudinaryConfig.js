const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'GRTECH',
  api_key: '243563458187976',
  api_secret: 'zq7fMjeOQRRTwuC2ZS0fyb_A_b0'
});

module.exports = cloudinary;