Quill.register('modules/QuillMarkdown', QuillMarkdown);
var icons = Quill.import('ui/icons');
icons['bold'] = '<i class="fa fa-bold" aria-hidden="true"></i>';
icons['save'] = '<i class="fa fa-save" aria-hidden="true"></i>'; // Add this line
icons['export'] = '<i class="fa fa-file-export" aria-hidden="true"></i>'; // Add this line
const customModules = {
  QuillMarkdown: {
    ignoreTags: [],
    tags: {
      blockquote: {
        pattern: /^(\|){1,6}\s|^\>\s/g,
      },
      code: {
        pattern: /`(.+?)`/g,
      },
      link: {
        pattern: /(?<!!)\[(.+?)\]\((.+?)\)/g,
      },
      list: {
        pattern: /^(\\d+\\.\\s|\\-\\s)/g,
      },
    },
  },
  toolbar: false
};

const placeholderTexts = ["Compose an epic...", "Start your journey...", "Unleash your creativity!", "You can use Markdown here...", "Minimal yet powerful...", "Markdown Superpowers...", "Write your story...", "Write your thoughts...", "Write your ideas...", "Write your dreams...","Support open source...","Compose a story...", "Write some notes...","Draft your masterpiece...","Craft your next adventure...","Empty webpage or powerful editor?","Write something punny...",];

const editor = new Quill('#editor', {
  modules: {
    ...customModules, // Merge custom modules with default modules
  },
  placeholder: placeholderTexts[Math.floor(Math.random() * placeholderTexts.length)],
  theme: 'snow'
  
});

editor.on('selection-change', (range, oldRange, source) => {
  if (range === null) return; // Return if there is no range
  if (source !== 'user') return; // Return if the change was not initiated by the user

  editor.scrollIntoView(range);
});

// Load content from localStorage
const storedContent = localStorage.getItem('editorContent');
if (storedContent) {
  const delta = JSON.parse(storedContent);
  editor.setContents(delta);
}

// Load theme from localStorage
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  if(storedTheme === 'dark-mode') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

// Save content to localStorage on text-change
editor.on('text-change', () => {
  const delta = editor.getContents();
  const stringifiedDelta = JSON.stringify(delta);
  localStorage.setItem('editorContent', stringifiedDelta);
});

const exportFunction = () => {
  try {
    // Get Delta object and convert to JSON string
    const delta = editor.getContents();
    const stringifiedDelta = JSON.stringify(delta);

    // Create a Blob object with the JSON string and content type
    const blob = new Blob([stringifiedDelta], { type: 'application/json' });

    // Create a link element and set attributes
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Editor_Content.spmk';

    // Trigger download and revoke temporary URL
    link.click();
    URL.revokeObjectURL(link.href);

    // Display success message (optional)
    console.log("Content exported successfully!");
  } catch (error) {
    // Handle errors (e.g., conversion or download failure)
    console.error("Error exporting content:", error);
    // You can display an error message to the user here
  }
};

const loadFromFile = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.spmk'; // Accept only JSON files

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (!file) {
      return; // No file selected
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const deltaObject = event.target.result;
        loadFunction(deltaObject); // Call the existing loadFunction
      } catch (error) {
        console.error("Error loading content:", error);
        // You can display an error message to the user here
      }
    };

    reader.readAsText(file); // Read the file content as text
  });

  fileInput.click(); // Simulate a click event to open the file dialog
};

const loadFunction = (deltaObject) => {
  try {
    // Parse the provided JSON object
    const delta = JSON.parse(deltaObject);

    // Load the Delta object into the editor
    editor.setContents(delta);

    // Optional: Display success message (e.g., console.log("Content loaded successfully!"))
  } catch (error) {
    // Handle errors (e.g., parsing or loading failure)
    console.error("Error loading content:", error);
    // You can display an error message to the user here
  }
};


