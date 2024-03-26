import { cadDataOwnerModel } from "models";
import { Types } from "mongoose";
import { ICadDataOwner } from "ts";

async function findBySlug(slug: string) {
  return await cadDataOwnerModel.findOne({ slug }).exec();
}

async function findByEmail(email: string) {
  return await cadDataOwnerModel.findOne({ email });
}

async function findById(_id: string) {
  return await cadDataOwnerModel.findOne({ _id });
}

async function findAll() {
  return await cadDataOwnerModel.find();
}

async function create(dataValues: ICadDataOwner | any) {
  try {
    const newRecord = await cadDataOwnerModel.create(dataValues);
    return newRecord.toObject();
  } catch (error) {
    console.log("error:", error);
  }
}

async function update(_id: string, dataValues: ICadDataOwner | any) {
  try {
    const updated = await cadDataOwnerModel
    .findByIdAndUpdate(new Types.ObjectId(_id), dataValues, { new: true })
    .exec();
  return updated;
  } catch (error) {
    console.log("error:", error)
    
  }
}

const dataOwnerRepository = {
  findBySlug,
  findByEmail,
  findAll,
  findById,
  create,
  update,
};

export default dataOwnerRepository;
