
const {
	deleteADragon,
	insertDragon
} = require('../services/commonActions');

function _deleteDragon(req, res) {
    console.log(req.body);
    deleteADragon(req.body)
        .then(response => res.status(200).send(response))
        .catch(err => res.status(500).send(err));
}

function _insertDragon(req, res) {
    console.log(req.body);
    insertDragon(req.body)
        .then(response => res.status(200).send(response))
        .catch(err => res.status(500).send(err));
}

module.exports = {
    _deleteDragon,
    _insertDragon
};
