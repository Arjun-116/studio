import {initializeApp, getApps, getApp, cert, App} from 'firebase-admin/app';
import {getAuth, Auth} from 'firebase-admin/auth';

let app: App | undefined;
let auth: Auth;

try {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : undefined;

  if (serviceAccount?.project_id) {
    app =
      getApps().length > 0
        ? getApp()
        : initializeApp({
            credential: cert(serviceAccount),
          });

    auth = getAuth(app);
  } else {
    console.warn(
      'Firebase Admin SDK not initialized. Missing FIREBASE_SERVICE_ACCOUNT environment variable.'
    );
    // Provide a mock auth object to avoid breaking the app
    auth = {} as Auth;
  }
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error);
  // Provide a mock auth object to avoid breaking the app
  auth = {} as Auth;
}

export {auth, app};
