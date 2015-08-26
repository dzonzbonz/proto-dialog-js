# proto-dialog-js

## Usage

```html
<link rel="stylesheet" type="text/css" href="proto-dialog.css"/>

<!-- ... -->

<script type="text/javascript" src="jquery.proto-dialog.js"></script>

<!-- ... -->

<div id="proto-dialog">
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
    }
};
```