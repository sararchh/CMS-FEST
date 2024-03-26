import { cadSponsorsModel } from "models";
import { ICadSponsors } from "ts";

async function findByUUID(uuid: string) {
  return await cadSponsorsModel.findOne({ uuid }).exec();
}

async function findAll() {
  return await cadSponsorsModel.find().populate('id_type').exec();
}

async function create(dataValues: ICadSponsors) {
  try {
    const newRecord = await cadSponsorsModel.create(dataValues);
    return newRecord.toObject();
  } catch (error) {
    console.log("error:", error);
  }
}

async function update(id: string, dataValues: Partial<ICadSponsors>) {
  const updated = await cadSponsorsModel
    .findByIdAndUpdate(id, dataValues, { new: true })
    .exec();
  return updated;
}

async function deleteOne(_id: string) {
  try {
    const newRecord = await cadSponsorsModel.deleteOne({ _id });
    return newRecord;
  } catch (error) {
    console.log("error:", error);
  }
}

const sponsorsRepositories = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne
};

export default sponsorsRepositories;
