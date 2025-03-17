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

### Indexing

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

#### Searching Indexed Documents

To begin searching for indexed pages, type "i" in the omnibar and type text to search. Any text typed will be used to search through all indexed content to provide relevant results for your query.

### Tasks

From the side panel, you can type in your task. You can set a due date from the dropdown menu upon which day you will receive an alarm notification from Google Chrome at 9AM. The default due date is 7 days from the current date. You can also create and select tags for your tasks and then view select tasks using the 'Group by' button. Click on a task to edit or delete it.

#### Add tasks from the web

While browsing any web page, you can select text and right click. A context menu will appear with the option 'Hawk 2 - Add text to Notes' which if selected will make a task with the selected text. The text will appear with the title of the web page it came from as a task in your task list on Hawk 2. You can edit this task, change its due date and add tags by opening the extension.

## Developer credits
- Kalila Chand  
- Jaden Green  
- Ryan Magaya  
- Yigit Sayar  
- Devansh Sharma  
- Kieran Watters