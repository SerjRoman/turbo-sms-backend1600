import { Router } from "express";
import {
	processImageMiddleware,
	uploadMiddleware,
} from "../middlewares/upload.middleware";
import { authenticateMiddleware } from "../middlewares/authenticate.middleware";
import { UserRoutes } from "../modules/user/user.routes";
import { contactRoutes } from "../modules/contact/contact.routes";

export const appRoutes = Router();

appRoutes.use("/users/", UserRoutes);
appRoutes.use("/contacts", authenticateMiddleware, contactRoutes);

appRoutes.get("/health", (req, res) => {
	res.json({
		status: "OK",
		timestamp: Date.now(),
	});
});
appRoutes.post(
	"/test-image-upload",
	uploadMiddleware.single("image"),
	processImageMiddleware(true, 600, 1),
	(req, res) => {
		res.json({
			status: "success",
			filename: req.file?.filename,
		});
	},
);

appRoutes.use("*", (req, res) => {
	res.status(404).json({
		message: "Not Found",
		error: "404",
	});
});
