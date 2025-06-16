require('dotenv').config();
const fs = require('fs');

process.env.DB_PASS = fs.readFileSync(process.env.DB_PASS_FILE, 'utf8').trim();
process.env.JWT_SECRET = fs.readFileSync(process.env.JWT_SECRET_FILE, 'utf8').trim();

//console.log('JWT_SECRET:', process.env.JWT_SECRET);

const express = require('express');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const languageRoutes = require('./routes/languageRoutes');
const cveRoutes = require('./routes/cveRoutes');

//const soapCveService = require('./services/soapCveService');

const soapExportService = require('./services/soapExportService');

//const soapLangService = require('./services/soapLangService');
//const soapService = require('./services/soapService');




const authenticate = require('./middlewares/authenticate');


const app = express();
app.use(express.json());

// Public route
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'IT\'S ALIVE!' });
});


// Protected JWT routes
app.use(authenticate);
app.use('/api/v1/languages', languageRoutes);
app.use('/api/v1/vulnerabilities', cveRoutes);

// SOAP endpoint
//soapCveService(app);
soapExportService(app);
//soapLangService(app);
//soapService(app);

// server start
sequelize.authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server listening on port ${process.env.PORT}`)
    );
  })
  .catch(err => console.error('DB connection error:', err));
