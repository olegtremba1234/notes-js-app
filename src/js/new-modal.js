// modal.js

import { editNote, addNote } from './new-notes.js';
import { renderNotesTable, renderSummaryTable } from './ui.js';

const categories = ['Task', 'Random Thought', 'Idea'];

const modal = document.querySelector('#modal');

// Function to show the modal
function showModal() {
  modal.style.display = 'block';
}

// Function to hide the modal
function hideModal() {
  modal.style.display = 'none';
}

// Function to handle adding a new note
function handleAddNote(event) {
  event.preventDefault();

  const noteNameInput = document.querySelector('#note-name');
  const noteContentInput = document.querySelector('#note-content');
  const categorySelect = document.querySelector('#category');

  const noteName = noteNameInput.value;
  const noteContent = noteContentInput.value;
  const category = categorySelect.value;

  if (noteContent && category && noteName) {
    addNote(noteName, noteContent, category);
    renderNotesTable();
    noteNameInput.value = '';
    noteContentInput.value = '';
    categorySelect.value = categories[0];
    hideModal(); // Hide the modal after adding the note
  } else {
    alert('Note name, content, and category are required.');
  }
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    hideModal();
  }
}

// Function to close the modal when clicking the backdrop
function handleBackdropClick(event) {
  if (event.target.id === 'modal') {
    hideModal();
  }
}

// Rest of the existing functions in modal.js remain the same

export {
  showModal,
  hideModal,
  handleAddNote,
  handleEscapeKey,
  handleBackdropClick,
};
