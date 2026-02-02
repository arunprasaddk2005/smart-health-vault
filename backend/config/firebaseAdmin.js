const admin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = {
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const bucket = admin.storage().bucket();

// Verify the bucket exists at startup and provide a clear error if not
(async () => {
    try {
        const [exists] = await bucket.exists();
        if (!exists) {
            console.error(`Firebase Storage bucket "${process.env.FIREBASE_STORAGE_BUCKET}" does not exist. Please create the bucket in the Firebase Console (Storage) or update FIREBASE_STORAGE_BUCKET in backend/.env to the correct name, then restart the server.`);
        } else {
            console.log(`Firebase Storage bucket verified: ${process.env.FIREBASE_STORAGE_BUCKET}`);
        }
    } catch (err) {
        console.error('Error checking Firebase storage bucket:', err && err.message ? err.message : err);
    }
})();

module.exports = { admin, bucket };