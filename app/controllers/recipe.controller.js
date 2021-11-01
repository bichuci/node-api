const db = require("../models");
const Recipe = db.recipes;
const Op = db.Sequelize.Op;

// Create and Save a new Recipe
exports.create = (req, res) => {
    //Validate request
    if(!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }

    //Create Recipe
    const recipe = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Recipe in database
    Recipe.create(recipe)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Recipe"
            });
        });
};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Recipe.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Recipe with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Recipe.findByPk(id)
        .then(data => {
            if(data) {
                res.send(data);
            }else{
                res.status(404).send({
                    message: `Cannot find Recipe with id=${id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving the Recipe with id=" + id
            });
        })
};

// Update a Recipe by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Recipe.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if(num == 1){
                res.send({
                    message: "Recipe was updated successfully."
                })
            }else {
                res.send({
                    message: `Cannot update Recipe with id=${id}. Maybe Recipe was not found`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating the Recipe with id=" +id
            })
        })
};

// Delete a Recipe with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Recipe.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

// Delete all Recipes from the database.
exports.deleteAll = (req, res) => {
    Recipe.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Tutorials were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};

// Find all published Recipes
exports.findAllPublished = (req, res) => {
    Recipe.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};