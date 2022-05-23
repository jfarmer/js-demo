let simon = newSimon();

function hasKey(object, prop) {
  return Object.prototype.hasOwnProperty.call(object, prop);
}

function handleClick(simon, buttonColor) {
  if (simonIsInactive(simon) || simonIsFinished(simon)) {
    return;
  }

  simonMakeMove(simon, buttonColor);

  if (simonIsChallengeFresh(simon)) {
    setTimeout(() => {
      pressChallengeButtons(simon);
    }, 1000)
  }

  if (simonIsFinished(simon)) {
    let score = simonGetScore(simon);
    simon.state = SIMON_STATES.FINISHED;

    alert(`Game over! Your score is ${score}`);
  }
}

let chords = {
  'major': {
    'green': 'G4',
    'red': 'E4',
    'yellow': 'C4',
    'blue': 'G3',
  },
  'minor': {
    'green': 'G4',
    'red': 'Eb4',
    'yellow': 'C4',
    'blue': 'G3',
  },
  'diminished': {
    'green': 'Gb4',
    'red': 'Eb4',
    'yellow': 'C4',
    'blue': 'Gb3',
  },
  'sus2': {
    'green': 'G4',
    'red': 'Eb4',
    'yellow': 'D4',
    'blue': 'G3',
  },
}

function fakeClick(button, duration) {
  pressButton(button);

  setTimeout(() => {
    releaseButton(button);
  }, duration);
}

function pressButtons(colors, delay) {
  console.log(colors);
  if (colors.length === 0) {
    return;
  }

  let color = colors[0];

  fakeClick(color, 200);

  setTimeout(() => {
    pressButtons(colors.slice(1), delay);
  }, delay);
}

function pressChallengeButtons(simon) {
  pressButtons(simon.challenge, 500);
}

$('#simon-start').on('click', function() {
  simonStart(simon);

  pressChallengeButtons(simon);
});

function pressButton(color) {
  let button = document.getElementById(color);

  $(button).addClass('light-up');


  let chordFlavor = $("#chord option:selected").val();
  let waveform = $('#waveform option:selected').val();

  playNote(chords[chordFlavor][color], waveform);
}

function releaseButton(color) {
  let button = document.getElementById(color);
  $(button).removeClass('light-up');
}

$('.simon-button').on('mousedown', function() {
  let buttonColor = $(this).attr('id');

  pressButton(buttonColor);
});

$('.simon-button').on('mouseup', function() {
  let buttonColor = $(this).attr('id');
  releaseButton(buttonColor)

  handleClick(simon, buttonColor);
});

$(document).on('keydown', function(event) {
  let char = String.fromCharCode(event.keyCode);

  let keyToColor = {
    'T': 'green',
    'Y': 'red',
    'G': 'yellow',
    'H': 'blue',
  };

  if (hasKey(keyToColor, char)) {
    pressButton(keyToColor[char]);
  }
});

$(document).on('keyup', function(event) {
  let char = String.fromCharCode(event.keyCode);

  let keyToColor = {
    'T': 'green',
    'Y': 'red',
    'G': 'yellow',
    'H': 'blue',
  };

  if (hasKey(keyToColor, char)) {
    let buttonColor = keyToColor[char];

    releaseButton(buttonColor);
    handleClick(simon, buttonColor);
  }
});
