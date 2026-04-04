import { Router } from "express";
import {
	processImageMiddleware,
	uploadMiddleware,
} from "../middlewares/upload.middleware";
import { UserRoutes } from "../modules/user/user.routes";

export const appRoutes = Router();

appRoutes.use("/users/", UserRoutes);

appRoutes.get("/health", (req, res) => {
	res.json({
		status: "OK",
		timestamp: Date.now(),
	});
});
appRoutes.post(
	"/test-image-upload",
	uploadMiddleware.single("image"),
	processImageMiddleware(600, 1),
	(req, res) => {
		res.json({
			status: "success",
			filename: req.file?.filename,
		});
	},
);
