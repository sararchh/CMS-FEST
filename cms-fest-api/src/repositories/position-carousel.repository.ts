import { positionCarouselsModel } from "models";
import { SortOrder } from "mongoose";
import { ICadPositionCarousel } from "ts";

async function findByUUID(uuid: string) {
  return await positionCarouselsModel.findOne({ uuid }).exec();
}

export async function findAll(
  parbusca: string = "",
  page: number = 1,
  limit: number = 8,
  order: string = "position",
  orderType: string = "ASC"
) {
  try {
    const skip = Number(page) * Number(limit) - Number(limit);
    const sort: [string, SortOrder][] = [[order, orderType === "ASC" ? 1 : -1]];

    const conditionsFilter = {};

    if (Boolean(parbusca)) {
      Object.assign(conditionsFilter, { position: new RegExp(parbusca, "i") });
    }

    const listPosition = await positionCarouselsModel
      .find(conditionsFilter)
      .skip(skip)
      .limit(Number(limit))
      .sort(sort)
      .exec();

    const total = await positionCarouselsModel.countDocuments(conditionsFilter);
    const totalPages = Math.ceil(total / Number(limit));

    return { total, current_page: page, pages: totalPages, data: listPosition };
  } catch (error) {
    console.log("error:", error);
  }
}

async function create(dataValues: ICadPositionCarousel | any) {
  try {
    const newRecord = await positionCarouselsModel.create(dataValues);
    return newRecord.toObject();
  } catch (error) {
    console.log("error:", error);
  }
}

async function update(id: string, dataValues: ICadPositionCarousel | any) {
  const updated = await positionCarouselsModel
    .findByIdAndUpdate(id, dataValues, { new: true })
    .exec();
  return updated;
}

async function deleteOne(_id: string) {
  try {
    const newRecord = await positionCarouselsModel.deleteOne({ _id });
    return newRecord;
  } catch (error) {
    console.log("error:", error);
  }
}

const PositionCarouselRepositories = {
  findByUUID,
  findAll,
  create,
  update,
  deleteOne,
};

export default PositionCarouselRepositories;
