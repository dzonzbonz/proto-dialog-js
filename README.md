# proto-dialog-js

## Table of Contents

- [Usage](#usage)
- [Options](#options)
    - [Actions](#actions)
    - [onAction](#onaction)
    - [onInit](#oninit)
    - [onOpen](#onopen)
    - [onOpened](#onopened)
	- [onClose](#onclose)
	- [onClosed](#onclosed)
    - [onResize](#onresize)
- [Methods](#methods)
    - [open](#open)
    - [close](#close)
    - [settings](#settings)
- [Advanced usage](#advanced-usage)
    - [Controller](#controller)
    - [Settings](#settings-1)
    - [Dialog](#dialog)

## Usage

```html
<link rel="stylesheet" type="text/css" href="proto-dialog.css"/>

<!-- ... -->

<script type="text/javascript" src="jquery.proto-dialog.js"></script>

<!-- ... -->

<div id="proto-dialog">
    <div id="proto-dialog-header"></div>
    <div id="proto-dialog-content"></div>
    <div id="proto-dialog-footer"></div>
<!-- ... -->
</div>
```

Add the UI.Layout module as a dependency to your application module:

```javascript
$('#proto-dialog').protoDialog({ ... });
```

## Options

```javascript
var protoDialogOptions = {
    actions: {
    },
    animation: {
        'open': false,
        'close': false
    },
    onInit: function($dialog) {
    },
    onOpen: function($dialog) {
    },
    onOpened: function($dialog) {
    },
    onClose: function($dialog) {
    },
    onClosed: function($dialog) {
    },
    onResize: function($dialog) {
    },
    onAction: function(_action, $dialog) {
    }
};
```

### actions

Type: `Object`
Default: `{}`

Define buttons that you want on action bar

```javascript
var actions = {
    'actionOne': {
        'label': 'button label',
        'class': 'html classes',
        'on': {
            'click': function(event, $dialog) {
                $(this).html('custom - custom on click event');
            },
            'mouseover': function(event, $dialog) {
                $(this).html('custom - custom on mouse over event');
            }
        }
    },
    'actionTwo': {
        'label': 'button label',
        'class': 'html classes'
    },
    'actionTree': {
        'label': 'button label',
        'class': 'html classes'
    }
};
```

### onAction

Type: `Function`
Default: `function ($_action, _event, $dialog) {}`

This method is called each time when an action button is clicked. If you want to have full control on action button events use the `on` key in `actions`.

```javascript
var onAction = function (action, _event, $dialog) {
    switch(_action) {
        case 'actionTwo':
            /* Some specific action for button actionTwo */
            break;
        default:
            $(this).html(_action + ' - auto click event');
            break;
    }
};
```

### onInit

Type: `Function`
Default: `function ($dialog) {}`

This method is called when the dialog is initialized for the first time, and it is called one time only from the widget.

```javascript
var onInit: function ($dialog) {
    var protoDialogContent = $dialog.find('.proto-dialog-content');
    var dialogFooter = $dialog.find('#proto-dialog-footer');
    var dialogHeader = $(this).find('#proto-dialog-header');
};
```

### onOpen

Type: `Function`
Default: `function ($dialog) {}`

This method is called each time before the dialog is to be opened.

### onOpened

Type: `Function`
Default: `function ($dialog) {}`

This method is called each time after the dialog has been opened.

### onClose

Type: `Function`
Default: `function ($dialog) {}`

This method is called each time before the dialog is to be closed.

### onClosed

Type: `Function`
Default: `function ($dialog) {}`

This method is called each time after the dialog has been closed.

### onResize

Type: `Function`
Default: `function ($dialog) {}`

This method is called each time when the screen size changes.

## Methods

### open

### close

### settings

## Advanced usage

### Controller

### Settings

### Dialog
