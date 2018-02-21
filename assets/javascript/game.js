$(document).ready(function () {

    //Create object of available characters, each with four attributes, in this order: Name, HP (health points), AP (attack power), CAP (counter attack power)
    var charObject = {
        luke: ["Luke Skywalker", 100, 5, 5],
        obiWan: ["Obi-Wan Kenobi", 120, 8, 10],
        darthSidious: ["Darth Sidious", 150, 15, 20],
        darthMaul: ["Darth Maul", 180, 25, 25],
    };

    //Trying to make this way too complicated, I can html-code the character select screen itself, and then move their elements on click.
    //for (var i = 0; i < Object.keys(charObject).length; i++) {
    //    var imgChar = $("<img>");
    //    imgChar.addClass("charImg img img-responsive");
    //    imgChar.attr("id", Object.keys(charObject)[i])
    //    imgChar.attr("src", "assets/images/" + Object.keys(charObject)[i] + ".jpeg");
    //    $("#char_select").append(imgChar);
    //}

    $(".char_select").on("click", function () {
        var imgChosen = $(this).children("img");
        imgChosen.remove();
        $("#charChosen").append(imgChosen);
        if ($("#charChosen").append(imgChosen)) {
            $(".char_select").each(function () {
                var imgOthers = $(this)
                imgOthers.remove();
                //check for "this" to be unempty, so that the empty div element that you selected for your hero is not moved
                if ($(this).children().length > 0) {
                    imgOthers.addClass("defenderChar") //the idea is to add a different selector class for each step of the process.
                    $("#charsNotChosen").append(imgOthers);
                };
            });
        };
    });

    $(".defenderChar").on("click", function () {
        var defender = $(this).children("img");
        defender.remove();
        $("#defender").append(defender);
    });

});