function toggleTheme() {
  document.body.classList.toggle('dark-mode');

  // Check if dark mode is active after toggling
  const isDarkMode = document.body.classList.contains('dark-mode');

  // Save theme to localStorage
  localStorage.setItem('theme', isDarkMode ? 'dark-mode' : 'light-mode');
}

// Define keyboard shortcut keys
const toggleAlignKey = 74; // J

// Add event listener for keyboard shortcuts
document.addEventListener('keydown', (event) => {
  const isCommandPressed = event.ctrlKey || event.metaKey;

  if (isCommandPressed && event.keyCode === toggleAlignKey) {
    event.preventDefault(); // Prevent default behavior
    toggleAlignment();
  }
});

// Function to align text
function alignText(alignment) {
  const range = editor.getSelection();
  if (range) {
    // If no text is selected, select the entire line
    if (range.length === 0) {
      const [line] = editor.getLine(range.index);
      const lineLength = line.length();
      editor.setSelection(range.index, lineLength);
    }

    editor.formatLine(range.index, range.length, 'align', alignment);
  }
}

// Function to toggle alignment
let currentAlignment = ''; // Default alignment
function toggleAlignment() {
  switch (currentAlignment) {
    case '':
      alignText('center');
      currentAlignment = 'center';
      break;
    case 'center':
      alignText('');
      currentAlignment = '';
      break;
  }
}

editor.on('text-change', function(delta, oldDelta, source) {
    if (source === 'user') {
        const text = editor.getText();
        const underlineRegex = /(?<![\`\~\*\#\|\_])==(.*?)==(?![\`\~\*\#\|\_])/g;
        let match;
        const ranges = [];

        while ((match = underlineRegex.exec(text)) !== null) {
            const startIndex = match.index;
            const endIndex = match.index + match[0].length;
            const content = match[1];

            // Remove the delimiters
            editor.deleteText(startIndex, 2);
            editor.deleteText(endIndex - 4, 2); // Adjusted to delete the closing '=='

            ranges.push({
                index: startIndex,
                length: content.length
            });

            underlineRegex.lastIndex = endIndex - 4;
        }

        ranges.forEach(range => {
            editor.formatText(range.index, range.length, { 'underline': true });
        });

        // Check for new text entered outside the tags
        const currentSelection = editor.getSelection();
        const cursorIndex = currentSelection ? currentSelection.index : 0;

            // Remove underline formatting for new text outside tags
            editor.formatText(cursorIndex, 0, { 'underline': false });
        
    }
});

// Function to check if the cursor is inside '== =='
function isInsideUnderlineTags(text, cursorIndex) {
    const openTagRegex = /(?<![\`\~\*\#\|\_])==/g;
    const closeTagRegex = /==(?![\`\~\*\#\|\_])/g;

    const openMatch = openTagRegex.exec(text);
    const closeMatch = closeTagRegex.exec(text);

    return openMatch && closeMatch && openMatch.index < cursorIndex && cursorIndex < closeMatch.index;
}

function renderImageEmbed(src) {
  const range = editor.getSelection();
  editor.insertEmbed(range.index, 'image', src, 'user');
  editor.setSelection(range.index + 1, 0);
}

editor.on('text-change', function(delta, oldDelta, source) {
  if (source === 'user') {
    const text = editor.getText();
    const imageRegex = /!\[(?:(?<alt>.*?)|\s*)\]\((?<src>.*?)\)/g;
    let match;
    const ranges = [];

    while ((match = imageRegex.exec(text)) !== null) {
      const startIndex = match.index;
      const endIndex = match.index + match[0].length;
      const src = match.groups.src;

      ranges.push({
        index: startIndex,
        length: endIndex - startIndex,
        src,
      });
    }

    ranges.forEach(range => {
      editor.deleteText(range.index, range.length);
      renderImageEmbed(range.src);
    });
  }
});


console.log(
  `%c ________________________________________
|  Welcome to SplitMark!                 |
|  Check out the project on GitHub       |
|  Clevis22/SplitMark-Text               |
|________________________________________|
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||
  ^----^----^------^-------^--^--`,
  "font-family: monospace;"
);