const logger = require('../logger');
const { createNote, getUserNotes, getNoteById, updatedNote, deleteNote } = require('../models/noteModel');

async function create(req, res) {
  const { title, content } = req.body;
  try {
    const note = await createNote(title, content, req.user.id);
    logger.info(`Note created for user ${req.user.id}`)
    res.status(201).json(note);
  } catch (error) {
    logger.error(`Failed to create note for user ${req.user.id}: ${error.message}`);
    console.error('Failed to create note:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAll(req, res) {
  const { limit = 5, offset = 0} = req.query;
  try {
    const notes = await getUserNotes(req.user.id, limit, offset);
    res.json(notes);
  } catch (error) {
    console.error('Failed to get notes:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getOne(req, res) {
  const { id } = req.params;

  try {
    const note = await getNoteById(id, req.user.id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    console.error('Failed to get note:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function update(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedNoteResult = await updatedNote(id, title, content, req.user.id);
    if (!updatedNoteResult) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(updatedNoteResult);
  } catch (error) {
    console.error('Error updating note:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function remove(req, res) {
  const { id } = req.params;

  try {
    const deletedNote = await deleteNote(id, req.user.id);
    if (!deletedNote) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = { create, getAll, getOne, update, remove };