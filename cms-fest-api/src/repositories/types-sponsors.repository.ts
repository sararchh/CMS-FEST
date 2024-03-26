import { cadTypeSponsorsModel } from "models";
import { ICadTypeSponsors } from "ts";

async function findByUUID(uuid: string) {
  return await cadTypeSponsorsModel.findOne({ uuid }).exec();
}

async function findAll() {
  return await cadTypeSponsorsModel.aggregate([
    {
      $lookup: {
        from: "cad_sponsors",
        localField: "_id",
        foreignField: "id_type",
        as: "items",
      },
    },
    {
      $sort: { order: 1 },
    }
  ]);
}

async function create(dataValues: ICadTypeSponsors) {
  try {
    const newRecord = await cadTypeSponsorsModel.create(dataValues);
    return newRecord.toObject();
  } catch (error) {
    console.log("error:", error);
  }
}

async function update(id: string, dataValues: ICadTypeSponsors | any) {
  const updated = await cadTypeSponsorsModel
    .findByIdAndUpdate(id, dataValues, { new: true })
    .exec();
  return updated;
}

async function deleteOne(_id: string) {
  try {
    const newRecord = await cadTypeSponsorsModel.deleteOne({ _id });
    return newRecord;
  } catch (error) {
    console.log("error:", error);
  }
}

const typeSponsorsRepositories = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne,
};

export default typeSponsorsRepositories;
