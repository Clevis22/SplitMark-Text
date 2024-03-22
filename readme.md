SplitMark
=========

No login, no ads just text editing with markdown superpowers.

About
-----

SplitMark is a minimalist, Quill-based online text editor with robust markdown support. It combines a clean and simple user interface with the power of rich-text editing and markdown capabilities, giving you a distraction-free yet powerful writing experience.

While most modern writing apps and websites have become increasingly bloated with complex features, distracting advertisements, and requirements to create accounts, SplitMark takes an intentionally minimal approach. It was inspired by a desire to get back to a distraction-free, privacy-focused online writing experience without the hassle of logins, subscriptions, or intrusive monetization. SplitMark provides the core rich-text editing capabilities you need, wrapped in a clean interface that allows you to simply open and write.

How It Works
------------

SplitMark is built on top of Quill, a free and open-source rich text editor for the web. It leverages the Quilljs-Markdown module along with custom methods to add full markdown support on top of Quill's WYSIWYG editing capabilities.

All editing on SplitMark happens on the client side, meaning your text never leaves your browser unless you save the content to your device. Saves are stored using the .spmk file extension, which is JSON-based and stores the editor's content using quill-delta. Local storage is also used to store editor content in your browser between sessions. If browser history or data is cleared, saved editor content may be lost. Always download important content using the save button.

SplitMark also contains three tabs to toggle between using the Tabs button. This allows for editing multiple documents without the need for duplicate browser tabs. In fact, it is not recommended to have multiple tabs of SplitMark open at once, as local storage is used for editor-saving content, and if multiple tabs are open, some content may not be saved properly.

All of this, combined with a minimal user interface containing light and dark themes, powerful keyboard shortcuts, and a privacy-focused mentality, creates a distraction-free yet powerful online writing experience.

Dependencies
------------

SplitMark is powered by [Quill](https://quilljs.com/) and [Quilljs-markdown](https://cloverhearts.github.io/quilljs-markdown/).

Keyboard Shortcuts
------------------

*   Control Shift C: View word count
*   Control +/-: Edit font size
*   Control J: Toggle center/left align
*   Control U: Underline
*   Control B: Bold
*   Control I: Italic
*   Control Z: Undo
*   Control Y: Redo

Supported Markdown Syntax
-------------------------

SplitMark supports the following markdown syntax:
```
*   Headings: # (H1-H7)
*   Bullet lists: * and -
*   Numbered lists:  
    1. 1 DEPTH  
    2. 2 DEPTH  
        1. 2 SUB-DEPTH  
        2. 2 SUB-DEPTH
*   Bold: **bold** and __bold__
*   Highlight: `highlight`
*   Strikethrough: ~~strikethrough~~
*   Italic: *italic* and _italic_
*   Underline: ==underline==
*   Code block: ```code block```
*   Task lists: [\] and [x]
*   Block quote: >
*   Link: [text](source)
*   Image: ![alt text](source)
```
License
-------

SplitMark is an open source project licensed under the GPL-3.0 license. You can find the full source code on [GitHub](https://github.com/Clevis22/SplitMark-Text).