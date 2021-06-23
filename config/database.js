const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(connect => console.log(`Connected to MongoDB at ${db.host}:${db.port}`))
  .catch(e => console.log('could not connect to MongoDB', e))

  const db = mongoose.connection;
