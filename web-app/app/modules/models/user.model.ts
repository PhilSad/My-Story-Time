import { Instance, types } from "mobx-state-tree";

export const UserModel = types.model("UserModel", {
  userId: types.string,
  userImages: types.array(types.string),
});

export type UserModelType = Instance<typeof UserModel>;
