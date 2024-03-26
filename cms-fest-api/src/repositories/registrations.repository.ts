import { registrationModel } from "models";
import { IRegistration } from "ts";

async function findById(_id: string) {
  return await registrationModel.findOne({_id}).exec();
}

 async function findAll() {
  return await registrationModel.find();
}

 async function create(dataValues: IRegistration) {
  try {
    const registration = await registrationModel.create(dataValues);
    return registration.toObject();
  } catch (error) {
    console.log("error:", error);
  }
}

 async function update(
  id: string,
  dataValues: IRegistration | any
) {
  const updated = await registrationModel
    .findByIdAndUpdate(id, dataValues, { new: true })
    .exec();
  return updated;
}

async function deleteOne(_id: string) {
  try {
    const registration = await registrationModel.deleteOne({ _id });
    return registration;
  } catch (error) {
    console.log("error:", error);
  }
}

const registrationRepositories = {
  findById,
  findAll,
  create,
  update,
  deleteOne
}

export default registrationRepositories;