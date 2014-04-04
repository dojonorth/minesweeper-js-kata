
$(document).ready(function () {
    var board = $('#game-board');

    // disable the browser's usual right click context menu from appearing on the game board
    board.bind("contextmenu", function (event) {
        event.preventDefault();
    });

    var form = $('#game-settings');

    // Just set a decent size for the game board on the page
    // board.css({'height': ($('#main-frame').height() - 15 - board.offset().top) + 'px'});

    // Listen to form submissions to start a new game
    form.submit(function (event) {
        // Prevent the form submission from reloading the page
        event.preventDefault();

        // Remove any existing board, if already present
        board.empty();

        // Retrieve the game settings submitted via the form
        var width = $('#widthInput').val();
        var height = $('#heightInput').val();
        var mines = $('#minesInput').val();

        // Initialise the Game's UI
        var ui = new GameUI(board, width, height, mines);
        $(window).resize(function () {
            board.css({'height': ($('#main-frame').height() - 15 - board.offset().top) + 'px'});
            ui.redrawGameBoard();            
        })


        ///////////////////////////////////////
        // INITIALISE YOUR GAME ENGINE HERE
        ///////////////////////////////////////


    });

    // Start a new game the first time the page is loaded
    form.submit();
});