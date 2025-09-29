
const admin = require('firebase-admin');

if (process.env.NODE_ENV !== 'test') {
  // IMPORTANT: In a real environment, the service account key should be handled securely,
  // e.g., via environment variables or a secret manager.
  // const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

  // admin.initializeApp({
  //   credential: admin.credential.cert(serviceAccount),
  //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  // });
}

module.exports = { admin };
