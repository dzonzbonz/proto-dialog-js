# proto-dialog-js

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
var actions: {
    'actionKey': {
        'label': 'button label',
        'class': 'html classes',
        'on': {
            'click': function(e) {
                $(this).html('custom - custom on click event');
            },
            'mouseover': function(e) {
                $(this).html('custom - custom on mouse over event');
            }
        }
    }
};
```

### onInit

Type: `Function`
Default: function ($dialog) {}`

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
Default: function ($dialog) {}`

This method is called each time before the dialog is to be opened.

### onOpened

Type: `Function`
Default: function ($dialog) {}`

This method is called each time after the dialog has been opened.