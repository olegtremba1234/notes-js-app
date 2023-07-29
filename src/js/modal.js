import { editNote, addNote, notes } from './new-notes.js';
import { renderNotesTable, renderSummaryTable } from './ui.js';

const categories = ['Task', 'Random Thought', 'Idea'];

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

  const editNoteForm = document.createElement('form');
  editNoteForm.id = 'edit-note-form';
  editNoteForm.style.display = 'none';

  const editNoteNameLabel = document.createElement('label');
  editNoteNameLabel.setAttribute('for', 'edit-note-name');
  editNoteNameLabel.textContent = 'Edit Note Name:';

  const editNoteNameInput = document.createElement('input');
  editNoteNameInput.type = 'text';
  editNoteNameInput.id = 'edit-note-name';
  editNoteNameInput.required = true;

  const editNoteLabel = document.createElement('label');
  editNoteLabel.setAttribute('for', 'edit-note-content');
  editNoteLabel.textContent = 'Edit Note Content:';

  const editNoteInput = document.createElement('input');
  editNoteInput.type = 'text';
  editNoteInput.id = 'edit-note-content';
  editNoteInput.required = true;

  const editNoteCategoryLabel = document.createElement('label');
  editNoteCategoryLabel.setAttribute('for', 'edit-category');
  editNoteCategoryLabel.textContent = 'Edit Category:';

  const editNoteCategorySelect = document.createElement('select');
  editNoteCategorySelect.id = 'edit-category';
  editNoteCategorySelect.required = true;

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    editNoteCategorySelect.appendChild(option);
  });

  const editButton = document.createElement('button');
  editButton.type = 'submit';
  editButton.textContent = 'Save Changes';

  editButton.dataset.noteId = '';

  editNoteForm.appendChild(editNoteNameLabel);
  editNoteForm.appendChild(editNoteNameInput);
  editNoteForm.appendChild(editNoteLabel);
  editNoteForm.appendChild(editNoteInput);
  editNoteForm.appendChild(editNoteCategoryLabel);
  editNoteForm.appendChild(editNoteCategorySelect);
  editNoteForm.appendChild(editButton);

  modalContent.appendChild(closeButton);
  modalContent.appendChild(addNoteForm);
  modalContent.appendChild(editNoteForm);
  modal.appendChild(modalContent);
  closeButton.addEventListener('click', hideModal);

  addNoteForm.addEventListener('submit', handleAddNote);

  editNoteForm.addEventListener('submit', handleEditNote);

  modal.addEventListener('click', handleBackdropClick);

  document.addEventListener('keydown', handleEscapeKey);

  document.body.appendChild(modal);
}

function showModal() {
  const modal = document.querySelector('#modal');
  const addNoteForm = document.querySelector('#add-note-form');
  const editNoteForm = document.querySelector('#edit-note-form');

  isEditModalOpen = false;

  addNoteForm.style.display = 'block';
  editNoteForm.style.display = 'none';

  modal.style.display = 'block';
}

function hideModal() {
  const modal = document.querySelector('#modal');
  modal.style.display = 'none';

  if (isEditModalOpen) {
    const editNoteForm = document.querySelector('#edit-note-form');
    editNoteForm.reset();

    const addNoteForm = document.querySelector('#add-note-form');
    addNoteForm.style.display = 'block';
    isEditModalOpen = false;
  }
}

let isEditModalOpen = false;

function showEditModal(noteId) {
  const modal = document.querySelector('#modal');
  const addNoteForm = document.querySelector('#add-note-form');
  const editNoteForm = document.querySelector('#edit-note-form');
  const editNoteNameInput = document.querySelector('#edit-note-name');
  const editNoteContentInput = document.querySelector('#edit-note-content');
  const editNoteCategorySelect = document.querySelector('#edit-category');
  const editButton = document.querySelector('#edit-note-form button');

  const note = notes.find(note => note.id === noteId);

  if (note) {
    addNoteForm.style.display = 'none';
    editNoteForm.style.display = 'block';

    editNoteNameInput.value = note.name;
    editNoteContentInput.value = note.content;
    editNoteCategorySelect.value = note.category;

    editButton.dataset.noteId = note.id;

    editButton.textContent = 'Save Changes';

    isEditModalOpen = true;
    modal.style.display = 'block';
  } else {
    console.error('Note not found.');
  }
}

function handleEditNote(event) {
  event.preventDefault();
  const editNoteNameInput = document.querySelector('#edit-note-name');
  const editNoteContentInput = document.querySelector('#edit-note-content');
  const editNoteCategorySelect = document.querySelector('#edit-category');
  const noteName = editNoteNameInput.value;
  const noteContent = editNoteContentInput.value;
  const category = editNoteCategorySelect.value;

  const noteId = parseInt(event.target.querySelector('button').dataset.noteId);

  if (noteContent && !isNaN(noteId)) {
    editNote(noteId, noteName, noteContent, category); // Also update name and category
    renderNotesTable();
    hideModal();
  } else {
    alert('Note content is required.');
  }
}

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

function handleBackdropClick(event) {
  if (event.target.id === 'modal') {
    hideModal();
  }
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    hideModal();
  }
}

export { createModal, showModal, hideModal, showEditModal };
