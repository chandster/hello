function updateIndicatorPosition(entry) {
    const indicator = document.querySelector('.settings-indicator');
    if (!indicator) return;
    
    const entryRect = entry.getBoundingClientRect();
    const sidebarRect = entry.parentElement.getBoundingClientRect();
    
    // Calculate horizontal position
    const left = entryRect.left - sidebarRect.left;
    const width = entryRect.width;
    
    // Update indicator position and width
    indicator.style.transform = `translateX(${left}px)`;
    indicator.style.width = `${width}px`;
}

function handleResize() {
    const selectedEntry = document.querySelector('.settings-entry.selected');
    if (selectedEntry) {
        updateIndicatorPosition(selectedEntry);
    }
}

function main() {
  const settingsEntries = document.querySelectorAll('.settings-entry');
  const panes = document.querySelectorAll('.settings-pane');

  function showPane(targetId) {
    // Hide all panes
    panes.forEach((pane) => {
      pane.classList.remove('active');
      pane.classList.add('d-none');
    });

    // Show the target pane
    const targetPane = document.getElementById(targetId);
    if (targetPane) {
      targetPane.classList.add('active');
      targetPane.classList.remove('d-none');
    }

    // Update sidebar entry selection
    settingsEntries.forEach((entry) => {
      entry.classList.toggle('selected', entry.getAttribute('data-target') === targetId);
    });
  }

  // Attach click event listeners
  settingsEntries.forEach((entry) => {
    entry.addEventListener('click', () => {
      const targetId = entry.getAttribute('data-target');
      showPane(targetId);
      // Add this line to update indicator position
      updateIndicatorPosition(entry);
    });
  });

  // Add resize event listener
  window.addEventListener('resize', handleResize);

  // Update initial indicator position
  window.addEventListener('load', () => {
    const selectedEntry = document.querySelector('.settings-entry.selected');
    if (selectedEntry) {
      updateIndicatorPosition(selectedEntry);
    }
  });

  // Go Back Button
  const goBackBtn = document.getElementById('goBackBtn');

  if (goBackBtn) {
    goBackBtn.addEventListener('click', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '../components/hello.html'; // Change to your desired fallback page
      }
    });
  }

  // Show default pane on load
  showPane('indexing-pane');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
