import { Router } from "express";
import { ContactController } from "./contact.controller";
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware";
import { processImageMiddleware, uploadMiddleware } from "../../middlewares/upload.middleware";

export const ContactRouter = Router();

ContactRouter.get("/", authenticateMiddleware, ContactController.getAll);
ContactRouter.get("/:id", authenticateMiddleware, ContactController.getContactById);

ContactRouter.post(
    "/",
    authenticateMiddleware,
    uploadMiddleware.single("avatar"),
    processImageMiddleware(false, 300),
    ContactController.create,
);