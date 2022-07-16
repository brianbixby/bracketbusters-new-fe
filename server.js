'use strict';

require('dotenv').config();
const compression = require('compression');
const express = require('express');
const app = express();
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(compression());

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      'default-src': "'self'",
      'script-src': [
        "'self'",
        'https://fonts.gstatic.com',
        'https://fonts.googleapis.com',
      ],
      'style-src': [
        "'self'",
        'https://fonts.gstatic.com',
        'https://fonts.googleapis.com',
      ],
      'connect-src': ["'self'", process.env.REACT_APP_API_URL],
      'font-src': [
        "'self'",
        'https://fonts.gstatic.com',
        'https://fonts.googleapis.com',
      ],
    },
  })
);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
