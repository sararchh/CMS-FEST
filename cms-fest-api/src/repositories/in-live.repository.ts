import { cadInLiveModel } from "models";
import { ICadInLive } from "ts";

async function findByUUID(uuid: string) {
  return await cadInLiveModel.findOne({ uuid }).exec();
}

async function findAll() {
  return await cadInLiveModel.find({ status: 1 }).sort({ date: -1 });
}

async function create(dataValues: ICadInLive) {
  try {
    const newRecord = await cadInLiveModel.create(dataValues);
    return newRecord.toObject();
  } catch (error) {
    console.log("error:", error);
  }
}

async function update(id: string, dataValues: ICadInLive | any) {
  const updated = await cadInLiveModel
    .findByIdAndUpdate(id, dataValues, { new: true })
    .exec();
  return updated;
}

async function deleteOne(_id: string) {
  try {
    const newRecord = await cadInLiveModel.findByIdAndUpdate(
      _id,
      { status: 2 },
      { new: true }
    );
    return newRecord;
  } catch (error) {
    console.log("error:", error);
  }
}

const inLiveRepositories = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne,
};

export default inLiveRepositories;
