const jwt = require('jsonwebtoken');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NGJiZTNkM2MwY2VhNjk3MzgzZWM1NSIsImlhdCI6MTc0OTc5NDM2NSwiZXhwIjoxNzQ5ODAxNTY1fQ.Fve1PGpnEPOX0Jateqkv58_uiAtpAkP4h8_flx4quqg';
const secret = 'your_jwt_secret_key_here';

try {
  const decoded = jwt.verify(token, secret);
  console.log('Valid Token:', decoded);
} catch (err) {
  console.error('Invalid Token:', err.message);
}
