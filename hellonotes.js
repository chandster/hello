$(document).ready(() => {
  // Assuming the notes are stored in local storage or chrome.storage.local
  function populateStorage() {
    const testNotes = [
      {
        id: '1', title: 'First Note', content: 'This is the first note.', date: '22/04/2003',
      },
      {
        id: '2', title: 'Second Note', content: 'This is the second note.', date: '18/10/2024',
      },
      {
        id: '3', title: 'Third Note', content: 'This is the third note.', date: '08/12/2003',
      },
    ];

    chrome.storage.local.set({ notes: testNotes }, () => {
      console.log('Test data has been added to Chrome Storage!');
    });
  }
  function loadNotes() {
    // If you're using chrome.storage.local:
    populateStorage();
    chrome.storage.local.get({ notes: [] }, (data) => {
      const { notes } = data;
      const tableBody = $('#tasks-display');
      tableBody.empty(); // Clear the table body before inserting new rows
      notes.forEach((note, index) => {
        const row = $(`
                    <tr>
                        <td style="justify-content: center; align-items: center;">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="radio-${index}" style="border-color: blue;">
                                <label class="form-check-label" for="radio-${index}"></label>
                            </div>
                        </td>
                        <td>${note.content}</td>
                         <td>${note.date}</td>
                    </tr>
                `);

        // Append the row to the table body
        tableBody.append(row);
      });
    });
  }

  // Load the notes when the document is ready
  loadNotes();
});
