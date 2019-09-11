const db = require("../data/dbConfig")

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    getByQuery,
    findSteps
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
        .select(["scheme_name", "schemes.id AS scheme_id", "step_number", "instructions", "make"])
        .join("steps", "schemes.id", "schemes.scheme_id")
        .where({ "schemes.id": id })
        .first();
}

// Post a scheme to the db
function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(id => {
            return getById(id[0])
        });
}

// Edit a scheme in the db
function update(id, changes) {
    return db('schemes')
        .where('id', id)
        .update(changes)
        .then(id => {
            return getById(id[0])
        });;
}

// Delete a scheme in the db
function remove(id) {
    return db('schemes')
        .where('id', id)
        .del();
}

// Get scheme list by specific params
function getByQuery(limit, sortBy, sortDir) {
    return db('schemes')
        .limit(limit)
        .orderBy(sortBy, sortDir)
}