import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  url: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USERS_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE_POSTS_ID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_ID,
};

const client = new Client()

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
