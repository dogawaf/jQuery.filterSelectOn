/**
jQuery filterSelectOn plugin
see https://github.com/dogawaf/jQuery.filterSelectOn
require jQuery 1.7+

@copyright © 2012 Rémy DANIEL
E-mail contact: dogawaf@no-log.org
Twitter account: #dogawaf
*/

/*
most simple example :
	$('select[name="child"]').filterSelectOn({
		parentSelector: 'select[name=parent]'
	});

full example :

	$('select[name="child"]').filterSelectOn({
		parentSelector: 'select[name=parent]',
		emptyValueMask: /^$/,
		compareFunc: function(value, parentValue){
			return (value === parentValue);
		},
		callback: function(element){
			console.log(element)
		}
	});
*/
(function($) {

	var FilterSelectOn = function(element, options) {
		this._init(element, options);
	};

	var compareFunc = function(value, parentValue){
		return (value === parentValue);
	};

	FilterSelectOn.prototype = {

		constructor: FilterSelectOn,

		_init: function(element, options) {
			var o = this.options = $.extend({
				parentSelector: '',
				emptyValueMask: /^$/,
				compareFunc: compareFunc,
				callback: $.noop
			}, options);

			this.$element = $(element);
			this.$parentSelect = $(o.parentSelector);

			this._create();
		},

		_create: function() {
			var o = this.options;

			this.initialOptions = this.$element.children();

			this.$parentSelect.on('change.filterSelectOn', $.proxy(this._refresh, this));
		},

		_refresh: function() {

			var o = this.options,
				$element = this.$element,
				selectedValue = $element.val(),
				parentValue = this.$parentSelect.val(),
				emptyValueMask = o.emptyValueMask;

			// not any parent selected, all options are restored
			if (emptyValueMask.test(parentValue)) {

				$element.html(this.initialOptions);

				// reset selected item
				$element.val('');

			// a parent is selected, do filtering
			} else {

				// remove all options
				$element.empty();

				// reset selected item
				selectValue = '';

				// rebuild option list
				$(this.initialOptions).filter(function(i) {

					var $this = $(this),
					value = $this.attr('value');

					// an option with no value is always shown
					if (emptyValueMask.test(value)) {
						return true;
					}

					// does this option should be kept ?
					if (o.compareFunc($this.attr('data-parent'), parentValue)) {

						// it should be a better experience
						// if we can keep the selected item
						if (selectedValue === value) {
							selectValue = value;
						}

						return true;
					}

					return false;

				}).appendTo($element);

				$element.val(selectValue);
			}

			// callback
			o.callback.call($element.get(0));
		},

		refresh: function() {

			this._refresh();

			return this.$element;
		},

		destroy: function() {
			this.$parentSelect.off('.filterSelectOn');
		}

	};

	$.fn.filterSelectOn = function(option) {
		return this.each(function() {
			var $this = $(this),
				data = $this.data('filterSelectOn'),
				options = typeof option === 'object' && option;

			if (!data) {
				$this.data('filterSelectOn', (data = new FilterSelectOn(this, options)));
			}

			if (typeof option === 'string') {
				data[option]();
			}
		});
	};

})(jQuery);