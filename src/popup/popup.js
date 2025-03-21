let currentURL = '';

function checkSitesList() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['allowedSites'], (result) => {
      const storedSiteList = result.allowedSites;
      const sitesList = storedSiteList || [];
      const currentHostname = new URL(currentURL).hostname;
      resolve(sitesList.includes(currentHostname));
    });
  });
}

function checkUrlsList() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['allowedURLs'], (result) => {
      const storedUrlsList = result.allowedURLs;
      const urlsList = storedUrlsList || [];
      resolve(urlsList.includes(currentURL));
    });
  });
}

function checkStringMatchesList() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['allowedStringMatches'], (result) => {
      const storedMatchesList = result.allowedStringMatches;
      const matchesList = storedMatchesList || [];
      resolve(matchesList.some((match) => currentURL.indexOf(match) > -1));
    });
  });
}

function checkRegexList() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['allowedRegex'], (result) => {
      const storedRegexList = result.allowedRegex;
      const regexList = storedRegexList || [];

      const isMatch = regexList.some((regex) => new RegExp(regex).test(currentURL));
      resolve(isMatch);
    });
  });
}

function allDeleted(allTasks) {
  let allRecentlyDeleted = true;
  Object.keys(allTasks).forEach((key) => {
    if (!allTasks[key].recentlyDeleted) {
      allRecentlyDeleted = false;
    }
  });
  return allRecentlyDeleted;
}

function setTaskDeleted(allTasks, taskId) {
  const task = allTasks[taskId];
  const now = new Date();
  const deletionDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days later
  const alarmName = `${task.id}_deletion_alarm`;
  task.recentlyDeleted = true;
  task.scheduledDeletion = deletionDate.toISOString();
  chrome.storage.local.set({ tasks: allTasks }, () => {
    chrome.alarms.create(alarmName, { when: deletionDate.getTime() });
  });
}

function sortTasks(tasks) {
  const tasksArray = Object.entries(tasks).map(([id, task]) => ({ id, ...task }));
  tasksArray.sort((taskA, taskB) => new Date(taskA.due) - new Date(taskB.due));
  const sortedIds = tasksArray.map((task) => task.id);
  const sortedTasks = [];
  sortedIds.forEach((id) => {
    sortedTasks[id] = tasks[id];
  });
  return sortedTasks;
}

const emptyTemplate = `
  <div class="row justify-content-center mt-5">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="warn-3 bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
      </svg>
  </div>
  <div class="row justify-contents-center text-center">
      <div class="warn-text-4">
          No tasks yet.
      </div>
  </div>
`;

function updateChecklist(existingTasks) {
  $('#checklist').empty();
  if (Object.keys(existingTasks).length === 0 || allDeleted(existingTasks)) {
    $('#checklist').append(emptyTemplate);
  } else {
    Object.keys(existingTasks).filter((taskId) => !existingTasks[taskId].recentlyDeleted)
      .slice(0, 3)
      .forEach((taskId) => {
        const task = existingTasks[taskId];
        if (!task.recentlyDeleted) {
          const dueDate = new Date(task.due);
          const now = new Date();
          const passed = dueDate < now;
          const parts = dueDate.toLocaleString().split(',');
          const formattedDueDate = `Due ${parts[0]}, at${parts[1]}`;
          const label = `form-check-label${passed ? ' text-danger' : ''}`;
          $('#checklist').append(`
            <li class="list-group-item mt-3 justify-content-between align-items-center">
              <div class="form-check d-flex popup-form-check align-items-center pb-1">
                <input type="checkbox" class="form-check-input" id="item${task.id}">
                <div class="container mt-1">
                  <div class="row">
                    <label class="emphasis-label ${label}" associatedTask="${task.id}">${task.title}</label>
                    <label class="${label}" associatedTask="${task.id}">${formattedDueDate}</label>
                  </div>
                </div>
              </div>
            </li>
          `);
        }
        setTimeout(() => {
          $('.list-group-item').addClass('appear');
        }, 200);
      });
    $('.form-check-input').on('click', function _() {
      const taskId = $(this).attr('id').slice(4);
      const item = $(this).closest('.list-group-item');
      let step = item.data('step') || 0;
      clearInterval(item.data('interval'));
      if ($(this).is(':checked')) {
        const interval = setInterval(() => {
          if (step <= 1000) {
            item.css({
              background: `linear-gradient(to right, var(--del-progress-color) ${(step / 1000) * 100}%, var(--ui-pane-color) 0%)`,
            });
            step += 1;
            item.data('step', step);
          } else {
            clearInterval(interval);
            chrome.storage.local.get({ tasks: {} }, (result) => {
              setTaskDeleted(result.tasks, taskId);
              item.remove();
              if ($('#checklist').children().length === 0) {
                $('#checklist').append(emptyTemplate);
              }
            });
          }
        }, 5);
        item.data('interval', interval);
      } else {
        const interval = setInterval(() => {
          if (step > 0) {
            item.css({
              background: `linear-gradient(to right, var(--del-progress-color) ${(step / 1000) * 100}%, var(--ui-pane-color) 0%)`,
            });
            step -= 20;
            if (step < 0) {
              step = 0;
            }
            item.data('step', step);
          } else {
            item.css({
              background: 'linear-gradient(to right, var(--del-progress-color) 0%, var(--ui-pane-color) 0%)',
            });
            clearInterval(interval);
          }
        }, 5);
        item.data('interval', interval);
      }
    });
  }
}

