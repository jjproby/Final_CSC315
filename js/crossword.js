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
        starty: 1,
      },
      {
        clue: "What does Pennywise take the shape of?",
        answer: "clown",
        position: 2,
        orientation: "across",
        startx: 1,
        starty: 3,
      },
      {
        clue: "Who is the last name of the Dad of the computer science department?",
        answer: "Sowell",
        position: 3,
        orientation: "down",
        startx: 7,
        starty: 1,
      },
      {
        clue: "Who is the story teller of the computer science department?",
        answer: "Leon",
        position: 4,
        orientation: "across",
        startx: 6,
        starty: 4,
      },
      {
        clue: "The last name of the creator of Pascal",
        answer: "wirth",
        position: 5,
        orientation: "down",
        startx: 4,
        starty: 3,
      },
      {
        clue: "The opposite of always",
        answer: "never",
        position: 6,
        orientation: "down",
        startx: 9,
        starty: 4,
      },
      {
        clue: "Popular programming language that is names after a snake",
        answer: "python",
        position: 7,
        orientation: "across",
        startx: 1,
        starty: 7,
      },
    ]

    $('#puzzle-wrapper').crossword(puzzleData);

  })
})(jQuery)
