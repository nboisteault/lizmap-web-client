//Open the console and copy-past this in for have the coordinates

//Get the coordinates when the mouse mouve or scroll
(function(c, u, r, p, o, s) {
    u = c[u] = {};
    u[r] = 0;
    u[p] = 0;
    u[o] = 0;
    u[s] = 0;
    document.addEventListener('mousemove', function(e) {
      u[r] = e[r];
      u[p] = e[p];
      u[o] = e[r] + c.scrollX;
      u[s] = e[p] + c.scrollY;
    });
    c.addEventListener('scroll', function() {
      u[o] = u[r] + c.scrollX;
      u[s] = u[p] + c.scrollY;
    });
  })(window, 'curPos', 'clientX', 'clientY', 'viewportX', 'viewportY');
  
  //Show the coordinates when the mouse click
  document.addEventListener('click', function(e) {
  
    console.log({
      "Horizontal coordinates in the window": curPos.clientX,
      "Vertical coordinates in the window": curPos.clientY,
      "Horizontal coordinates in the document": curPos.viewportX,
      "Vertical coordinates in the document": curPos.viewportY
    });
  
  });