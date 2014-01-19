/**
 * @file
 * Masonry script.
 */

(function($) {

Drupal.behaviors.masonry = {
  attach: function(context, settings) {

    // Iterate through all Masonry instances
    $.each(Drupal.settings.masonry, function (container, settings) {
      // Set container
      var $container = $(container);

      // Set options
      var $options = new Object();
      if (settings.item_selector) {
        $options.itemSelector = settings.item_selector;
      }
      if (settings.column_width) {
        if (settings.column_width_units == 'px') {
          $options.columnWidth = settings.column_width;
        }
        else if (settings.column_width_units == '%') {
          $options.columnWidth = function (containerWidth) {
            return containerWidth * (settings.column_width / 100);
          };
        }
      }
      $options.gutter = settings.gutter_width;
      $options.isResizable = settings.resizable;
      if (settings.resizable) {
        $options.isAnimated = settings.animated;
        if (settings.animated) {
          $options.animationOptions = {
            queue: false,
            duration: settings.animation_duration
          };
        }
      }
      $options.isFitWidth = settings.fit_width;
      $options.isRTL = settings.rtl;
      if (settings.stamp) {
        $options.stamp = settings.stamp;
      }

      // Apply Masonry to container
      var masonry_enabled = Masonry.data($container.get(0));

      // By default, Masonry 3 new items appended to container even if we call
      // layout(). We need to add them first
      if (masonry_enabled) {
        var new_elements = [];

        $($options.itemSelector, $container).each(function(i){
          if (typeof $container.masonry('getItem', this).element === 'undefined') {
            new_elements.push(this);
          }
        });

        if (new_elements.length) {
          $container.masonry('appended', new_elements);
          new_elements.length = 0;
        }
      }

      // Init mansory or call layout again if new
      if (settings.images_first) {
        $container.imagesLoaded(function () {
          masonry_enabled ? $container.masonry('layout') : $container.masonry($options);
        });
      }
      else {
        masonry_enabled ? $container.masonry('layout') : $container.masonry($options);
      }
    });
  }
};

})(jQuery);
