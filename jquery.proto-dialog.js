/**
 * jQuery protoDialog
 * @author dzonz
 */
(function($) {

    var _protoDialogControllerClass = function($target, _settings) {
        var _instance = _settings;
        var _visible = false;
        
        var $canvas = $('<div class="proto-dialog-overlay"></div>');

        var _browserWindow = $('<div class="proto-dialog-window"></div>');
        var _browserInner = $('<div class="proto-dialog-inner"></div>');

        var _browserClose = $('<button type="button" class="proto-dialog-close proto-dialog-button"></button>');

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
            if (_visible) {
                return;
            }
            
            _instance.onOpen.call($target, $canvas);
//            _browserWindow.fadeOut(0);
        // call the animation window
            $canvas.fadeOut(0);
            $canvas.show();
            $canvas.fadeOut(0);
            
            var animationFunction = function (onDoneAnimating) {
                return function() {
                    $(this).find('.proto-dialog-inner').animate({
                        'top': '0px'
                    }, onDoneAnimating);
                };
            };
            
            if (_instance['animation']) {
                if (_instance['animation']['open']) {
                    animationFunction = _instance['animation']['open'];
                }
            }
            
            $canvas.fadeIn(300);
            
            animationFunction(function() {
                _visible = true;
                _instance.onResize.call($target, $canvas);
                _instance.onOpened.call($target, $canvas);
            }).call($canvas);
        };

        this.close = function() {
            if (!_visible) {
                return;
            }
            
            _instance.onClose.call($target, $canvas);
            
            var animationFunction = function (onDoneAnimating) {
                $(this).find('.proto-dialog-inner').animate({
                    'top': '-120%'
                }, onDoneAnimating);
            };
            
            if (_instance['animation']) {
                if (_instance['animation']['close']) {
                    animationFunction = _instance['animation']['close'];
                }
            }
            
            animationFunction.call($canvas);
            
            $canvas.fadeOut(300, function () {
                _visible = false;
                _instance.onClosed.call($target, $canvas);
            });
        };

        this.setTitle = function (newTitle) {
            _browserTitle.find('h3').empty().append(newTitle);
        };

        this.setContent = function (newContent) {
            $($target).empty().append(newContent);
        };

        this.getSettings = function () {
            return _instance;
        };

        this.isOpened = function () {
            return _visible;
        };

        this.setSettings = function(newSettings) {
            _instance = newSettings;

            if (_instance['actions']) {

                _browserActions.empty();

                for (var _action in _instance.actions) {
                    var _actionConfig = _instance.actions[_action];
                    var $action = $('<button type="button" class="proto-dialog-button ' + _actionConfig['class'] + '">' + _actionConfig['label'] + '</button>');
                    if (_actionConfig['on']) {
                        for (var onEvent in _actionConfig['on']) {
                            (function(_on, _onFunction) {
                                $action.on(_on, function(e) {
                                    _onFunction.call($target, e, $canvas);
                                });
                            })(onEvent, _actionConfig['on'][onEvent]);
                        }
                    }
                    else {
                        (function(_a) {
                            $action.click(function(e) {
                                _instance.onAction.call($target, _a, e, $canvas);
                            });
                        })(_action);
                    }
                    
                    _browserActions.append($action);
                }
            }
        };

        var _this = this;
        
        _this.setSettings(_settings);
        
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
            if (_visible) {
                _instance.onResize.call($target, $canvas);
            }
        });
    };

    var methods = {
        init: function(options) {
            var _settings = $.extend({
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
                onAction: function(_action, _event, $dialog) {
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
                    if (_settings['title']) {
                        _controller.setTitle(_settings['title']);
                    }
                    
                    if (_settings['content']) {
                        _controller.setContent(_settings['content']);
                    }
                    
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
                    
                    _data['settings'] = $.extend(_data['settings'], _settings);
                    
                    console.log(_data['settings']);
                    
                    $this.data('protoDialog', _data);
                    _controller.setSettings(_data['settings']);
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