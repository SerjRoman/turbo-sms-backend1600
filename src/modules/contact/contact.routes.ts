import { Router } from "express";
import { ContactController } from "./contact.controller";
import { validateMiddleware } from "../../middlewares/validate.middleware";
import { createContactSchema } from "./contact.schema";
// import {
//     processImageMiddleware,
//     uploadMiddleware,
// } from "../../middlewares/upload.middleware";
import { authenticateMiddleware } from "../../middlewares/authenticate.middleware";

export const ContactRoutes = Router();

ContactRoutes.get("/", authenticateMiddleware, ContactController.getAllContactsByOwner);

ContactRoutes.get("/:id", authenticateMiddleware, ContactController.getContactById);

ContactRoutes.post(
    "/",
    authenticateMiddleware,
    // uploadMiddleware.single("avatar"),
    // validateMiddleware(createContactSchema),
    // processImageMiddleware(false, 300, 80),
    ContactController.createContact,
);
