const Clarifai = require('clarifai');
const cloudinary = require('cloudinary');

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_APIKEY
});

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINAEY_APIKEY, 
  api_secret: process.env.CLOUDINAEY_APISECRET
})

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) => {
  const { id } = req.body;

  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

const uploadImage = (req, res) => {
  const values = Object.values(req.files)
  const promises = values.map(image => cloudinary.uploader.upload(image.path))

  Promise
    .all(promises)
    .then(results => res.json(results))
    .catch((err) => res.status(400).json(err))
}



module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
  uploadImage:uploadImage
}
