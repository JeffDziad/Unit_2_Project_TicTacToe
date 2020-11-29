$(document).ready(function () {

console.log("Started Game");
var playerTracker = 1;
var gameOver = false;
$(".gameTile").click(playerTurn);

function randomTurnNum(min, max)
{
    return Math.floor(Math.random() * (max - min) + min);
}

function playerTurn()
{
    var selectedTile = $(this);
    if(selectedTile.hasClass("Xs") || selectedTile.hasClass("Os"))
    {
        $("#output").text("Please choose a empty tile!");
    }
    else
    {
        selectedTile.addClass("Xs");
        if(checkWin("Xs"))
        {
            $("#output").text("Player X wins!");
            gameOver = true;
        }
        playerTracker = 2;
        computerTurn();
    }
}

function computerTurn()
{
    var validMove = false;
    var computerTile;
    while(validMove === false)
    {
        computerTile = $(`#tile-` + randomTurnNum(1, 9));
        if(!(computerTile.hasClass("Xs") || computerTile.hasClass("Os")))
        {
            computerTile.addClass("Os");
            if(checkWin("Os"))
            {
                $("#output").text("Player O wins!");
                gameOver = true;
            }
            validMove = true;
        }
    }
}

function checkWin(player)
{
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
});

