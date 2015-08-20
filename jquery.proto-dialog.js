/**
 * jQuery protoDialog
 * @author dzonz
 */
(function($) {

    var _protoDialogControllerClass = function($target, _settings) {
        var _instance = _settings;

        var $canvas = $('<div class="proto-dialog-overlay"></div>');

        var _browserWindow = $('<div class="proto-dialog-window"></div>');
        var _browserInner = $('<div class="proto-dialog-inner"></div>');

        var _browserClose = $('<div class="proto-dialog-close proto-dialog-button"></div>');

        var _browserTitle = $('<div class="proto-dialog-title"><h3></h3></div>');
        var _browserContent = $('<div class="proto-dialog-content"></div>');
        var _browserActions = $('<div class="proto-dialog-actions"></div>');

        $target.detach().appendTo(_browserContent);

        _browserInner.append(_browserClose)
                .append(_browserTitle)
                .append(_browserContent)
                .append(_browserActions);

        _browserWindow.append(_browserInner);
        $canvas.append(_browserWindow);

        $('body').append($canvas);

        this.open = function() {
            
            _instance.onOpen.call($target, $canvas);
//            _browserWindow.fadeOut(0);
            $canvas.fadeOut(0);
            $canvas.show();
            $canvas.fadeOut(0);
            $canvas.fadeIn(500, function() {
                _browserInner.animate({
                    'top': '0px'
                }, function() {
                    _instance.onResize.call($target, $canvas);
                    _instance.onOpened.call($target, $canvas);
                });
            });
        };

        this.close = function() {
            _instance.onClose.call($target, $canvas);
            _browserInner.animate({
                    'top': '-100%'
                }, function() {
                $canvas.fadeOut(500, function() {
                    $canvas.hide();
                    _instance.onClosed.call($target, $canvas);
                });
            });
        };

        this.settings = function(newSettings) {
            _instance = newSettings;

            _browserWindow.attr('class', 'proto-dialog-window');

            if (_instance['size']) {
                _browserWindow.addClass(_instance['size']);
            }

            if (_instance['actions']) {

                _browserActions.empty();

                for (var _action in _instance.actions) {
                    var _actionConfig = _instance.actions[_action];
                    var $action = $('<button type="button" class="proto-dialog-button ' + _actionConfig['class'] + '">' + _actionConfig['label'] + '</button>');
                    _browserActions.append($action);
                    (function(_a) {
                        $action.click(function(e) {
                            _instance.onAction.call($target, _a, $canvas, e);
                        });
                    })(_action);
                }
            }
        };

        var _this = this;
        
        _this.settings(_settings);
        
        _browserWindow.click(function (e) {
            e.stopPropagation();
    	});
    	
        _browserClose.click(function (e) {
            e.preventDefault();
            _this.close();
    	});
        
    	$canvas.click(function (e) {
            _this.close();
    	});
        
        _instance.onInit.call($target, $canvas);
        
        $(window).resize(function () {
            _instance.onResize.call($target, $canvas);
        });
    };

    var methods = {
        init: function(options) {
            var _settings = $.extend({
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
            }, options);

            return this.each(function() {
                var $this = $(this);
                var _data = $this.data('protoDialog');

                // If the plugin hasn't been initialized yet
                if (!_data) {
                    // search for elements
                    var _controller = new _protoDialogControllerClass($this, _settings);

                    _data = {
                        target: $this,
                        settings: _settings,
                        controller: _controller
                    };
                } else {
                    _data = $(this).data('protoDialog');
                    _data['settings'] = _settings;
                }

                $(this).data('protoDialog', _data);
            });
        },
        open: function(_settings) {
            return this.each(function() {
                var $this = $(this);
                var _data = $this.data('protoDialog');
                // If the plugin hasn't been initialized yet
                if (_data) {
                    // search for elements
                    var _controller = _data['controller'];
                        _controller.open();
                }
            });
        },
        close: function( ) {
            return this.each(function() {
                var $this = $(this);
                var _data = $this.data('protoDialog');

                // If the plugin hasn't been initialized yet
                if (_data) {
                    // search for elements
                    var _controller = _data['controller'];
                        _controller.close();
                }
            });
        },
        settings: function(_settings) {
            return this.each(function() {
                var $this = $(this);
                var _data = $this.data('protoDialog');

                // If the plugin hasn't been initialized yet
                if (_data) {
                    // search for elements
                    var _controller = _data['controller'];
                    _data['settings'] = _settings;
                    $this.data('protoDialog', _data);
                    _controller.settings(_settings);
                }
            });
        }

    };

    $.fn.protoDialog = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.protoDialog');
        }
    };

})(jQuery); // pass the jQuery object to this function