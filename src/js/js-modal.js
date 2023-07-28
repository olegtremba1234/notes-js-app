// modal.js
import { editNote, addNote } from './new-notes.js';
import { renderNotesTable, renderSummaryTable } from './ui.js';
const categories = ['Task', 'Random Thought', 'Idea'];

// Function to create and show the modal
function createModal() {
  const modal = document.createElement('div');
  modal.id = 'modal';
  modal.className = 'modal';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const closeButton = document.createElement('span');
  closeButton.className = 'close-button';
  closeButton.id = 'close-button';
  closeButton.textContent = '×';

  const addNoteForm = document.createElement('form');
  addNoteForm.id = 'add-note-form';

  const nameLabel = document.createElement('label');
  nameLabel.setAttribute('for', 'note-name');
  nameLabel.textContent = 'Note Name:';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'note-name';
  nameInput.required = true;

  const categoryLabel = document.createElement('label');
  categoryLabel.setAttribute('for', 'category');
  categoryLabel.textContent = 'Category:';

  const categorySelect = document.createElement('select');
  categorySelect.id = 'category';
  categorySelect.required = true;

  // Populate options from the categories array
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  const contentLabel = document.createElement('label');
  contentLabel.setAttribute('for', 'note-content');
  contentLabel.textContent = 'Note Content:';

  const contentInput = document.createElement('input');
  contentInput.type = 'text';
  contentInput.id = 'note-content';
  contentInput.required = true;

  const addButton = document.createElement('button');
  addButton.type = 'submit';
  addButton.textContent = 'Add Note';

  addNoteForm.appendChild(nameLabel);
  addNoteForm.appendChild(nameInput);
  addNoteForm.appendChild(categoryLabel);
  addNoteForm.appendChild(categorySelect);
  addNoteForm.appendChild(contentLabel);
  addNoteForm.appendChild(contentInput);
  addNoteForm.appendChild(addButton);

  modalContent.appendChild(closeButton);
  modalContent.appendChild(addNoteForm);
  modal.appendChild(modalContent);

  // Add event listener to the "Close" button to hide the modal
  closeButton.addEventListener('click', hideModal);

  // Add event listener to the "submit" event of the add-note-form
  addNoteForm.addEventListener('submit', handleAddNote);

  // Add event listener to the modal backdrop to close the modal
  modal.addEventListener('click', handleBackdropClick);

  // Add event listener to the document for "Escape" key press
  document.addEventListener('keydown', handleEscapeKey);

  document.body.appendChild(modal);
}

// Function to show the modal
function showModal() {
  const modal = document.querySelector('#modal');
  modal.style.display = 'block';
}

// Function to hide the modal
function hideModal() {
  const modal = document.querySelector('#modal');
  modal.style.display = 'none';
}

// Function to handle form submission when adding a new note
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
    hideModal();
  } else {
    alert('Note content and category are required.');
  }
}

// Function to close the modal when clicking the backdrop
function handleBackdropClick(event) {
  if (event.target.id === 'modal') {
    hideModal();
  }
}

// Function to close the modal when pressing the "Escape" key
function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    hideModal();
  }
}

export { createModal, showModal, hideModal };
