import { Router } from "express";

import {
  ClientController,
  UsersController,
} from "./../controllers";
import { ensureAuthenticated } from "../shared/middleware/EnsureAuthenticated";

const router = Router();

router.get("/", (_, res) => {
  return res.send("Olá, DEV!");
});

// route Client
router.get(
  "/clients",
  ensureAuthenticated,
  ClientController.getAllValidation,
  ClientController.getAll
);
router.post(
  "/clients",
  ensureAuthenticated,
  ClientController.createValidation,
  ClientController.create
);
router.get(
  "/clients/:id",
  ensureAuthenticated,
  ClientController.getByIdValidation,
  ClientController.getById
);
router.put(
  "/clients/:id",
  ensureAuthenticated,
  ClientController.updateByIdValidation,
  ClientController.updateById
);
router.delete(
  "/clients/:id",
  ensureAuthenticated,
  ClientController.deleteByIdValidation,
  ClientController.deleteById
);

router.post(
  "/entrar",
  UsersController.signInValidation,
  UsersController.signIn
);
router.post(
  "/cadastrar",
  UsersController.signUpValidation,
  UsersController.signUp
);

export { router };