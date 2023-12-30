const express = require('express');
const mongoose = require('mongoose');
const blogRouter = require('./routes/BlogRoute');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger_output.json');

const app = express();

mongoose.connect(
  process.env.MONGO_URI || 'mongodb://localhost:27017/BLOG',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/blogs', blogRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
