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
        pattern: /\[(.+?)\]\((.+?)\)/g,
      },
      image: {
        pattern: /!\[(.+?)\]\((.+?)\)/g,
      },
      list: {
        pattern: /^(\\d+\\.\\s|\\-\\s)/g,
      },
    },
  },
  toolbar: false
};

const editor = new Quill('#editor', {
  modules: {
    ...customModules, // Merge custom modules with default modules
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'
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
    link.download = 'my_content_delta.spmk';

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

// Attach click events to custom buttons
//document.querySelector('.ql-save').addEventListener('click', loadFromFile);
//document.querySelector('.ql-export').addEventListener('click', exportFunction);