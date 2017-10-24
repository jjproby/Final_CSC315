// Jquery stuff for crossword puzzle



(function($)){
  $.fn.crossword = function(entryData) {

    var puzzle = {};
    puzzle.data = entryData;


    this.after('<div id="puzzle-clues"><h2>Across</h2><ol id="across"></o1><h2>Down</h2><ol id="down"></ol></div>');

    var tb1 = ['<table id = "puzzle">'];
    var puzzleE1 = this;
    var clues = $('#puzzle-clues');
    var clueListE1;
    var coords;
    var entryCount = puzzle.data.length;
    var entries = [];
    var rows = [];
    var cols = [];
    var solved = [];
    var tabindex;
    var $actives;
    var activePosition = 0;
    var activeClueIndex = 0;
    var currentOri;
    var targetInput;
    var mode = 'interacting';
    var solvedToggle = false;
    var z = 0;

    var puzInit = {

      init: function() {
        currentOri = 'across' //initial orientation

        puzzle.data.sort(function(a,b) {
          return a.position - b.position;
        });

        puzzleE1.delegate('input', 'keyup', function(e) {
          mode = 'interacting';

          switch (e.which) {
            case 39:
            case 37:
              currentOri

              break;
            default:

          }
        })
      }
    }

  }
 }
