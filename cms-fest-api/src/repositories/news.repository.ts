import { cadNewsModel } from "models";
import { SortOrder } from "mongoose";
import { ICadNews } from "ts";

async function findBySlug(slug: string) {
  return await cadNewsModel.findOne({ slug }).exec();
}

async function findByUUID(uuid: string) {
  return await cadNewsModel.findOne({ uuid }).exec();
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
    Object.assign(conditionsFilter, { title: new RegExp(parbusca, "i") });
  }

  const listContact = await cadNewsModel
    .find(conditionsFilter)
    .skip(skip)
    .limit(Number(limit))
    .sort(sort)
    .exec();

  const total = await cadNewsModel.countDocuments(conditionsFilter);
  const totalPages = Math.ceil(total / Number(limit));

  return { total, current_page: page, pages: totalPages, data: listContact };
}

async function create(dataValues: ICadNews) {
  try {
    const newRecord = await cadNewsModel.create(dataValues);
    return newRecord.toObject();
  } catch (error) {
    console.log("error:", error);
  }
}

async function update(id: string, dataValues: ICadNews | any) {
  const updated = await cadNewsModel
    .findByIdAndUpdate(id, dataValues, { new: true })
    .exec();
  return updated;
}

async function deleteOne(_id: string) {
  try {
    const newRecord = await cadNewsModel.deleteOne({ _id });
    return newRecord;
  } catch (error) {
    console.log("error:", error);
  }
}

const newsRepositories = {
  findBySlug,
  findByUUID,
  findAll,
  create,
  update,
  deleteOne,
};

export default newsRepositories;
