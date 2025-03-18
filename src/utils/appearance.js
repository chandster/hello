let first = true;

function loadCustomBackground() {
  chrome.storage.local.get('bg', (result) => {
    if (!$('body').hasClass('popup') && !$('body').hasClass('settings-body')) {
      if (result.bg !== '' && result.bg !== undefined) {
        $('body').css('background-image', `url(${result.bg})`);
      } else {
        $('body').css('background-image', 'var(--comic-bg)');
      }
    }
  });
}

function loadAppearance(usepref) {
  if (!first) {
    $('.card-title-lg').addClass('changing');
    $('.card-title-md').addClass('changing');
    $('.note-container').addClass('changing');
    $('.settings-container').addClass('changing');
    $('.filter-btn').addClass('changing');
    $('.panel-lg').addClass('changing');
  } else {
    first = false;
  }

  // always dark mode on load
  $('html').addClass('dark');
  $('html').attr('data-bs-theme', 'dark');
  loadCustomBackground();
}

if (window.location.href.startsWith(chrome.runtime.getURL(''))) {
  chrome.runtime.onMessage.addListener(
    (request) => {
      if (request === 'wallpaper') {
        loadCustomBackground();
      } else if (request === 'theme') {
        chrome.storage.local.get('useprefer', (result) => {
          loadAppearance(result.useprefer);
        });
      }
    },
  );
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    chrome.storage.local.get('useprefer', (result) => {
      if (result.useprefer === true) {
        loadAppearance(true);
      }
    });
  });
  chrome.storage.local.get('useprefer', (result) => {
    loadAppearance(result.useprefer);
  });
  $('body').removeClass('hidden');
}
