require('dotenv').config();
const app = require('./app');
const sequelize = require('./models');

// register models so they are attached to the sequelize instance
require('./models/Product');
require('./models/Order');

const PORT = process.env.PORT || 3000;

sequelize
  .sync()
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      'Failed to sync database. Please check your DB settings and try again.',
      error
    );
  });