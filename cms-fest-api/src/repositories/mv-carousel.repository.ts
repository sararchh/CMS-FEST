import { positionCarouselsModel, mvCarouselsModel } from "models";
import { SortOrder, Types } from "mongoose";
import { IMvCarousels } from "ts";

async function findByUUID(uuid: string) {
  return await mvCarouselsModel.findOne({ uuid }).exec();
}

async function findByIdPosition(id_position: string) {
  return await mvCarouselsModel
    .findOne({ id_position: new Types.ObjectId(id_position) })
    .exec();
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
      const position = await positionCarouselsModel.findOne({position: new RegExp(parbusca, "i")})
      Object.assign(conditionsFilter, { id_position: new Types.ObjectId(position?._id) });
    }

    const listCarousel = await mvCarouselsModel
      .find(conditionsFilter)
      .populate("id_position")
      .skip(skip)
      .limit(Number(limit))
      .sort(sort)
      .exec();

    const total = await mvCarouselsModel.countDocuments(conditionsFilter);
    const totalPages = Math.ceil(total / Number(limit));

    return { total, current_page: page, pages: totalPages, data: listCarousel };
  } catch (error) {
    console.log("error:", error);
  }
}

async function create(dataValues: IMvCarousels) {
  try {
    const newRecord = await mvCarouselsModel.create(dataValues);
    return newRecord.toObject();
  } catch (error) {
    console.log("error:", error);
  }
}

async function update(id: string, dataValues: IMvCarousels | any) {
  try {
    if (dataValues.url) {
      const updated = await mvCarouselsModel.findByIdAndUpdate(id, 
        { $push: { url: dataValues.url } },
        { new: true }
      ).exec();
      return updated;
    } else {
      const updated = await mvCarouselsModel.findByIdAndUpdate(id, 
        dataValues, 
        { new: true }
      ).exec();
      return updated;
    }
  } catch (error) {
    // console.log("error:", error);
  }
}


async function deleteOne(_id: string) {
  try {
    const newRecord = await mvCarouselsModel.deleteOne({ _id });
    return newRecord;
  } catch (error) {
    console.log("error:", error);
  }
}

async function deleteURLFromCarousel(_id: string, urlToDelete: string) {
  try {
    const result = await mvCarouselsModel.findByIdAndUpdate(
      _id,
      { $pull: { url: urlToDelete } },
      { new: true } // Retorna o documento atualizado
    );
    return result;
  } catch (error) {
    console.error("Erro ao deletar URL:", error);
  }
}


const mvCarouselRepositories = {
  findByUUID,
  findByIdPosition,
  findAll,
  create,
  update,
  deleteOne,
  deleteURLFromCarousel
};

export default mvCarouselRepositories;
