import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { Database, getDatabase } from "firebase-admin/database";
import { App, initializeApp } from "firebase-admin/app";

const firebaseConfig = {
  projectId: "demo-project-id",
  databaseURL: "http://127.0.0.1:9000/?ns=demo-project-id-default-rtdb",
};

let firebaseInitialized = false;
let app: App, rtdb: Database;

const initializeFirebase = () => {
  if (!firebaseInitialized) {
    app = initializeApp(firebaseConfig);
    rtdb = getDatabase(app);
    firebaseInitialized = true;
  }

  return { app, rtdb };
};

export const addData = onRequest(async (req, res) => {
  const { rtdb } = initializeFirebase();

  const rootRef = rtdb.ref();
  const dataUpdates: { [key: string]: any } = {};

  dataUpdates[`data/${rootRef.push().key}`] = { updatedAt: new Date() };

  await rootRef.update(dataUpdates);

  logger.info("Data added!");
  res.status(200).json({});
});
