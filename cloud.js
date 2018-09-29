const {Storage} = require('@google-cloud/storage');

const storage = new Storage;

const bucketName = 'quickbase-bucket';
const filename = '/Users/Toy_Reid/testfile.txt';

storage
  .bucket(bucketName)
  .upload(filename, {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
  })
  .then(() => {
    console.log(`${filename} uploaded to ${bucketName}.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });