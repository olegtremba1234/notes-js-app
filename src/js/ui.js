import {
  notes,
  editNote,
  removeNote,
  archiveNote,
  unarchiveNote,
} from './notes.js';
import { showEditModal } from './modal.js';

function renderNotesTable() {
  const notesTable = document.querySelector('#notes-table');
  notesTable.innerHTML = '';

  notes.forEach(note => {
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

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.dataset.noteId = note.id; // Store the note ID as a data attribute
    editButton.addEventListener('click', () => {
      showEditModal(note.id); // Pass the note ID as an argument
    });

    editCell.appendChild(editButton);

    const archiveButton = document.createElement('button');
    archiveButton.classList.add('archive-button');
    archiveButton.dataset.noteId = note.id; // Store the note ID as a data attribute
    archiveButton.addEventListener('click', () => {
      if (note.archived) {
        unarchiveNote(note.id); // Call the unarchiveNote function with the note ID
      } else {
        archiveNote(note.id); // Call the archiveNote function with the note ID
      }
      renderNotesTable(); // Update the table after archiving/unarchiving
    });
    archiveCell.appendChild(archiveButton);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.dataset.noteId = note.id;
    removeButton.addEventListener('click', () => {
      removeNote(note.id);
    });

    deleteCell.appendChild(removeButton);

    row.appendChild(nameCell);
    row.appendChild(creationDateCell);
    row.appendChild(categoryCell);
    row.appendChild(contentCell);
    row.appendChild(datesCell);
    row.appendChild(editCell);
    row.appendChild(archiveCell);
    row.appendChild(deleteCell);

    if (note.archived) {
      row.classList.add('archived-note');
    }

    notesTable.insertBefore(row, notesTable.firstChild);
  });
}

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
