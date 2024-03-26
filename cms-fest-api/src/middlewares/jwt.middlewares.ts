import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import httpStatus from "http-status";
import authConfig from '@/config/auth.config';
import { tokenNotFoundError } from 'errors';

import { ISessionStore } from 'ts';


export const checkjwt = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(httpStatus.UNAUTHORIZED).json(tokenNotFoundError(""));
  }

  try {
    const accessToken = req.headers.authorization.split(' ')[1]; // receber do header de forma desestruturada para pegar somente o token pois a posicao [0] é o bearer

    // const decoded = await promisify(jwt.verify)(accessToken, authConfig.secret);
    const decoded = await <any>jwt.verify(accessToken, authConfig.secret) as ISessionStore;
    // console.log('decoded', decoded);

    req.userId = decoded.userId;

    return next();

  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json(tokenNotFoundError(""));
  }

}
