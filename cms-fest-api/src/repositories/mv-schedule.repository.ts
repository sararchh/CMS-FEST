import { mvScheduleModel } from "models";
import { SortOrder } from "mongoose";
import { IMvSchedule } from "ts";

async function findByUUID(uuid: string) {
  return await mvScheduleModel.findOne({ uuid }).exec();
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
    Object.assign(conditionsFilter);
  }

  const listSchedule = await mvScheduleModel
    .find(conditionsFilter)
    .skip(skip)
    .limit(Number(limit))
    .sort(sort)
    .exec();

  const total = await mvScheduleModel.countDocuments(conditionsFilter);
  const totalPages = Math.ceil(total / Number(limit));

  return { total, current_page: page, pages: totalPages, data: listSchedule };
}

async function create(dataValues: IMvSchedule) {
  try {
    const newRecord = await mvScheduleModel.create(dataValues);
    return newRecord.toObject();
  } catch (error) {
    console.log("error:", error);
  }
}

async function update(id: string, dataValues: IMvSchedule | any) {
  const updated = await mvScheduleModel
    .findByIdAndUpdate(id, dataValues, { new: true })
    .exec();
  return updated;
}

async function deleteOne(_id: string) {
  try {
    const newRecord = await mvScheduleModel.deleteOne({ _id });
    return newRecord;
  } catch (error) {
    console.log("error:", error);
  }
}

const mvScheduleRepositories = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne,
};

export default mvScheduleRepositories;
