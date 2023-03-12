$(document).ready(function() {
    var rangeSlider = $('.range-slider');
    var thumbWidth = $('.range-slider::-webkit-slider-thumb').width();
    var thumbHalfWidth = thumbWidth / 2;
  
    rangeSlider.on('input', function() {
      var value = $(this).val();
      $(this).css('background', 'linear-gradient(to right, #000 0%, #000 ' + value + '%, #fff ' + value + '%, #fff 100%)');
      $(this).css('background-size', value + '% 100%, 100% 100%');
      $(this).css('background-position', thumbHalfWidth + 'px center, 0px center');
    });
  });