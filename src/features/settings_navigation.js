function main() {
  console.log('Document is ready!');

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
      console.log('Clicked on:', entry);
      const targetId = entry.getAttribute('data-target');
      showPane(targetId);
    });
  });

  // Go Back Button
  const goBackBtn = document.getElementById('goBackBtn');

  if (goBackBtn) {
    goBackBtn.addEventListener('click', () => {
      console.log('Go back button clicked');

      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '../components/hello.html'; // Change to your desired fallback page
      }
    });
  } else {
    console.log('Go Back button not found in DOM');
  }

  // Show default pane on load
  showPane('appearance-pane');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
} else {
  main();
}
