const mongoose = require('mongoose');

//estrutura do seu model (atributos da sua entidade)
const musicsSchema = new mongoose.Schema({
    id: { type: SchemaTypes.Double },
    title: { type: String },
    duration: { type: String },
    launchYear: { type: Boolean },
    favorited: { type: String },
    artists: { type: Array}
}, {
    //gera por padrão uma versão para cada atualização do documento
    versionKey: false
});

// atribuindo o esquema a uma collection
// estou definindo o nome da collection que irei salvar no banco
const musics = mongoose.model('musics', musicsSchema);

// exportar o model para ser utilizado
module.exports = musics;
