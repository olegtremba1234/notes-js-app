// main.js

// Import modules
import {
  notes,
  prepopulateNotes,
  editNote,
  archiveNote,
  unarchiveNote,
  removeNote,
} from './notes.js';
import { renderNotesTable, renderSummaryTable } from './ui.js';
import {
  createModal,
  showModal,
  hideModal,
  handleAddNote,
  handleBackdropClick,
  handleEscapeKey,
} from './modal.js';

// Call the createEditModal function to generate the edit modal when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  createModal();
  prepopulateNotes();
  renderNotesTable();
  renderSummaryTable();

  // Add event listener to the "Add Note" button to show the modal
  const addNoteButton = document.querySelector('#add-note-button');
  addNoteButton.addEventListener('click', showModal);

  // Add event listener to the "Close" button to hide the modal
  const closeButton = document.querySelector('#close-button');
  closeButton.addEventListener('click', hideModal);

  // Add event listener to the "submit" event of the add-note-form
  const addNoteForm = document.querySelector('#add-note-form');
  addNoteForm.addEventListener('submit', handleAddNote);

  // Add event listener to the modal backdrop to close the modal
  const modalBackdrop = document.querySelector('#modal');
  modalBackdrop.addEventListener('click', handleBackdropClick);

  // Add event listener to the document for "Escape" key press
  document.addEventListener('keydown', handleEscapeKey);

  // Add event listener to the notes table for click events (event delegation)
  const notesTable = document.querySelector('#notes-table');
  notesTable.addEventListener('click', handleNotesTableClick);

  // Rest of the existing event listeners remain the same
});

// Function to handle click events inside the notes table
function handleNotesTableClick(event) {
  const target = event.target;
  if (target.classList.contains('edit-button')) {
    // Handle edit button click
    const noteId = getNoteIdFromButton(target);
    editNote(noteId);
  } else if (target.classList.contains('archive-button')) {
    // Handle archive button click
    const noteId = getNoteIdFromButton(target);
    archiveNote(noteId);
  } else if (target.classList.contains('remove-button')) {
    // Handle remove button click
    const noteId = getNoteIdFromButton(target);
    removeNoteModal(noteId); // Updated to use removeNoteModal function
  }
}

// Function to get the note ID from a button element
function getNoteIdFromButton(button) {
  // Traverse the DOM to find the closest parent row (tr)
  const row = button.closest('tr');
  // Get the note ID stored in the row's dataset
  return parseInt(row.dataset.noteId);
}

// Function to show the confirmation modal for removing a note
function removeNoteModal(noteId) {
  const confirmation = confirm('Are you sure you want to remove this note?');
  if (confirmation) {
    removeNote(noteId);
  }
}