function updateIndicator() {
  Promise.all([checkSitesList(), checkUrlsList(), checkStringMatchesList(), checkRegexList()])
    .then((results) => {
      if (results.some((result) => result)) {
        console.log('Enable');
        $('#indexing-indicator').removeClass('disabled').addClass('enabled');
      } else {
        console.log('Disable');
        $('#indexing-indicator').removeClass('enabled').addClass('disabled');
      }
    });
}

async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  currentURL = tab.url;
}

function getTabAndUpdateIndicator() {
  getCurrentTab().then(() => {
    updateIndicator();
  });
}

if (window.location.href.startsWith(chrome.runtime.getURL(''))) {
  $(() => {
    function loadContent(page) {
      fetch(page)
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          return response.text();
        })
        .then((html) => {
          const $content = $('#content');
          $content.html(html);

          $content.find('script').each(function () {
            const scriptElement = $(this);
            const scriptSrc = scriptElement.attr('src');

            if (scriptSrc) {
              const script = document.createElement('script');
              script.src = scriptSrc;
              script.async = false; // Ensure scripts are executed in order
              document.head.appendChild(script);
            } else {
              const inlineCode = scriptElement.html();
              const script = document.createElement('script');
              script.textContent = inlineCode;
              document.head.appendChild(script);
            }
          });
        })
        .catch((error) => {
          console.error('Error loading content:', error.message, error.stack);
        });
    }

    $('#todo-list-button').on('click', () => {
      loadContent('todo_list.html');
    });

    $('#manage-settings').on('click', () => {
      loadContent('settings.html');
    });

    $('#notebook').on('click', () => {
      loadContent('add_note.html');
    });

    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === 'URL_UPDATED') {
        console.log('URL WAS UPDATED');
        currentURL = message.url;
        updateIndicator();
      }
      if (message.type === 'TAB_CHANGED') {
        console.log('TAB WAS CHANGED');
        currentURL = message.url;
        updateIndicator();
      }
    });

    chrome.storage.local.get({ tasks: {} }, (result) => {
      const existingTasks = sortTasks(result.tasks) || {};
      updateChecklist(existingTasks);
    });
  });
}

$(document).ready(() => {
  getTabAndUpdateIndicator();
  $('#show-date-picker').on('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    // Hide dropdown menu
    $('#due-dropdown-menu').hide();

    // Show the date picker
    $('#date-picker-wrapper').show();
  });

  $('#date-picker').on('change', function () {
    // Get selected date value
    const selectedDate = $(this).val();

    // Replace dropdown button text with the selected date
    $('#due-dropdown-button').text(selectedDate);

    // Hide date picker after selection
    $('#date-picker-wrapper').hide();
  });
});

// Listen for indexing status messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'indexing_status') {
    const indicator = document.getElementById('indexing-indicator');
    if (indicator) {
      // Remove both classes first
      indicator.classList.remove('enabled', 'disabled');
      // Add the appropriate class
      indicator.classList.add(message.status);
    }
  }
});
