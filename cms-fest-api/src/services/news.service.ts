import {
  UnableToCreateRegister,
  UnableToUpdateRegister,
  registerAlreadyExistsError,
  registerNotExistsError,
} from "@/errors";

import newsRepositories from "@/repositories/news.repository";

import { ICadNews } from "ts";

async function findAll(
  parbusca: string | any,
  page: number,
  limit: number,
  order: string,
  orderType: string
): Promise<ICadNews[] | any> {
  const news = await newsRepositories.findAll(
    parbusca,
    page,
    limit,
    order,
    orderType
  );
  return news;
}

async function findBySlug(slug: string): Promise<ICadNews | {}> {
  const news: ICadNews = await newsRepositories.findBySlug(slug);
  return news;
}

async function findByUUID(uuid: string): Promise<ICadNews | null> {
  const news: ICadNews = await newsRepositories.findByUUID(uuid);
  return news;
}

async function create(dataValues: ICadNews): Promise<ICadNews | {}> {
  try {
    const newsExists = await newsRepositories.findBySlug(dataValues.slug);

    if (newsExists) {
      throw registerAlreadyExistsError();
    }

    const news: ICadNews = await newsRepositories.create(dataValues);
    return news;
  } catch (error) {
    throw UnableToCreateRegister();
  }
}

async function update(
  uuid: string,
  dataValues: Partial<ICadNews>
): Promise<ICadNews | {}> {
  try {
    const newsExists: ICadNews = await newsRepositories.findByUUID(uuid);

    if (!newsExists) {
      throw registerNotExistsError();
    }

    const news: ICadNews = await newsRepositories.update(
      newsExists._id,
      dataValues
    );
    return news;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

async function deleteOne(uuid: string): Promise<ICadNews | {}> {
  try {
    const newsExists: ICadNews = await newsRepositories.findByUUID(uuid);

    if (!newsExists) {
      throw registerNotExistsError();
    }

    const news = await newsRepositories.deleteOne(newsExists._id);
    return news;
  } catch (error) {
    throw UnableToUpdateRegister();
  }
}

const newsService = {
  findBySlug,
  findAll,
  findByUUID,
  create,
  update,
  deleteOne,
};

export default newsService;
