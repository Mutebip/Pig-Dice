var player1, player2;


function Player(name, turnTotal, diceRoll, overallScore, active) {
    this.name = name;
    this.diceRoll = 0;
    this.turnTotal = 0;
    this.overallScore = 0;
    this.active = active;
}

function activeUser() {
    if (player1.active === true && player2.active === false) {
        $('.player1Area').children().prop('disabled', false);
        $('.player1Area').removeClass('disableGamingArea');
        $('.player2Area').children().prop('disabled', true);
        $('.player2Area').addClass('disableGamingArea');
    } else {
        $('.player1Area').children().prop('disabled', true);
        $('.player1Area').addClass('disableGamingArea');
        $('.player2Area').children().prop('disabled', false);
        $('.player2Area').removeClass('disableGamingArea');
    }
};

Player.prototype.roll = function () {
    var randomNo = Math.floor((Math.random() * 6) + 1);
    this.diceRoll = randomNo;
    activeUser();
    if (randomNo === 1) {
        this.turnTotal = 0;
        this.diceRoll = 1;
        if (this.active === player1.active) {
            player1.active = false;
            player2.active = true;
            $('.player1Area').children().prop('disabled', true);
            $('.player1Area').addClass('disableGamingArea');
            $('.player2Area').children().prop('disabled', false);
            $('.player2Area').removeClass('disableGamingArea');
        } else if (this.active === player2.active) {
            player2.active = false;
            player1.active = true;
            $('.player2Area').children().prop('disabled', true);
            $('.player2Area').addClass('disableGamingArea');
            $('.player1Area').children().prop('disabled', false);
            $('.player1Area').removeClass('disableGamingArea');
        } else {
            console.log("not working");
        }
        return alert("Oops you got a 1. Your turn is over!");
    } else {
        this.turnTotal += randomNo;
    };
    return this.diceRoll;
};

Player.prototype.hold = function () {
    activeUser();
    this.overallScore += this.turnTotal;
    if (this.overallScore >= 100) {
        alert("Game Over. You win!!!!");
        resetFields();
        alert('To play with a new partner click New Game.')

    } else {
        return false;
    }
    console.log('the turn total is: ' + this.turnTotal);
    return this.overallScore;
};

function resetFields() {
    $("input#player1Name").val("");
    $("input#player2Name").val("");
    $('.player1Area').children().prop('disabled', false);
    $('.player2Area').children().prop('disabled', false);
    $('.player1Area').removeClass('disableGamingArea');
    $('.player2Area').removeClass('disableGamingArea');
    var thePlayers = [player1, player2];
    thePlayers.forEach(function (player) {
        player.diceRoll = 0;
        player.turnTotal = 0;
        player.overallScore = 0;
    })
    var outputs = [$('.diceRoll1'), $('.turnScore1'), $('.overallScore1'), $('.diceRoll2'), $('.turnScore2'), $('.overallScore2')];
    outputs.forEach(function (output) {
        output.text(0);
    })

};

$(document).ready(function () {
    $("#rulesHeader").click(function () {
        $("#rulesDefinitions").toggle();
    });

    $("#playerNames").submit(function (event) {
        event.preventDefault();
        $("#rulesDefinitions").hide();
        $("form").hide();
        $(".newGame").show();
        $(".newGame").click(function () {
            $("form").show();
            $('#gamingArea').hide();
            $(".newGame").hide();
            resetFields();
        });
        $('#gamingArea').show();

        var gamer1 = $("#player1Name").val();
        var gamer2 = $("#player2Name").val();

        player1 = new Player(gamer1);
        player2 = new Player(gamer2);

        $(".player1NameOutput").text(player1.name);
        $(".player2NameOutput").text(player2.name);
        resetFields();
    });

    $('.roll1').click(function (event) {
        event.preventDefault();

        player1.active = true;
        player2.active = false;
        player1.roll();
        $('.diceRoll1').text(player1.diceRoll); 
        $('.turnScore1').text(player1.turnTotal); //display the turn score (temporary score)
    });
    $('.roll2').click(function (event) { //roll button for player2
        event.preventDefault();
        //Activate Gaming Area
        player2.active = true;
        player1.active = false;
        player2.roll(); //call the function to generate random numbers
        $('.diceRoll2').text(player2.diceRoll); //display the rolled dice number
        $('.turnScore2').text(player2.turnTotal); //display the turn score (temporary score)
    });

    //Display overall score when the hold button is clicked
    $('.hold1').click(function (event) { //hold button for player1
        event.preventDefault();
        //Deactivate Gaming Area
        player1.active = false;
        player2.active = true;
        player1.hold(); //call the function to add the turn score to the overall score
        $('.overallScore1').text(player1.overallScore); //display the overall score
        //Clear dice roll and turn score
        player1.diceRoll = 0;
        player1.turnTotal = 0;
        $('.diceRoll1').text(player1.diceRoll);
        $('.turnScore1').text(player1.turnTotal);
    });
    $('.hold2').click(function (event) { //hold button for player2
        event.preventDefault();
        //Deactivate Gaming Area
        player2.active = false;
        player1.active = true;
        player2.hold(); //call the function to add the turn score to the overall score
        $('.overallScore2').text(player2.overallScore); //display the overall score
        //Clear turn score and total score
        player2.diceRoll = 0;
        player2.turnTotal = 0;
        $('.diceRoll2').text(player2.diceRoll);
        $('.turnScore2').text(player2.turnTotal);
    });

});
