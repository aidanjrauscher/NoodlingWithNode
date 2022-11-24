const express = require("express");
const jobsController = require("../controllers/jobs");

const router = express.Router();

router.route("/").post(jobsController.createJob).get(jobsController.getAllJobs);
router
  .route("/:id")
  .get(jobsController.getSingleJob)
  .patch(jobsController.updateJob)
  .delete(jobsController.deleteJob);

module.exports = router;
