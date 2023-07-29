// ui.js

import { notes, editNote, removeNote } from './new-notes.js';
import { showEditModal } from './modal.js';

// Function to render the notes table
function renderNotesTable() {
  const notesTable = document.querySelector('#notes-table');
  notesTable.innerHTML = '';

  notes.forEach(note => {
    if (!note.archived) {
      const row = document.createElement('tr');
      const nameCell = document.createElement('td');
      const creationDateCell = document.createElement('td');
      const categoryCell = document.createElement('td');
      const contentCell = document.createElement('td');
      const datesCell = document.createElement('td');
      const editCell = document.createElement('td');
      const archiveCell = document.createElement('td');
      const deleteCell = document.createElement('td');

      nameCell.textContent = note.name;
      creationDateCell.textContent = new Date(note.id).toLocaleString();
      categoryCell.textContent = note.category;
      contentCell.textContent = note.content;
      datesCell.textContent = note.dates.join(', ');

      // Create the "Edit" button
      const editButton = document.createElement('button');
      // editButton.textContent = 'Edit';
      editButton.classList.add('edit-button');
      editButton.dataset.noteId = note.id; // Store the note ID as a data attribute

      // Add event listener to the "Edit" button to open the edit modal
      editButton.addEventListener('click', () => {
        const noteContent = note.content;
        showEditModal(noteContent);
      });

      editCell.appendChild(editButton);

      // editCell.innerHTML = `<button class="edit-button"></button>`;
      archiveCell.innerHTML = `<button class="archive-button" id="archive-button"></button>`;
      deleteCell.innerHTML = `<button class="remove-button"></button>`;

      row.appendChild(nameCell);
      row.appendChild(creationDateCell);
      row.appendChild(categoryCell);
      row.appendChild(contentCell);
      row.appendChild(datesCell);
      row.appendChild(editCell);
      row.appendChild(archiveCell);
      row.appendChild(deleteCell);

      notesTable.appendChild(row);
    }
  });
}

// Function to render the summary table
function renderSummaryTable() {
  const summaryTable = document.querySelector('#summary-table');
  summaryTable.innerHTML = '';

  const activeNotesByCategory = notes.reduce((acc, note) => {
    if (!note.archived) {
      acc[note.category] = (acc[note.category] || 0) + 1;
    }
    return acc;
  }, {});

  const archivedNotesByCategory = notes.reduce((acc, note) => {
    if (note.archived) {
      acc[note.category] = (acc[note.category] || 0) + 1;
    }
    return acc;
  }, {});

  const categories = ['Task', 'Random Thought', 'Idea'];
  categories.forEach(category => {
    const row = document.createElement('tr');
    const categoryCell = document.createElement('td');
    const activeCell = document.createElement('td');
    const archivedCell = document.createElement('td');

    categoryCell.textContent = category;
    activeCell.textContent = activeNotesByCategory[category] || 0;
    archivedCell.textContent = archivedNotesByCategory[category] || 0;

    row.appendChild(categoryCell);
    row.appendChild(activeCell);
    row.appendChild(archivedCell);

    summaryTable.appendChild(row);
  });
}

export { renderNotesTable, renderSummaryTable };