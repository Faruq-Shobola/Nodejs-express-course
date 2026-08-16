const { MongoClient } = require('mongodb')

const mongoConnect  = callback => {
  const uri = 'mongodb://localhost:27017/';
  const client = MongoClient.connect(uri)
  .then((client)=>{
    const database = client.db('artisan')
    console.log('Connected')
    callback()
  }
  ).catch(err=> console.log(err))
}

module.exports = mongoConnect