import { excludeField } from "@/utils";
import { cadUsersModel } from "models";
import { PipelineStage, SortOrder } from "mongoose";
import { ICadUser } from "ts";

export async function findOneWithRelations(id: string) {
  const user = await cadUsersModel.findOne({ _id: id }).lean().exec();
  return excludeField(user, "password_hash");
}

async function updateUser(id: string, dataValues: ICadUser | any) {
  const updated = await cadUsersModel
    .findByIdAndUpdate(id, dataValues, { new: true })
    .exec();
  return updated;
}

export async function findAll(
  parbusca: string | any,
  page: number,
  limit: number,
  order: string,
  orderType: string,
  isAdmin: boolean
) {
  try {
    const skip = Number(page) * Number(limit) - Number(limit);
    const sort: [string, SortOrder][] = [[order, orderType === "ASC" ? 1 : -1]];

    const conditionsFilter = {};

    if (!isAdmin) {
      Object.assign(conditionsFilter, { isAdmin: false });
    }
    if (Boolean(parbusca)) {
      // Object.assign(conditionsFilter, { $text: { $search: parbusca } });
      Object.assign(conditionsFilter, { name: new RegExp(parbusca, "i") });
    }

    const listUsers = await cadUsersModel
      .find(conditionsFilter, { password_hash: 0 })
      .skip(skip)
      .limit(Number(limit))
      .sort(sort)
      .exec();

    const total = await cadUsersModel.countDocuments(conditionsFilter);
    const totalPages = Math.ceil(total / Number(limit));

    return { total, current_page: page, pages: totalPages, data: listUsers };
  } catch (error) {
    console.log("error:", error);
  }
}

const userRepository = {
  findOneWithRelations,
  findAll,
  updateUser,
};

export default userRepository;
