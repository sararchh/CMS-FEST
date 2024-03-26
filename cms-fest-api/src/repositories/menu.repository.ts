import { cadMenuModel } from "models";
import { ICadMenu } from "ts";

 async function findByUUID(uuid: string) {
  return await cadMenuModel.findOne({uuid}).exec();
}

 async function findAll() {
  return await cadMenuModel.find();
}

 async function create(dataValues: Partial<ICadMenu>) {
  try {
    const newRecord = await cadMenuModel.create(dataValues);
    return newRecord.toObject();
  } catch (error) {
    console.log("error:", error);
  }
}

 async function update(
  id: string,
  dataValues: ICadMenu | any
) {
  const updated = await cadMenuModel
    .findByIdAndUpdate(id, dataValues, { new: true })
    .exec();
  return updated;
}

async function deleteOne(_id: string) {
  try {
    const newRecord = await cadMenuModel.deleteOne({ _id });
    return newRecord;
  } catch (error) {
    console.log("error:", error);
  }
}

const menuRepositories = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne
}

export default menuRepositories;