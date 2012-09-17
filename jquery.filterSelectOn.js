/**
 * jQuery filterSelectOn plugin
 * see http://jsfiddle.net/dogawaf/KT2Qb/ for example and simple usecase
 * need jQuery 1.7+
 *
 * example :
 * 
 *    $('select[name="child"]').filterSelectOn({
 *        parentSelector: 'select[name=parent]',
 *        callback: function(){
 *            console.log($(this).children().size());
 *        }
 *    });
 *
 * 
 * @copyright © 2012 Rémy DANIEL
 * E-mail contact: dogawaf@no-log.org
 * Twitter account: #dogawaf
 *
 * Enjoy !
 */
(function($) {

	var FilterSelectOn = function(element, options) {
		this.init(element, options);
	};

	FilterSelectOn.prototype = {

		constructor: FilterSelectOn,

		init: function(element, options) {
			var o = this.options = $.extend({
				parentSelector: '',
				emptyValueMask: /^$/,
				delegateTo: 'form',
				callback: $.noop
			}, options);

			this.$element = $(element);
			this.$parentSelect = $(o.parentSelector);

			this._create();
		},

		_create: function() {
			var o = this.options;

			this.initialOptions = this.$element.children();
			
			this.$element.closest(o.delegateTo)
				.on('change.filterSelectOn', o.parentSelector, $.proxy(this._sync, this))
				.on('create.filterSelectOn', $.proxy(this.refresh, this));
		},

		_sync: function() {
			
			var o = this.options,
				$element = this.$element,
				parentValue = this.$parentSelect.val(),
				emptyValueMask = o.emptyValueMask;

			if (emptyValueMask.test(parentValue)) {

				$element.html(this.initialOptions);

			} else {

				$element.empty();

				$(this.initialOptions).filter(function(i) {

					var $this = $(this);

					if (emptyValueMask.test($this.attr('value'))) {
						return true;
					}

					if ($this.attr('data-parent') === parentValue) {
						return true;
					}

					return false;
				}).appendTo($element);

			}

			$element.prop('selectedIndex', 0);

			o.callback.call($element.get(0));
		},

		refresh: function() {
			this.initialOptions = this.$element.children();

			return this.$element;
		}

	};

	$.fn.filterSelectOn = function(option) {
		return this.each(function() {
			var $this = $(this),
				data = $this.data('filterSelectOn'),
				options = typeof option == 'object' && option;

			if (!data) {
				$this.data('filterSelectOn', (data = new FilterSelectOn(this, options)));
			}

			if (typeof option == 'string') {
				data[option]();
			}
		});
	};

})(jQuery);