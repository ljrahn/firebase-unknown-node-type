import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
  Database,
  connectDatabaseEmulator,
  getDatabase,
} from "firebase/database";

declare global {
  var EMULATORS_STARTED: boolean;
}
const EMULATORS_STARTED = "EMULATORS_STARTED";
let app: FirebaseApp, rtdb: Database;

const connectEmulator = () => {
  if (!global[EMULATORS_STARTED]) {
    global[EMULATORS_STARTED] = true;

    connectDatabaseEmulator(rtdb, "127.0.0.1", 9000);
  }
};

export const initializeFirebase = () => {
  const firebaseConfig = {
    projectId: "demo-project-id",
    databaseURL: "http://127.0.0.1:9000/?ns=demo-project-id-default-rtdb",
  };

  app = initializeApp(firebaseConfig);
  rtdb = getDatabase(app);

  connectEmulator();

  return { app, rtdb };
};
