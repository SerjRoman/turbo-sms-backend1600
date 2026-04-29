import { Router } from "express";
import {
	processImageMiddleware,
	uploadMiddleware,
} from "../middlewares/upload.middleware";
import { UserRoutes } from "../modules/user/user.routes";
import { ContactRouter } from "../modules/contact/contact.routes";

export const appRoutes = Router();

appRoutes.use("/users/", UserRoutes);
appRoutes.use("/contacts/", ContactRouter)


appRoutes.get("/health", (req, res) => {
	res.json({
		status: "OK",
		timestamp: Date.now(),
	});
});
appRoutes.post(
	"/test-image-upload",
	uploadMiddleware.single("image"),
	processImageMiddleware(true, 600),
	(req, res) => {
		res.json({
			status: "success",
			filename: req.file?.filename,
		});
	},
);
