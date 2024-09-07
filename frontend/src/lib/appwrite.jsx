import { Client, Account } from "appwrite";

export const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("66da897d0032eb3fe2e9");

export const account = new Account(client);
export { ID } from "appwrite";
