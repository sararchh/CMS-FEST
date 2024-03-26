import { mvContatoModel } from "models";
import { SortOrder } from "mongoose";
import { IMvContato } from "ts";

async function findByUUID(uuid: string) {
  return await mvContatoModel.findOne({ uuid }).exec();
}

async function findAll(
  parbusca: string | any,
  page: number,
  limit: number,
  order: string,
  orderType: string
) {

  const skip = Number(page) * Number(limit) - Number(limit);
  const sort: [string, SortOrder][] = [[order, orderType === "ASC" ? 1 : -1]];

  const conditionsFilter = {};
  
  if (Boolean(parbusca)) {
    Object.assign(conditionsFilter, { name: new RegExp(parbusca, "i") });
  }

  const listContact = await mvContatoModel
    .find(conditionsFilter)
    .skip(skip)
    .limit(Number(limit))
    .sort(sort)
    .exec();

  const total = await mvContatoModel.countDocuments(conditionsFilter);
  const totalPages = Math.ceil(total / Number(limit));

  return { total, current_page: page, pages: totalPages, data: listContact };
}

async function create(dataValues: IMvContato) {
  try {
    const newRecord = await mvContatoModel.create(dataValues);
    return newRecord.toObject();
  } catch (error) {
    console.log("error:", error);
  }
}

async function update(id: string, dataValues: IMvContato | any) {
  const updated = await mvContatoModel
    .findByIdAndUpdate(id, dataValues, { new: true })
    .exec();
  return updated;
}

async function deleteOne(_id: string) {
  try {
    const newRecord = await mvContatoModel.deleteOne({ _id });
    return newRecord;
  } catch (error) {
    console.log("error:", error);
  }
}

const mvContatoRepositories = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne,
};

export default mvContatoRepositories;
