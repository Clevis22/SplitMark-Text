document.addEventListener('keydown', function(event) {
    // Existing font size adjustment logic
    if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '=')) {
        event.preventDefault(); // Prevent default zoom action
        const editor = document.querySelector('.ql-editor');
        const currentSize = parseFloat(window.getComputedStyle(editor, null).getPropertyValue('font-size'));
        editor.style.fontSize = (currentSize + 1) + 'px';
    } else if ((event.ctrlKey || event.metaKey) && (event.key === '-' || event.key === '_')) {
        event.preventDefault(); // Prevent default zoom out action
        const editor = document.querySelector('.ql-editor');
        const currentSize = parseFloat(window.getComputedStyle(editor, null).getPropertyValue('font-size'));
        if (currentSize > 1) {
            editor.style.fontSize = (currentSize - 1) + 'px';
        }
    }

    // Modified to trigger on Control + Shift + C (or Command + Shift + C on macOS)
    if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'C') {
        event.preventDefault(); // Prevent default action
        const text = document.querySelector('.ql-editor').innerText;
        const wordCount = text.split(/\s+/).filter(function(word) {
            return word.length > 0;
        }).length;

        // Show the popup with the word count
        const popup = document.getElementById('wordCountPopup');
        popup.style.display = 'block';
        popup.innerText = `Word Count: ${wordCount}`;

        // Add an event listener for keyup to hide the popup when the keys are released
        function hideWordCountPopup() {
            popup.style.display = 'none';
            document.removeEventListener('keyup', hideWordCountPopup); // Remove the listener after hiding
        }
        document.addEventListener('keyup', hideWordCountPopup);
    }
});