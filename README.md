# Hawk 2

An indexing and productivity tool with easy backup features. Keep your to-do lists, your notes, and your documentation history in one place.

## About
Hawk 2 was built by a small team of university students for a software development team project.

This extension is derived from <a href="https://chromewebstore.google.com/detail/hawk-page-indexer/dmkfnkkgnjehlppknbpjhgbfeknmafde">Hawk - Page Indexer</a>.

## Installation

### From this repository
Hawk 2 is designed to be used on the latest version of Google Chrome, which you can install here: <a href="https://support.google.com/chrome/answer/95346?hl=en-GB&co=GENIE.Platform%3DDesktop#zippy=">Download and install Google Chrome</a>.

You should then clone and unzip the project repository to your preferred location.

To install the extension from your unzipped download:

1. Open Google Chrome.
2. Click the three dots in the top right corner of the browser window.
3. Select Settings.
4. On the left sidebar, select Manage Extensions (this will open in a new tab).
5. In the top right corner of the Extensions tab, toggle on Developer mode.
6. In the top left corner of the Extensions tab, select Load unpacked.
7. Navigate to the unzipped project folder and select it.
8. You should now be able to see Hawk 2 among your extensions! If you wish to pin it to your browser taskbar for ease of access, click the Extensions puzzle piece beside the omnibar, and click the pin beside Hawk 2.

## Features

### Indexer

#### Indexing Rules

The extension's indexer will store the title and contents of certain pages. By default, the following regex rules apply:

- ^https://[^/]+.amazon.com/.\*$
- ^https://atoz.amazon.work/.*$
- ^https://quip-amazon.com/.*$
- ^https://quip.com/.*$

There are four types of rules that can be used to trigger indexing:

- Site allow listing
- URL allow listing
- String matching allow listing
- Regex allow listing

All types of rules can be added and deleted. If you choose to remove all data and reset extension settings, the rules will be reset to the default four regex rules shown previously.

### How Pages Are Indexed

When a page is indexed, the title and content are stored in local Chrome storage after stopwords in the page's content are removed to reduce unnecessary storage size.

The amazon-quip.com site is also indexed by default, but there is a 10 second delay to handle redirects. Pages on amazon-quip.com are polled every minute to update the indexed contents, overwriting the old contents.

### Searching Indexed Documents

To begin searching for indexed pages, type "@i" in the omnibar and then hit Tab or Space. Any text typed afterwards will be used to search through all indexed content to provide relevant results for your query.

#### Search Filtering

By default when searching, all terms will be used to calculate the score each document is given. However, there are two operators that can be used to further filter the results shown by placing at the end of the search after a space:

- '&': shows documents that contain all of the terms in either their titles or contents
- '~': shows documents that contain the first term but none of the later terms

## Developer credits
- Kalila Chand  
- Jaden Green  
- Ryan Magaya  
- Yigit Sayar  
- Devansh Sharma  
- Kieran Watters