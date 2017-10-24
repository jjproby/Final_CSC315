//javascript for crossword puzzle

(function($) {
  $(function() {
    //the values for the crossword puzzle clues

    var puzzleData = [
      {
        clue: "First letter of greek alphabet",
        answer: "alpha",
        position: 1,
        orientation: "across",
        startx: 1,
        starty: 1,
      },
      {
        clue: "Defines the alpha-numeric characters that are typically associated with text used in programming",
        answer: "ascii",
        position: 1,
        orientation: "down",
        startx: 1,
        starty: 1
      }
    ]

    $('#puzzle-wrapper').crossword(puzzleData);

  })
})(jQuery)
