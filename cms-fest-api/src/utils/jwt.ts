import jwt from 'jsonwebtoken';

import authConfig from '@/config/auth.config';

export function generateToken(params: any) {
  return jwt.sign(params, authConfig.secret, { expiresIn: authConfig.expiresIn })
}


export function generateRefreshToken(user: any) {
  return jwt.sign(JSON.stringify(user), authConfig.refreshSecret)
}


export function jwtVerify(refresh: any) {
  return jwt.verify(refresh, authConfig.refreshSecret);
}

