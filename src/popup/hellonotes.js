$(document).ready(() => {
  let currentNote = null;
  const categoryDropdownMenu = $('#categoryDropdownMenu');
  const addCategoryLink = $('#addCategoryLink');
  const newCategoryInputContainer = $('#newCategoryInputContainer');
  const newCategoryInput = $('#newCategoryInput');
  const saveCategoryButton = $('#saveCategoryButton');
  const cancelEditButton = $('#canceledit');
  const noteForm = $('#noteinput');
  const addNoteButton = $('#addnote');
  const deleteNoteButton = $('#deleteNote');
  let isEditMode = false;
  let selectedDueDate = null;

  function getSelectedTagsForFiltering() {
    const selectedTags = [];
    $('#tagsDropdownMenu .form-check-input:checked').each(function () {
      const categoryId = $(this).data('category-id');
      if (categoryId !== undefined) {
        selectedTags.push(categoryId);
      }
    });
    return selectedTags;
  }

  function getSelectedCheckboxes() {
    const dropdownMenuNote = document.getElementById('categoryDropdownMenu');
    const selectedCheckboxes = dropdownMenuNote.querySelectorAll('.form-check-input:checked');
    const tags = Array.from(selectedCheckboxes).reduce((acc, checkbox) => {
      const tagId = checkbox.getAttribute('data-category-id');
      const tagName = checkbox.value;
      acc[tagId] = {
        name: tagName,
      };
      return acc;
    }, {});
    return tags;
  }

  function formatTagsForDisplay(tags) {
    if (!tags) {
      return '';
    }
    const tagNames = [];
    Object.keys(tags).forEach((categoryId) => {
      const tag = tags[categoryId];
      tagNames.push(tag.name);
    });
    return tagNames.join(', ');
  }

  function attachCheckboxListeners() {
    $('#categoryDropdownMenu').on('change', '.form-check-input', () => {
      const selectedTags = getSelectedCheckboxes();
      const formattedTags = formatTagsForDisplay(selectedTags);
      $('#noteTags').text(`Tags: ${formattedTags}`);
    });
  }

  function addNewNote(title, content, tags) {
    const noteId = Date.now().toString();
    const note = {
      id: noteId,
      title,
      content,
      due: selectedDueDate,
      tags,
      overdue: false
    };
    const alarmName = `${noteId}_task_due_alarm`;
    chrome.alarms.create(alarmName, {
      when: new Date(selectedDueDate).getTime() // Convert back to milliseconds
  });
    currentNote = note;
    chrome.storage.local.get({ notes: [] }, (data) => {
      const existingNotes = data.notes;

      existingNotes.push(note);

      chrome.storage.local.set({ notes: existingNotes }, () => {
      });
    });
  }

  function formatDateForDisplay(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2); // Get last two digits of the year
    return `${day}/${month}/${year}`;
  }

  function setDueDate(daysToAdd, today = false) {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + daysToAdd); // Add days based on the input
    if (today) {
      dueDate.setSeconds(dueDate.getSeconds() + 10); // enable this to test today and have the alarm go off in 15 seconds for testing
      //dueDate.setHours(dueDate.getHours() + 3); 
    } else {
      dueDate.setHours(9, 0, 0, 0); //default is 9am of selected date
    }
    selectedDueDate = dueDate.toISOString();
    const formattedDate = formatDateForDisplay(dueDate);
    $('#noteDate').text(`Due Date: ${formattedDate}`);
  }

  function autoResizeTextareas() {
    document.querySelectorAll('textarea').forEach((textarea) => {
      textarea.style.overflowY = 'hidden';
      textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = `${this.scrollHeight}px`;
      });
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  }

  function clearAllCheckboxes() {
    $('#categoryDropdownMenu .form-check-input').prop('checked', false);
  }

  function resetAddNoteForm() {
    noteForm.val('');
    isEditMode = false;
    addNoteButton.text('Add');
    $('#noteTags').text('Tags: ');
    setDueDate(7);
    selectedDueDate = null;
    cancelEditButton.hide();
    deleteNoteButton.hide();
    autoResizeTextareas();
    clearAllCheckboxes();
  }

  function loadNotes() {
    chrome.storage.local.get({ notes: [] }, (data) => {
      const { notes } = data;
      const tableBody = $('#tasks-display');
      const noTasks = $('#tasks-display-noNotes');
      const tasks = $('#tasks-display-notes');
      const selectedTags = getSelectedTagsForFiltering();
      tableBody.empty();
      var activeDisplayNote = 0;
      notes.forEach((note) => {
        if (note.recentlyDeleted) {
          return;
        }
        const noteHasSelectedTags = selectedTags.every((tagId) => note.tags && note.tags[tagId]);

        if (!noteHasSelectedTags) {
          return;
        }
        activeDisplayNote += 1;
        const row = $(`
                    <tr>
                        <td class="view-note" data-index="${note.id}">${note.title}</td>
                         <td class="note-date">${formatDateForDisplay(note.due)}</td>
                    </tr>
                `);
                if (note.overdue) {
                  row.find('td').addClass('task-overdue');
                  row.find('.note-date').html("<strong>OVERDUE</strong>");
              }

        tableBody.append(row);
      });
      if (activeDisplayNote > 0) {
        noTasks.hide();
        tasks.show();
      } else {
        tasks.hide();
        noTasks.show();
      }
    });
    setDueDate(7);
  }
  function loadCats() {
    chrome.storage.local.get({ tags: {} }, (data) => {
      const { tags } = data;

      // Add each tag to the dropdown menu
      Object.entries(tags).forEach(([tagId, tagData]) => {
        const { tagName, tagColour } = tagData;
        const tagItem = `
          <div class="form-check">
            <input class="form-check-input" type="checkbox" data-category-id="${tagId}" value="${tagName}">
            <label style="color: ${tagColour};" class="form-check-label" for="category-${tagId}">
              ${tagName}
            </label>
          </div>`;
        categoryDropdownMenu.prepend(tagItem);
      });
    });
    attachCheckboxListeners();
  }
  function markSelectedCheckboxes(tags) {
    const selectedTags = tags;

    $('#categoryDropdownMenu .form-check-input').each(function () {
      const checkbox = $(this);
      const categoryId = checkbox.data('category-id');

      if (selectedTags[categoryId] !== undefined) {
        checkbox.prop('checked', true);
      } else {
        checkbox.prop('checked', false);
      }
    });
  }

  function viewNote(note) {
    const textarea = document.querySelector('#add-new-note textarea');
    textarea.value = note.content;
    const formattedDate = formatDateForDisplay(note.due);
    const formattedTag = formatTagsForDisplay(note.tags);
    $('#noteDate').text(`Due Date: ${formattedDate}`);
    $('#noteTags').text(`Tags: ${formattedTag}`);
    autoResizeTextareas();
    markSelectedCheckboxes(note.tags);
  }
  // two of the same function not sure what one is to be used
  // function loadTagsToDropdown() {
  //   chrome.storage.local.get({ tags: {} }, (data) => {
  //     const tags = data.tags || {};
  //     const tagsMenu = $('#tagsDropdownMenu');
  //     tagsMenu.empty();
  //     const headerItem = '<h6 class="dropdown-header">Select Tags</h6>';
  //     tagsMenu.append(headerItem);
  //     Object.entries(tags).forEach(([tagId, tagData]) => {
  //       const { tagName, tagColour } = tagData;
  //       const categoryItem = `
  //   <div class="form-check">
  //     <input class="form-check-input" type="checkbox" data-category-id="${tagId}" value="${tagName}">
  //     <label style="color: ${tagColour};" class="form-check-label" for="category-${tagId}">
  //       ${tagName}
  //     </label>
  //   </div>`;

  //       // Append the new category to the dropdown menu
  //       tagsMenu.append(categoryItem);
  //     });
  //   });
  // }
  // Make sure loadTagsToDropdown is defined
  function loadTagsToDropdown() {
    chrome.storage.local.get({ tags: {} }, (data) => {
      const tags = data.tags || {};
      const tagsMenu = $('#tagsDropdownMenu');
      tagsMenu.empty();

      // Add header
      const headerItem = '<h6 class="dropdown-header">Select Tags</h6>';
      tagsMenu.append(headerItem);

      // Add tags
      Object.entries(tags).forEach(([tagId, tagData]) => {
        const { tagName, tagColour } = tagData;
        const tagItem = `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" data-category-id="${tagId}" value="${tagName}">
                    <label style="color: ${tagColour};" class="form-check-label" for="category-${tagId}">
                        ${tagName}
                    </label>
                </div>`;
        tagsMenu.append(tagItem);
      });
    });
  }

  $('#addnote').on('click', () => {
    const textarea = document.querySelector('#add-new-note textarea');
    const content = textarea.value.trim();
    if (content) {
      if (isEditMode) {
        // Update the existing note
        chrome.storage.local.get({ notes: [] }, (data) => {
          const existingNotes = data.notes;
          const targetNote = existingNotes.find((n) => Number(n.id) === currentNote);
          const title = content.length > 10 ? `${content.substring(0, 15)}...` : content; // title is max first 15 chars of text
          targetNote.title = title;
          targetNote.tags = getSelectedCheckboxes();
          targetNote.content = content;
          if (!selectedDueDate) {
            selectedDueDate = targetNote.due;
          } 
          if (targetNote.due !== selectedDueDate) {
            targetNote.overdue = false;
            const alarmName = `${currentNote}_task_due_alarm`;
            chrome.alarms.create(alarmName, {
              when: new Date(selectedDueDate).getTime() // Convert back to milliseconds
          });
          }
          targetNote.due = selectedDueDate;
          chrome.storage.local.set({ notes: existingNotes }, () => {
            resetAddNoteForm();
          });
          loadNotes();
        });
      } else {
        // make a new note
        const title = content.length > 10 ? `${content.substring(0, 15)}...` : content; // title is max first 15 chars of text
        if (!selectedDueDate) {
          setDueDate(7);
        }
        const tags = getSelectedCheckboxes();
        addNewNote(title, content, tags);
        resetAddNoteForm();
        chrome.storage.local.get({ notes: [] }, (data) => {
          const existingNotes = data.notes;
          const index = existingNotes.findIndex((note) => Number(note.id) === currentNote.id);
          loadNotes();
          if (index !== -1) {
            existingNotes[index] = currentNote;
            chrome.storage.local.set({ notes: existingNotes }, () => {
            });
          }
        });
      }
    }
  });

  cancelEditButton.on('click', () => {
    resetAddNoteForm();
  });

  addCategoryLink.on('click', (e) => {
    e.preventDefault();
    categoryDropdownMenu.hide();
    newCategoryInputContainer.show();
  });

  saveCategoryButton.on('click', () => {
    const newCategoryName = newCategoryInput.val().trim();
    const newCategoryColour = '';
    const newCategoryId = Date.now();

    if (newCategoryName) {
      chrome.storage.local.get({ tags: {} }, (data) => {
        const existingTags = data.tags;

        if (!Object.values(existingTags).some((tag) => tag.tagName === newCategoryName)) {
          existingTags[newCategoryId] = {
            tagName: newCategoryName,
            tagColour: newCategoryColour,
          };

          chrome.storage.local.set({ tags: existingTags }, () => {
          });

          const newCategoryItem = `
          <div class="form-check">
            <input class="form-check-input" type="checkbox" data-category-id="${newCategoryId}" value="${newCategoryName}">
            <label style="color: ${newCategoryColour};" class="form-check-label" for="category-${newCategoryId}">
              ${newCategoryName}
            </label>
          </div>`;
          categoryDropdownMenu.prepend(newCategoryItem);
        }
        loadTagsToDropdown();
      });
      newCategoryInput.val('');
    } else {
      alert('Please enter a category name.');
    }
  });

  // Add this helper function to update tags display
  function updateTagsDisplay() {
  // Clear existing tags
    $('#noteTags').text('Tags: ');

    // Refresh any tag-related UI elements
    if (currentNote && currentNote.tags) {
      const formattedTags = formatTagsForDisplay(currentNote.tags);
      $('#noteTags').text(`Tags: ${formattedTags}`);
    }
  }

  // Modify the delete button click handler
  $('#deleteCategoryButton').on('click', () => {
    // Get all checked categories
    const selectedCategories = [];
    $('#categoryDropdownMenu .form-check-input:checked').each(function () {
      selectedCategories.push($(this).data('category-id'));
    });

    // Validate if any categories are selected
    if (selectedCategories.length === 0) {
      alert('Please select categories to delete');
      return;
    }

    // Confirm deletion
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Are you sure you want to delete the selected categories? This cannot be undone.')) {
      chrome.storage.local.get({ tags: {} }, (data) => {
        const existingTags = data.tags;
        let hasChanges = false;

        // Delete each selected category
        selectedCategories.forEach((categoryId) => {
          if (existingTags[categoryId]) {
            delete existingTags[categoryId];
            hasChanges = true;
          }
        });

        if (hasChanges) {
          // Save updated tags
          chrome.storage.local.set({ tags: existingTags }, () => {
            // Clear checkboxes
            $('#categoryDropdownMenu .form-check-input:checked').prop('checked', false);

            // Refresh the dropdowns
            loadTagsToDropdown();
            categoryDropdownMenu.empty();
            loadCats();

            // Update any related UI elements
            updateTagsDisplay();
          });
        }
      });
    }
  });

  $(document).on('click', '#createTagBtn', () => {
    const tagName = $('#tagName').val().trim();

    if (tagName) {
      chrome.storage.local.get({ tags: {} }, (data) => {
        const timestamp = new Date().getTime();
        const randomId = generateRandomId();
        const newTag = `${timestamp}-${randomId}`;

        data.tags[newTag] = {
          tagColour,
          tagName,
        };

        chrome.storage.local.set({ tags: data.tags }, () => {
          addTag(newTag, data.tags[newTag]);
          tagsObj = data;
        });
      });
    }
  });

  $('#due-today').on('click', () => {
    setDueDate(0, true);
  });

  $('#tagsDropdownMenu').on('change', '.form-check-input', () => {
    loadNotes();
  });

  $('#due-tomorrow').on('click', () => {
    setDueDate(1);
  });

  $('#due-next-week').on('click', () => {
    setDueDate(7);
  });

  $('#custom-date').on('change', function () {
    selectedDueDate = this.value;
    const formattedDate = formatDateForDisplay(selectedDueDate);
    $('#noteDate').text(`Due Date: ${formattedDate}`);
  });

  $(document).on('click', '.view-note', function () {
    isEditMode = true;
    currentNote = $(this).data('index');
    chrome.storage.local.get({ notes: [] }, (data) => {
      const existingNotes = data.notes;
      const note = existingNotes.find((n) => Number(n.id) === currentNote);
      if (note) {
        viewNote(note);
        addNoteButton.text('Save');
        cancelEditButton.show();
        deleteNoteButton.show();
      }
    });
  });

  function deleteAlarm() {
      const alarmName = currentNote + "_task_due_alarm";
      chrome.alarms.clear(alarmName);
  }


  function setNoteDeleted() {
    chrome.storage.local.get({ notes: [] }, (data) => {
      const existingNotes = data.notes;
      const updatedNotes = existingNotes.filter((note) => Number(note.id) !== currentNote);
      deleteAlarm(currentNote);
      chrome.storage.local.set({ notes: updatedNotes }, () => {
        loadNotes();
      });
    });
  }

  deleteNoteButton.on('click', () => {
    setNoteDeleted();
    resetAddNoteForm();
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local' && changes.notes) {
      loadNotes();
    }
  });

  // Load the notes when the document is ready
  loadNotes();
  loadTagsToDropdown();
  loadCats();
});
