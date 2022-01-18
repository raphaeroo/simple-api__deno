import type { Response, Request } from "https://deno.land/x/oak/mod.ts";

import { IUser } from "../model/user.ts";
import UserRepository from "../repositories/user.ts";

interface IUserController {
  getUsers: {
    response: Response;
  };
  getUser: {
    params: { id: string };
    response: Response;
  };
  createUser: {
    request: Request;
    response: Response;
  };
  updateUser: {
    params: { id: string };
    request: Request;
    response: Response;
  };
  deleteUser: {
    params: { id: string };
    response: Response;
  };
}

const userRespository = new UserRepository();

const getUsers = async ({ response }: IUserController["getUsers"]) => {
  const allUsers = await userRespository.getAll();

  response.status = 200;
  response.body = allUsers;
};

const getUser = async ({ params, response }: IUserController["getUser"]) => {
  const user: IUser | undefined = await userRespository.getUserById(params.id);

  if (user) {
    response.status = 200;
    response.body = user;
  } else {
    response.status = 404;
    response.body = { message: "User not found" };
  }
};

const createUser = async ({
  request,
  response,
}: IUserController["createUser"]) => {
  const body = request.body();
  const user: IUser = await body.value;

  userRespository.createUser(user);

  response.body = { message: "User created successfully" };
  response.status = 200;
};

const updateUser = async ({
  params,
  request,
  response,
}: IUserController["updateUser"]) => {
  const user: IUser | undefined = await userRespository.getUserById(params.id);

  if (user) {
    const body = request.body();
    const updateData: { name?: string; email?: string } = await body.value;

    const updateUserFields: Partial<IUser> = {
      name: updateData.name || user.name,
      email: updateData.email || user.email,
    };

    const update: IUser = {
      ...user,
      ...updateUserFields,
    };

    await userRespository.updateUser(params.id, update);

    response.status = 200;
    response.body = { message: "User updated successfully" };
  } else {
    response.status = 404;
    response.body = { message: "User not found" };
  }
};

const deleteUser = async ({
  params,
  response,
}: IUserController["deleteUser"]) => {
  const count = await userRespository.deleteUser(params.id);

  if (count > 0) {
    response.status = 200;
    response.body = { message: "User deleted successfully" };
  } else {
    response.status = 404;
    response.body = { message: "User not found" };
  }
};

export { getUser, getUsers, createUser, updateUser, deleteUser };
