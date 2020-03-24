let carousel = document.querySelector('.carousel');
let cells = carousel.querySelectorAll('.carousel__cell');
let cellCount; // cellCount set from cells-range input value
let selectedIndex = 0;
let cellWidth = carousel.offsetWidth;
let cellHeight = carousel.offsetHeight;
let isHorizontal = true;
let rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
let radius, theta;
// console.log( cellWidth, cellHeight );

function rotateCarousel() {
  let angle = theta * selectedIndex * -1;
  carousel.style.transform = 'translateZ(' + -radius + 'px) ' + 
    rotateFn + '(' + angle + 'deg)';
}

let prevButton = document.querySelector('.previous-button');
prevButton.addEventListener( 'click', function() {
  selectedIndex--;
  rotateCarousel();
});

let nextButton = document.querySelector('.next-button');
nextButton.addEventListener( 'click', function() {
  selectedIndex++;
  rotateCarousel();
});

let cellsRange = document.querySelector('.cells-range');
cellsRange.addEventListener( 'change', changeCarousel );
cellsRange.addEventListener( 'input', changeCarousel );



function changeCarousel() {
  cellCount = cellsRange.value;
  theta = 360 / cellCount;
  let cellSize = isHorizontal ? cellWidth : cellHeight;
  radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
  for ( let i=0; i < cells.length; i++ ) {
    let cell = cells[i];
    if ( i < cellCount ) {
      // visible cell
      cell.style.opacity = 1;
      let cellAngle = theta * i;
      cell.style.transform = rotateFn + '(' + cellAngle + 'deg) translateZ(' + radius + 'px)';
    } else {
      // hidden cell
      cell.style.opacity = 0;
      cell.style.transform = 'none';
    }
  }

  rotateCarousel();
}

let orientationRadios = document.querySelectorAll('input[name="orientation"]');
( function() {
  for ( let i=0; i < orientationRadios.length; i++ ) {
    let radio = orientationRadios[i];
    radio.addEventListener( 'change', onOrientationChange );
  }
})();

function onOrientationChange() {
  let checkedRadio = document.querySelector('input[name="orientation"]:checked');
  isHorizontal = checkedRadio.value == 'horizontal';
  rotateFn = isHorizontal ? 'rotateY' : 'rotateX';
  changeCarousel();
}

// set initials
onOrientationChange();
