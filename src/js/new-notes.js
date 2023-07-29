// notes.js
import { renderNotesTable, renderSummaryTable } from './ui.js';
// Define global variable for the notes
let notes = [];

console.log('notes', notes);

// Function to add a new note
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

// Function to edit an existing note
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

// Function to remove a note
function removeNote(noteId) {
  notes = notes.filter(note => note.id !== noteId);
  renderNotesTable();
  renderSummaryTable();
  console.log('remove');
  console.log('notes', notes);
}

// Function to archive a note
function archiveNote(noteId) {
  const noteIndex = notes.findIndex(note => note.id === noteId);
  if (noteIndex !== -1) {
    notes[noteIndex].archived = true;
    renderNotesTable();
    renderSummaryTable();
    console.log('archive');
  }
}

// Function to unarchive a note
function unarchiveNote(noteId) {
  const noteIndex = notes.findIndex(note => note.id === noteId);
  if (noteIndex !== -1) {
    notes[noteIndex].archived = false;
    renderNotesTable();
    renderSummaryTable();
  }
}

// Function to prepopulate some sample notes
function prepopulateNotes() {
  // Example note 1
  const note1 = {
    id: Date.now(), // Unique ID for each note based on timestamp
    name: 'note1',
    category: 'Task',
    content: 'Remember to buy groceries on 8/1/2023',
    archived: false,
    dates: ['8/1/2023'],
  };

  // Example note 2
  const note2 = {
    id: Date.now() + 1, // Unique ID for each note based on timestamp
    name: 'note2',
    category: 'Task',
    content: 'Meeting with Jane at 10 am tomorrow',
    archived: false,
    dates: ['8/2/2023'],
  };

  // Add the example notes to the notes array
  notes.push(note1, note2);
  // archiveNote(notes[1].id); // Archive one of the notes
}

// Function to extract dates mentioned in a note using Regular Expressions
function extractDatesFromNote(noteContent) {
  const datePattern = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
  return noteContent.match(datePattern) || [];
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
