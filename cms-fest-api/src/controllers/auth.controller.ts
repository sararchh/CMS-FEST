import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import { signIn, signUp, refreshToken } from '@/services/auth.service';
import { registerIsNotActiveError } from "errors";


export async function signInAuth (req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;

      let mailreceived = email.trim()
      const result = await signIn({ email: mailreceived, password });

      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      if (error?.name == "registerIsNotActiveError")
        return res
          .status(httpStatus.BAD_REQUEST)
          .send(registerIsNotActiveError());
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
  }

  export async function signUpAuth (req: Request, res: Response, next: NextFunction)  {
    try {
      const { email } = req.body;

      let mailreceived = email.trim()
      const result = await signUp({ ...req.body, email: mailreceived });
      return res.status(httpStatus.OK).send(result);
    } catch (error) {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
  }

  export async function refreshTokenAuth (req: Request, res: Response, next: NextFunction) {
    try {
      const { refresh } = req.body;
      const token = await refreshToken(refresh);
      return res.status(httpStatus.OK).send({ token });
    } catch (error) {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
  }
