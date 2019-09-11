const db = require("../data/dbConfig")

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    findSteps,
    addStep
}

// Get all schemes
function find() {
    return db('schemes');
}

// Get a scheme by ID
function findById(id) {
    return db('schemes')
        .where({ id })
        .first();
}

// Get steps for a given scheme
function findSteps(id) {
    return db('schemes')
        .select(["scheme_name", "step_number", "instructions"])
        .join("steps", "schemes.id", "steps.scheme_id")
        .where({ "schemes.id": id })
        .orderBy("step_number", "asc");
}

// Post a scheme to the db
function add(schemeData) {
    return db('schemes')
        .insert(schemeData)
        .then(ids => {
            return findById(ids[0])
        });
}

// Edit a scheme in the db
function update(changes, id) {
    return db('schemes')
        .where('id', id)
        .update(changes)
        .then(() => {
            return findById(id)
        }); 
}

// Delete a scheme in the db
function remove(id) {
    return db('schemes')
        .where('id', id)
        .del();
}

// Get scheme list by specific params
function addStep(step, scheme_id) {
    return db('steps')
        .insert(step);
}