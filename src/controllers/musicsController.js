const musics = require("../models/musics")

    const getAllMusics = (_req, res) => {
        musics.find(function(err, musicsFound){
            // console.log(musicsFound)
        if (err){
             res.status(500).send({ message: err.message })
        } else{
            res.status(200).send(musicsFound)
            }
        })
    };

const getMusicById = (req, res) => {
    const requestId = req.params.id;
    musics.findOne ({ id: requestId}, function (err, musicsFound){
        if (err) {
            res.status(500).send({ message: err.message})
        }
        if (musicsFound){
            res.status(200).send(musicsFound.toJSON({ virtuals: true}))
        } else {
            res.status(204).send({message : "No music found!"})
        }
    })
};

const createMusic = (req, res) => {
    let { 
    title,
    duration,
    launchYear,
    favorited,
    artists 
    } = req.body;

    let newMusic = new musics({
        "id":"musicId,Math.random().toString(32).substr(2)", 
        title,
        duration,
        launchYear,
        favorited,
        artists
    })
    

musics.findOne({ id:musicId}, function( err,musicFound){
    if(err){
    res.status(500).send({ message: err.message })
    }else{
        if(musicFound){
    // newMusic= new musics(music)
    newMusic.save(function(err){
        if(err){
            res.status(500).send({ message: err.message })
        }else{
            res.status(200).send({message: "Item adicionado com sucesso!",
        newMusic
        })
    }
})
} 

// Atualizar com uma música
const updateMusic = (req, res) => {
    const requiredId = req.params.id;
    musics.findOne({ id: requiredId }, function (err, musicFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (musicFound) {
                musics.updateOne({ id: requiredId }, { $set: req.body }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Registro alterado com sucesso" })
                    }
                })
            } else {
                res.status(404).send({ message: "Não há registro para ser atualizado com esse id" });
            };
        };
    });
};

// atualizar apenas o Favorited
const updateFavorited = (req, res) => {
    const requiredId = req.params.id;
    let newFavorited = req.body.favorited;
    musics.findOne({ id: requiredId }, function (err, musicFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (musicFound) {
                musics.updateOne({ id: requiredId }, { $set: { name: newFavorited } }, function (err) {
                    if (err) {
                        res.status(500).send({ message: err.message })
                    } else {
                        res.status(200).send({ message: "Favorited alterado com sucesso" })
                    }
                })
            } else {
                res.status(404).send({ message: "Não há registro para ser atualizado com esse id" });
            };
        };
    });
};

const deleteMusic = (req, res) => {
    const requireId = req.params.id
    musics.findOne({ id: requireId }, function (err, musicsFound) {
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            if (musicsFound) {
                //deleteMany remove mais de um registro
                //deleteOne remove apenas um registro
                musics.deleteOne({ id: requireId }, function (err) {
                    if (err) {
                        res.status(500).send({
                            message: err.message,
                            status: "FAIL"
                        })
                    } else {
                        res.status(200).send({
                            message: 'Musica removida com sucesso',
                            status: "SUCCESS"
                        })
                    }
                })
            } else {
                res.status(404).send({ message: 'Não há nada para ser removido com esse id' })
            }
        }
    })
};

module.exports = {
    createMusic,
    deleteMusic,
    updateFavorited,
    updateMusic,
    getAllMusics,
    getMusicById
 }