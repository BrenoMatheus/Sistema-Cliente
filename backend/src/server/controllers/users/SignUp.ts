import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { UsersProvider } from "../../database/providers/user";
import { validation } from "../../shared/middleware";
import { IUser } from "../../database/models";

interface IBodyProps extends Omit<IUser, "id"> {}

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3),
      email: yup.string().required().min(6).email(),
      password: yup.string().required().min(6),
      longitude: yup.number().required(),
      latitude: yup.number().required(),
    })
  ),
}));

export const signUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await UsersProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
