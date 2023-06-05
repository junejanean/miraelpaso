import * as admin from 'firebase-admin';

// Only initialize the app if it hasn't been initialized yet
if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
			private_key: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
			client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
		}),
		databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	});
}

// Get the Firestore service from the Firebase Admin SDK
const db = admin.firestore();

export { db };
