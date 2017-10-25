// Jquery stuff for crossword puzzle



(function($){
  $.fn.crossword = function(entryData) {

    var puzzle = {}; //puts the puzzle clues into an array of objects
    puzzle.data = entryData;

    //puts clues into html
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

        //orders problems by position
        puzzle.data.sort(function(a,b) {
          return a.position - b.position;
        });

        puzzleE1.delegate('input', 'keyup', function(e) {
          mode = 'interacting';
        });

        //for tab navigation
        puzzleE1.delegate('input', 'click', function(e) {
          mode = "setting ui";
          if (solvedToggle) solvedToggle = false;

          console.log('input click: ' + solvedToggle);

          nav.updateByEntry(e);
          e.preventDefault();
        });

        //highlights the square you are currently on
        puzzleE1.delegate('#puzzle', 'click', function(e) {
          $(e.target).focus();
          $(e.target).select();
        });

        puzInit.calcCoords();

        clueListE1 = $('#puzzle-clues li');
        $('#' + currentOri + ' li').eq(0).addClass('clues-active').focus();

        puzInit.buildTable();
        puzInit.buildEntries();


      }, //end of init function
      //creates all of the puzzle coords
      calcCoords: function() {
        //sets up an array of coordinates
        for (var i = 0, p = entryCount; i < p; i++) {
          entries.push(i);
          entries[i] = [];

          for (var x=0, j = puzzle.data[i].answer.length; x < j; x++) {
            entries[i].push(x);
            coords = puzzle.data[i].orientation === 'across' ? "" + puzzle.data[i].startx++ + "," + puzzle.data[i].starty + "" : "" + puzzle.data[i].startx + "," + puzzle.data[i].starty++ + "" ;
            entries[i][x] = coords;
          }//for

          $('#' + puzzle.data[i].orientation).append('<li tabindex="1" data-position="' + i + '">' + puzzle.data[i].clue + '</li>')
        }//for


        //finds the max row and cols it needs
        for (var i = 0, p = entryCount; i < p; i++) {
          for (var x=0; x < entries[i].length; x++) {
            cols.push(entries[i][x].split(',')[0]);
            rows.push(entries[i][x].split(',')[1]);
          };
        }

        rows = Math.max.apply(Math, rows) + "";
        cols = Math.max.apply(Math, cols) + "";

      },

      //builds the table
      buildTable: function() {
        for (var i=1; i <=rows; i++) {
          tb1.push("<tr>");
            for (var x=1; x <= cols; x++) {
              tb1.push('<td data-coords="' + x + ',' + i + '"></td>');
          };
          tb1.push("</tr>");
        };

        tb1.push("</table>");
        puzzleE1.append(tb1.join(''));
      },

      buildEntries: function() {
        var puzzCells = $('#puzzle td');
        var light;
        var $groupedLights;
        var hasOffset = false;
        var positionOffset = entryCount - puzzle.data[puzzle.data.length-1].position;

        for (var x=1, p=entryCount; x <= p; x++) {
          var letters = puzzle.data[x-1].answer.split('');

          for (var i=0; i < entries[x-1].length; i++) {
            light = $(puzzCells + '[data-coords="' + entries[x-1][i] + '"]');

            if( x > 1 ) {
              if (puzzle.data[x-1].position === puzzle.data[x-2].position) {
                hasOffset = true;
              };
            }

            if($(light).empty()){
              $(light)
                .addClass('entry-' + (hasOffset ? x - positionOffset : x) + ' position-' + (x-1) )
                .append('<input maxlength="1" val "" type="text" tabindex="-1" />');
            }
          };
        };

        for (var i=1, p = entryCount; i < p; i++) {
          $groupedLights = $('.entry-' + i);
          if(!$('.entry-' + i + ':eq(0) span').length){
            $groupedLights.eq(0).append('<span>' + puzzle.data[i].position + '</span>');
          }
        }

        util.highlightEntry();
        util.highlightClue();
        $('.active').eq(0).focus();
        $('.active').eq(0).select();

      },

    }; // end of puzInit object

    var nav = {
      nextPrevNav: function(e, override) {
        var len = $actives.length;
        var struck = override ? override : e.which;
        var el = $(e.target);
        var p = el.parent();
        var ps = el.parents();
        var selector;

        util.getActivePositionFromClassGroup(el);
        util.highlightEntry();
        util.highlightClue();

        $('.current').removeClass('current');

        selector = '.position-' + activePosition + ' input';

      },

      updateByNav: function(e) {
        var target;

        $('.clues-active').removeClass('clues-active');
        $('.active').removeClass('active');
        $('current').removeClass('current');
        currIndex = 0;

        target = e.targetl
        activePosition = $(e.target).data('position');

        util.highlightEntry();
        util.highlightClue();

        $('.active').eq(0).focus();
        $('.active').ep(0).select();
        $('.active').eq(0).addClass('current');


      },

      updateByEntry: function(e, next) {
        var classes;
        var next;
        var clue;
        var e1Ori;
        var e2Ori;
        var e1Cell;
        var e2Cell;

        if(e.keyCode === 9 || next){
          activeClueIndex = activeClueIndex === clueListE1.length-1 ? 0 : ++activeClueIndex;

          $('.clues-active').removeClass('.clues-active');

          next = $(clueListE1[activeClueIndex]);
          currentOri = next.parent().prop('id');
          activePosition = $(clueListE1[activeClueIndex]).data('position');

        } else {
          activeClueIndex = activeClueIndex === clueListE1.length-1 ? 0 : ++activeClueIndex;

          util.getActivePositionFromClassGroup(e.target);

          clue = $(clueListE1 + '[data-position=' + activePosition + ']');
          activeClueIndex = $(clueListE1).index(clue);

          currentOri = clue.parent().prop('id');
        }

        util.highlightEntry();
        util.highlightClue();

      }

    }; //end of nav object

    var util = {
    /*  highlightEntry: function() {
        $actives = $('.active');
        $actives.removeClass('active');
        $actives = $('.position-' + activePosition + ' input').addClass('active');
        $actives.eq(0).focus();
        $actives.eq(0).select();
      },

      highlightClue: function() {
        var clue;
        $('.clues-active').removeClass('clues-active');
        $(clueListE1 + '[data-position=' + activePosition + ']').addClass('clues-active');

        if(mode === 'interacting') {
          clue = $(clueListE1 + '[data-position=' + activePosition + ']');
          activeClueIndex = $(clueListE1).index(clue);
        };
      }, */

      getClasses: function(light, type) {
        if (!light.length) return false;

        var classes = $(light).prop('class').split(' ');
        var classLen = classes.length;
        var positions = [];

        for (var i = 0; i < classLen; i++) {
          if (!classes[i].indexOf(type) ) {
            positions.push(classes[i]);
          }
        }

        return positions;
      },

      getActivePositionFromClassGroup: function(el){
        classes = util.getClasses($(el).parent(), 'position');

        if(classes.length > 1) {
          e1Ori = $(clueListE1 + '[data-position=' + classes[0].split('-')[1] + ']').parent().prop('id');
          e2Ori = $(clueListE1 + '[data-position=' + classes[1].split('-')[1] + ']').parent().prop('id');

          e1Cell = $('.position-' + classes[0].split('-')[1] + ' input').index(el);
          e2Cell = $('.position-' + classes[0].split('-')[1] + ' input').index(el);

          if(mode === "setting ui"){
            currentOri = e1Cell == 0 ? e1Ori : e2Ori;
          }

          if(e1Ori === currentOri){
            activePositon == classes[0].split('-')[1];
          } else if(e2Ori === currentOri){
            activePositon = classes[1].split('-')[1];
          }
        } else {
          activePositon = classes[0].split('-')[1];
        }

        console.log('getActivePositionFromClassGroup activePositon: ' + activePositon);

      },

    }//end of util object

    puzInit.init();

  }
})(jQuery);
