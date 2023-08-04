const { Router } = require('express');
const { EpisodeController } = require('../../http/controllers/adminControllers/course/episode.controller');
const { videoUploader } = require('../../utils/multer/video.uploader');
const { checkPermission } = require('../../http/middlewares/permission.guard');
const { PERMISSIONS } = require('../../utils/constants');
const adminEpisodeRouter = Router();

adminEpisodeRouter.put(
    '/add',
    [checkPermission([PERMISSIONS.EPISODE.CREATE]), videoUploader.single('video')],
    EpisodeController.addEpisode
);
adminEpisodeRouter.delete(
    '/remove/:episodeId',
    checkPermission([PERMISSIONS.EPISODE.DELETE]),
    EpisodeController.removeEpisode
);
adminEpisodeRouter.patch(
    '/update/:episodeId',
    [checkPermission([PERMISSIONS.EPISODE.UPDATE]), videoUploader.single('video')],
    EpisodeController.updateEpisode
);

module.exports = {
    adminEpisodeRouter,
}