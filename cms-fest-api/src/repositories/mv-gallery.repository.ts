import { mvGalleryModel } from "models";
import { SortOrder } from "mongoose";
import { IMvGallery } from "ts";

 async function findByUUID(uuid: string) {
  return await mvGalleryModel.findOne({uuid}).exec();
}

export async function findAll(
  parbusca: string | any,
  page: number,
  limit: number,
  order: string,
  orderType: string
) {
  try {
    const skip = Number(page) * Number(limit) - Number(limit);
    const sort: [string, SortOrder][] = [[order, orderType === "ASC" ? 1 : -1]];

    const conditionsFilter = {};

    if (Boolean(parbusca)) {
      // Object.assign(conditionsFilter, { $text: { $search: parbusca } });
      Object.assign(conditionsFilter, { name: new RegExp(parbusca, "i") });
    }

    const listGallery = await mvGalleryModel
      .find(conditionsFilter, { password_hash: 0 })
      .skip(skip)
      .limit(Number(limit))
      .sort(sort)
      .exec();

    const total = await mvGalleryModel.countDocuments(conditionsFilter);
    const totalPages = Math.ceil(total / Number(limit));

    return { total, current_page: page, pages: totalPages, data: listGallery };
  } catch (error) {
    console.log("error:", error);
  }
}


 async function create(dataValues: IMvGallery) {
  try {
    const newRecord = await mvGalleryModel.create(dataValues);
    return newRecord.toObject();
  } catch (error) {
    console.log("error:", error);
  }
}

 async function update(
  id: string,
  dataValues: IMvGallery | any
) {
  const updated = await mvGalleryModel
    .findByIdAndUpdate(id, dataValues, { new: true })
    .exec();
  return updated;
}

async function deleteOne(_id: string) {
  try {
    const newRecord = await mvGalleryModel.deleteOne({ _id });
    return newRecord;
  } catch (error) {
    console.log("error:", error);
  }
}

const mvGalleryRepositories = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne
}

export default mvGalleryRepositories;