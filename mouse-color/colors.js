   function setColor(huePct, saturationPct, lightnessPct = 0.7) {
      let hue = parseInt(360 * huePct, 10);
      let saturation = parseInt(100 * saturationPct, 10);
      let lightness = parseInt(100 * lightnessPct, 10);

      let hslStr = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

      document.body.style['background-color'] = hslStr;
    }

    // The coordinate (x, y) is x pixels to the right and
    // y pixels DOWN from the upper left-hand corner of the browser
    document.addEventListener('mousemove', function(event) {
      let mouseX = event.offsetX;
      let mouseY = event.offsetY;
      let viewportWidth = window.innerWidth;
      let viewportHeight = window.innerHeight;

      setColor(mouseX / viewportWidth, 1 - mouseY / viewportHeight);
    });
