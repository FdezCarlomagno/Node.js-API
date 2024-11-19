const express = require('express');
const path = require('path');
const paintingRoutes = require('./routes/painting.routes');
const userRoutes = require('./routes/user.routes');
const jwtMiddleware = require('./middlewares/jwt.middleware');

require('dotenv').config();

const app = express();
app.use(express.json());

//JWT MIDDLEWARE 
app.use(jwtMiddleware);

const PORT = process.env.PORT || 3000;


app.use('/api', paintingRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong'});
})

app.listen(PORT, () => {
    console.log('server listening on port ', PORT);
})