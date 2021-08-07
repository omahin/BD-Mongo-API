const express = require("express")
const router = express.Router()
const controller = require("../controllers/musicsController")

// post - criacao
router.post("/create", controller.createMusic)

// delete - remoção
router.delete("/:id/delete", controller.deleteMusic)

// put e patch - alteração
router.put("/:id/update", controller.updateMusic)
router.patch("/:id/favorited", controller.updateFavorited)

// get - recuperação
router.get("/", controller.getAllMusics)
router.get("/:id", controller.getMusicById)

module.exports = router;
