$(document).ready(function(){
 
  // hide our element on page load
  $('#element-to-animate').css('opacity', 0);
 
  $('#element-to-animate').waypoint(function() {
      $('#element-to-animate').addClass('bounceInUp');
  }, { offset: '50%' });
 
});