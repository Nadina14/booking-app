import express from "express";
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms, updateRoomAvailability } from "../controllers/roomController.js";

const router = express.Router();

router.post("/:hotelid", createRoom);


router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", updateRoom);

router.delete("/:id/:hotelid", deleteRoom);


router.get("/:id", getRoom);


router.get("/", getRooms);

export default router;