// src/modules/shared/types/jwt-payload.type.ts

export type JwtPayload = {
  sub: string; // user id (JWT standard name for "subject")
  email: string;
};
