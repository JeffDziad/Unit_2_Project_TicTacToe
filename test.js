$(document).ready(function (){

    $(".gameTile").click(runGame);
    $("#output").text("Start the game by clicking on a tile!");
    //set start of game constants to track progression.
    var gameStatus = 'ready';
    var tracker = 0;
    var ticks = 0;
    var Xwin = 0;
    var Owin = 0;

    //check gameStatus to reset game on click
    function runGame()
    {
        console.log("runGame()");
        console.log(`Tracker: ${tracker}`);
        console.log(`Ticks: ${ticks}`);
        var humanTurn = $(this);
        if(gameStatus === 'ready')
        {
            turnHandler(humanTurn);
        }
        else if(gameStatus === 'ended')
        {
            $("#output").text("Resetting Game...");
            resetGame();
        }
    }

    //first handle the humanTurn and check for win/draw.
    function turnHandler(humanTurn)
    {
        console.log("turnHandler()");
        if(humanTurn.hasClass("Xs") || humanTurn.hasClass("Os"))
        {
            $("#output").text("Please select a empty tile.");
        }
        else
        {
            humanTurn.addClass("Xs");
            tracker += 1;
            if(checkWin("Xs") || checkDraw())
            {
                if(checkWin("Xs"))
                {
                    $("#output").text("Player X won the game!\nPress Restart to play again!");
                    Xwin += 1;
                    $("#Xwin").text(Xwin);
                    gameStatus = 'ended';
                }
                else if(checkDraw())
                {
                    $("#output").text("Draw.\nPress Restart to play again!");
                    gameStatus = 'ended';
                }
            }
            else
            {
                computerTurn();
            }
        }
    }

    //follow up humanTurn with computerTurn. Run until validMove is false. Check for win/draw and wait for next turn.
    function computerTurn()
    {
        console.log("computerTurn()");
        var validMove = true;
        var computerTile;
        while(validMove)
        {
            ticks++;
            var randNum = Math.floor(Math.random() * 9) + 1;
            computerTile = $("#tile-" + randNum);
            if(!(computerTile.hasClass("Os")) && !(computerTile.hasClass("Xs")))
            {
                validMove = false;
                break;
            }
            if(ticks === 1000) //dirty but dependable fix :)
            {
                $("#output").text("Draw.\nPress anywhere to play again!");
                gameStatus = 'ended';
                validMove = false;
                break;
            }
        }
        computerTile.addClass("Os");
        tracker += 1;
        if(checkWin("Os"))
        {
            $("#output").text("Player O won the game!\nPress Restart to play again!");
            Owin += 1;
            $("#Owin").text(Owin);
            gameStatus = 'ended';
        }
        else if(checkDraw())
        {
            $("#output").text("Draw.\nPress Restart to play again!");
            gameStatus = 'ended';
        }
    }

    //check all possible winning solutions, return true if one is found.
    function checkWin(player)
    {
        console.log("checkWin()");
        if($("#tile-1").hasClass(player) && $("#tile-2").hasClass(player) && $("#tile-3").hasClass(player))
        {
            return true;
        }
        else if($("#tile-1").hasClass(player) && $("#tile-4").hasClass(player) && $("#tile-7").hasClass(player))
        {
            return true;
        }
        else if($("#tile-1").hasClass(player) && $("#tile-5").hasClass(player) && $("#tile-9").hasClass(player))
        {
            return true;
        }
        else if($("#tile-2").hasClass(player) && $("#tile-5").hasClass(player) && $("#tile-8").hasClass(player))
        {
            return true;
        }
        else if($("#tile-3").hasClass(player) && $("#tile-5").hasClass(player) && $("#tile-7").hasClass(player))
        {
            return true;
        }
        else if($("#tile-3").hasClass(player) && $("#tile-6").hasClass(player) && $("#tile-9").hasClass(player))
        {
            return true;
        }
        else if($("#tile-4").hasClass(player) && $("#tile-5").hasClass(player) && $("#tile-6").hasClass(player))
        {
            return true;
        }
        else if($("#tile-7").hasClass(player) && $("#tile-8").hasClass(player) && $("#tile-9").hasClass(player))
        {
            return true;
        }
    }

    //ran every turn to check for draw. when tracker is 9 and checkWin of both players is false, declare a draw.
    function checkDraw()
    {
        console.log("checkDraw()");
        if(tracker === 9 && (!(checkWin("Os") && !(checkWin("Xs")))))
        {
            $("#output").text("Draw.\nPress anywhere on the screen to play again!");
            gameStatus = 'ended';
        }
    }

    //after gameStatus has been changes to 'ended', run this to reset all needed variables.
    function resetGame()
    {
        console.log("resetGame()");
        //loop through all tiles and remove Xs and Os class
        $(".gameTile").removeClass("Os");
        $(".gameTile").removeClass("Xs");
        //reset gameStatus to ready
        gameStatus = 'ready';
        tracker = 0;
        ticks = 0;
        $("#output").text("Go!");

    }

});