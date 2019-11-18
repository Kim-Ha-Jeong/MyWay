$(function() {
var o = $('#a');
var sx, sy, dx, dy, ix, iy;
var dragging = false;
$('#a').on('mousedown', function(e) {
  e.preventDefault();
  sx = e.pageX;
  sy = e.pageY;
  ix = $(o).offset().left;
  iy = $(o).offset().top;
  dx=dy=0;
  dragging = true;
  console.log("mousedown - s:",sx,sy,"/i:",ix,iy);
}).on('mousemove', function(e) {
  if(dragging) {
    dx = e.pageX - sx;
    dy = e.pageY - sy;
    $(o).offset({left: ix + dx, top: iy + dy});
    $(debug).text(dx + "," + dy);
  }
}).on('mouseup', function(e){
  dx = e.pageX - sx;
  dy = e.pageY - sy;
  $(o).offset({left: ix + dx, top: iy + dy});
  dragging = false;
  console.log("mouseup - d:",dx,dy,"/i:",ix,iy);
});
});
