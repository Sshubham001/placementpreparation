import express from "express";
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLectures } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Get All courses without Lectures
router.route("/courses").get(getAllCourses);

// create new courses - only for admin
router.route("/createcourses").post(isAuthenticated,authorizeAdmin,singleUpload,createCourse);

// Add lectures, Delete Course, Get Courses Details
router
  .route("/course/:id")
  .get(isAuthenticated,authorizeSubscribers,getCourseLectures)
  .post(isAuthenticated,authorizeAdmin,singleUpload,addLecture)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);


// Delete Lecture
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);


export default router;