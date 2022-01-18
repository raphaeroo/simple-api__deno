import { Bson } from "https://deno.land/x/mongo@v0.29.0/mod.ts";

export interface IUser {
  _id: Bson.ObjectId;
  name: string;
  email: string;
  create_at: Date;
  update_at: Date;
}
