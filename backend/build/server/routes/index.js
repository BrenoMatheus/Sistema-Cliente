"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("./../controllers");
const EnsureAuthenticated_1 = require("../shared/middleware/EnsureAuthenticated");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (_, res) => {
    return res.send("Olá, DEV!");
});
// route Client
router.get("/clients", EnsureAuthenticated_1.ensureAuthenticated, controllers_1.ClientController.getAllValidation, controllers_1.ClientController.getAll);
router.post("/clients", EnsureAuthenticated_1.ensureAuthenticated, controllers_1.ClientController.createValidation, controllers_1.ClientController.create);
router.get("/clients/:id", EnsureAuthenticated_1.ensureAuthenticated, controllers_1.ClientController.getByIdValidation, controllers_1.ClientController.getById);
router.put("/clients/:id", EnsureAuthenticated_1.ensureAuthenticated, controllers_1.ClientController.updateByIdValidation, controllers_1.ClientController.updateById);
router.delete("/clients/:id", EnsureAuthenticated_1.ensureAuthenticated, controllers_1.ClientController.deleteByIdValidation, controllers_1.ClientController.deleteById);
router.post("/entrar", controllers_1.UsersController.signInValidation, controllers_1.UsersController.signIn);
router.post("/cadastrar", controllers_1.UsersController.signUpValidation, controllers_1.UsersController.signUp);
