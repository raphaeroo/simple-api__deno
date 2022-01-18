import { Bson } from "https://deno.land/x/mongo@v0.29.0/mod.ts";

import db from "../db/mongodb.ts";
import { IUser } from "../model/user.ts";

class UserRepository {
  private usersCollection = db.collection<IUser>("users");

  async getAll() {
    const users = await this.usersCollection.find().toArray();

    return users;
  }

  async createUser(user: IUser) {
    await this.usersCollection.insertOne({
      name: user.name,
      email: user.email,
      create_at: new Date(),
      update_at: new Date(),
    });
  }

  async getUserById(id: string) {
    const user: IUser | undefined = await this.usersCollection.findOne({
      _id: new Bson.ObjectId(id),
    });

    return user;
  }

  async updateUser(id: string, user: IUser) {
    await this.usersCollection.updateOne(
      {
        _id: new Bson.ObjectId(id),
      },
      {
        $set: {
          ...user,
          update_at: new Date(),
        },
      }
    );
  }

  async deleteUser(id: string) {
    const count = await this.usersCollection.deleteOne({
      _id: new Bson.ObjectId(id),
    });

    return count;
  }
}

export default UserRepository;
