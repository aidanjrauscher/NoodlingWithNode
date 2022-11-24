const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userID }).sort("createdAt");
  res.status(StatusCodes.OK);
  if (jobs.length > 0) {
    res.json({ data: jobs, success: true });
  } else {
    res.json({ data: [], success: true });
  }
};
const getSingleJob = async (req, res) => {
  const userID = req.user.userID;
  const jobID = req.params.id;
  const job = await Job.findOne({ _id: jobID, createdBy: userID });
  if (!job) {
    throw new NotFoundError(
      `No job with ID ${jobID} exists for user ${userID}`
    );
  }

  res.status(StatusCodes.OK);
  res.json({ data: job, success: true });
};

const updateJob = async (req, res) => {
  const userID = req.user.userID;
  const jobID = req.params.id;
  const { company, position } = req.body;
  if (company === "" || position === "") {
    throw new BadRequestError("Company and position cannot be empty.");
  }
  const job = await Job.findByIdAndUpdate(
    { _id: jobID, createdBy: userID },
    { company, position },
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new NotFoundError(
      `No job with ID ${jobID} exists for user ${userID}`
    );
  }
  res.status(StatusCodes.OK);
  res.json({ data: job, success: true });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED);
  res.json({ job });
};

const deleteJob = async (req, res) => {
  const userID = req.user.userID;
  const jobID = req.params.id;

  const job = await Job.findByIdAndRemove({
    _id: jobID,
    createdBy: userID,
  });
  if (!job) {
    throw new NotFoundError(
      `No job with ID ${jobID} exists for user ${userID}`
    );
  }
  res.status(StatusCodes.OK);
  res.json({ success: true });
};

module.exports = {
  getAllJobs,
  getSingleJob,
  updateJob,
  createJob,
  deleteJob,
};
