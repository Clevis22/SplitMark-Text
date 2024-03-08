# SplitMark

SplitMark- minimalist Quill based text editor with markdown support.
<br>
SplitMark is designed to be minimal yet powerful text editor, with a clean and simple user interface paired with the power of markdown and keyboard shortcuts. SplitMark also supports saving and loading files using the .spmk file extension, which is JSON-based and stores the contents of the editor. If you wish to use the real time markdown editor version of SplitMark it can be found at realtime.splitmark.com

## Dependencies
SplitMark is powerd by [Quill](https://quilljs.com/) and [Quilljs-markdown](https://cloverhearts.github.io/quilljs-markdown/)

## Keyboard Shortcuts
* Control Shift C: View word count
* Control +/-: Edit font size
* Control J: Toggle center/left align
* Control U: Underline
* Control Z: Undo
* Control Y: Redo

## Supported Markdown Syntax
```

1. 1 DEPTH
2. 2 DEPTH
 1. 2 SUB-DEPTH
 2. 2 SUB-DEPTH

* Bullet list
- Also a bullet list
**strong**
`hightlight`
~~strikethrough~~
*italic*

# H1
## H2
### H3
#### H4
##### H5
###### H6

An item with 3 backticks on each side makes a code block.

Task List
[x] Checked item
[ ] Unchecked item

> Block quote
![link text](link url)

```