// src/services/indexedDb.ts

import { openDB } from "idb";

const DB_NAME = "FormFlowAI";
const DB_VERSION = 1;

const FILE_STORE = "files";

export const dbPromise = openDB(
  DB_NAME,
  DB_VERSION,
  {
    upgrade(db) {
      if (!db.objectStoreNames.contains(FILE_STORE)) {
        db.createObjectStore(FILE_STORE);
      }
    },
  }
);

/**
 * Save file/blob locally
 */
export async function saveFile(
  key: string,
  file: Blob
) {
  const db = await dbPromise;

  await db.put(
    FILE_STORE,
    file,
    key
  );
}

/**
 * Get file/blob
 */
export async function getFile(
  key: string
): Promise<Blob | undefined> {
  const db = await dbPromise;

  return db.get(
    FILE_STORE,
    key
  );
}

/**
 * Delete file
 */
export async function deleteFile(
  key: string
) {
  const db = await dbPromise;

  await db.delete(
    FILE_STORE,
    key
  );
}

/**
 * Clear everything
 */
export async function clearAllFiles() {
  const db = await dbPromise;

  await db.clear(FILE_STORE);
}

/**
 * Get all stored keys
 */
export async function getAllKeys() {
  const db = await dbPromise;

  return db.getAllKeys(FILE_STORE);
}