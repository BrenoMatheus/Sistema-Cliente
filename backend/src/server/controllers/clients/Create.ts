import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

import { ClientProvider } from "../../database/providers/clients";
import { IClient } from "../../database/models";
import { validation } from "../../shared/middleware";

interface IBodyProps extends Omit<IClient, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3).max(70),
      email: yup.string().required().email(),
      telephone: yup.number().required(),
      longitude: yup.number().required(),
      latitude: yup.number().required(),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await ClientProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
