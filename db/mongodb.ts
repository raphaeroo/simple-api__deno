import { MongoClient } from "https://deno.land/x/mongo@v0.29.0/mod.ts";
import { DB_HOST, DB_NAME } from "../config.ts";

const client = new MongoClient();

await client.connect(DB_HOST);

const db = client.database(DB_NAME);

export default db;
