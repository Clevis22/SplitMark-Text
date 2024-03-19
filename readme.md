SplitMark
=========

No login, no ads just minimalist text editing with markdown superpowers.

About
-----

SplitMark is a minimalist Quill-based text editor with markdown support. It is designed to be minimal yet powerful, with a clean and simple user interface paired with the capability of markdown and keyboard shortcuts. SplitMark gives you all the power of WYSIWYG rich text editors in an online minimalist package.

How It Works
------------

At its core, SplitMark is a Quill-based text editor. Quill is a free, open-source JavaScript library that allows developers to create rich text editors for the web. Quill also supports third-party modules such as Quilljs-Markdown, which SplitMark uses, along with custom methods to add markdown support to Quill.

All editing on SplitMark happens on the client side, meaning your text never leaves your browser unless you save the content to your device. Saves are stored using the .spmk file extension, which is JSON-based and stores the editor's content. Local storage is also used to store editor content in your browser between sessions.

All of this combined with a minimal ui with light/dark themes, powerful keybord shortcuts and a privacy focussed mentality creates a distraction free yet powerful online writing experience.

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