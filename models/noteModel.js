const pool = require('./db');

// Creating a new note
async function createNote(title, content, user_id) {
  const result = await pool.query(
    'INSERT INTO notes (title, content, user_id) VALUES ($1, $2, $3) RETURNING *',
    [title, content, user_id]
  );
  return result.rows[0];
}

// Getting all user notes
async function getUserNotes(user_id, limit, offset) {
  const result = await pool.query(
    'SELECT * FROM notes WHERE user_id = $1 LIMIT $2 OFFSET $3',
    [user_id, limit, offset]
  );
  return result.rows;
}

// Getting a note by ID
async function getNoteById(id, user_id) {
  const result = await pool.query(
    'SELECT * FROM notes WHERE id = $1 AND user_id = $2',
    [id, user_id]
  );
  return result.rows[0];
}

// Updating a note
async function updatedNote(id, title, content, user_id) {
  const result = await pool.query(
    'UPDATE notes SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
    [title, content, id, user_id]
  );
  return result.rows[0];
}

// Deleting a note
async function deleteNote(id, user_id) {
  const result = await pool.query(
    'DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *',
    [id, user_id]
  );
  return result.rows[0];
}

module.exports = { createNote, getUserNotes, getNoteById, updatedNote, deleteNote };