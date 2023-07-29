// notes.js
import { renderNotesTable, renderSummaryTable } from './ui.js';
let notes = [];

console.log('notes', notes);

function addNote(noteName, noteContent, category) {
  const note = {
    id: Date.now(),
    name: noteName,
    content: noteContent,
    category: category,
    archived: false,
    dates: extractDatesFromNote(noteContent),
  };

  notes.push(note);
  renderNotesTable();
  renderSummaryTable();
}

function editNote(noteId, noteName, noteContent, category) {
  const noteIndex = notes.findIndex(note => note.id === noteId);
  if (noteIndex !== -1) {
    notes[noteIndex].name = noteName;
    notes[noteIndex].content = noteContent;
    notes[noteIndex].category = category;
    notes[noteIndex].dates = extractDatesFromNote(noteContent);

    renderNotesTable();
    renderSummaryTable();
  }
}

function removeNote(noteId) {
  notes = notes.filter(note => note.id !== noteId);
  renderNotesTable();
  renderSummaryTable();
}

function archiveNote(noteId) {
  const noteIndex = notes.findIndex(note => note.id === noteId);
  if (noteIndex !== -1) {
    notes[noteIndex].archived = true;
    renderNotesTable();
    renderSummaryTable();
  }
}

function unarchiveNote(noteId) {
  const noteIndex = notes.findIndex(note => note.id === noteId);
  if (noteIndex !== -1) {
    notes[noteIndex].archived = false;
    renderNotesTable();
    renderSummaryTable();
  }
}

function prepopulateNotes() {
  const note1 = {
    id: Date.now(), // Unique ID for each note based on timestamp
    name: 'note1',
    category: 'Task',
    content: 'Remember to buy groceries on 8/1/2023',
    archived: false,
    dates: ['8/1/2023'],
  };

  const note2 = {
    id: Date.now() + 1, // Unique ID for each note based on timestamp
    name: 'note2',
    category: 'Task',
    content: 'Meeting with Jane at 10 am tomorrow',
    archived: false,
    dates: ['8/2/2023'],
  };

  notes.push(note1, note2);
}

function extractDatesFromNote(noteContent) {
  const datePattern = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
  return noteContent ? noteContent.match(datePattern) || [] : [];
}

export {
  notes,
  addNote,
  editNote,
  removeNote,
  archiveNote,
  unarchiveNote,
  prepopulateNotes,
  extractDatesFromNote,
};
