require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
require('./Modules/db');
const TaskRouter = require('./Routes/TaskRouter');

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/tasks',TaskRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
