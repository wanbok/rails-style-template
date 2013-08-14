$(document).ready(function () {
  $('.apiDestroy').apiDestroy();
});

(function ($) {
  $.fn.extend({
    apiDestroy: function () {
      return this.each(function () {
        var href = this.href;
        this.href = '#';

        $(this).click(function () {
          if (confirm("Are you sure?")) {
            $.ajax({
              type: "DELETE",
              url: href
            }).done(function () {
              window.location.reload();
            });
          }

          return false;
        });
      });
    }
  });
})(jQuery);

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}