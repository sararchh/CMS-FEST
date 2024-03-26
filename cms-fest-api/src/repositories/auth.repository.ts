import { excludeField } from "utils";
import { cadUsersModel } from "models";
import { ICadUser } from "ts";

export async function findById(_id: string) {
  const user = await cadUsersModel.findById(_id).exec();
  return excludeField(user, "password_hash");
}


export async function findByEmail(email: string) {
  try {
    return (await cadUsersModel.findOne({ email })).toObject();
  } catch (error) {
    console.log({ error });
  }
}

export async function create(dataValues: ICadUser | any) {
  try {
    const newRecord = await cadUsersModel.create(dataValues);
    return newRecord.toObject();
  } catch (error) {
    console.log("error:", error);
  }
}

export async function update(id: string, dataValues: ICadUser | any) {
  const updated = await cadUsersModel
    .findByIdAndUpdate(id, dataValues, { new: true })
    .exec();
  return updated;
}



const authRepository = {
  findById,
  findByEmail,
  create,
  update
}

export default authRepository;
