$(document).ready(function () {

    //Create object of available characters, each with six attributes, in this order: Name, HP (health points), AP (attack power), CAP (counter attack power)
    //So why is this defined object not passing into my local functions?
    //  var charObject = {
    //    luke: {
    //       name: "Luke Skywalker",
    //      HP: 100,
    //     AP: 5,
    //      CAP: 5,
    //  },
    //    obiWan: {
    //        name: "Obi-Wan Kenobi",
    //        HP: 120,
    //       AP: 8,
    //        CAP: 10,
    //    },
    //    darthSidious: {
    //        name: "Darth Sidious",
    //        HP: 150,
    //        AP: 15,
    //        CAP: 20,
    //    },
    //    darthMaul: {
    //        name: "Darth Maul",
    //        HP: 180,
    //        AP: 25,
    //        CAP: 25,
    //    },
    //};

    //Trying to make this way too complicated, I can html-code the character select screen itself, and then move their elements on click.
    //for (var i = 0; i < Object.keys(charObject).length; i++) {
    //    var imgChar = $("<img>");
    //    imgChar.addClass("charImg img img-responsive");
    //    imgChar.attr("id", Object.keys(charObject)[i])
    //    imgChar.attr("src", "assets/images/" + Object.keys(charObject)[i] + ".jpeg");
    //    $("#char_select").append(imgChar);
    //}

    var luke = {
        name: "Luke Skywalker",
        HP: 100,
        AP: 5,
        CAP: 5,
    };
    var obiWan = {
        name: "Obi-Wan Kenobi",
        HP: 120,
        AP: 8,
        CAP: 10,
    };
    var darthSidious = {
        name: "Darth Sidious",
        HP: 150,
        AP: 15,
        CAP: 20,
    };
    var darthMaul = {
        name: "Darth Maul",
        HP: 180,
        AP: 25,
        CAP: 25,
    };

    var attackClick = 0;

    //primary selector for choosing hero and populating remaining list with defenders
    $(".char_select").on("click", function () {
        var imgChosen = $(this).children("img");
        //var idToTag = imgChosen[0]["id"];
        imgChosen.remove();
        $("#charChosen").append(imgChosen);
        if ($("#charChosen").append(imgChosen)) {
            $(".char_select").each(function () {
                var imgOthers = $(this);
                imgOthers.remove();
                //check for "this" to be unempty, so that the empty div element that you selected for your hero is not moved
                if (imgOthers.children("img").length > 0) {
                    $("#charsNotChosen").append(imgOthers);
                };
            });
        };
    });

    //2nd selector for choosing defenders
    $("#charsNotChosen").on("click", "img", function () {
        var defenderChosen = $(this);
        defenderChosen.remove();
        $("#defender").append(defenderChosen);
        if ($("#defender").append(defenderChosen)) { //this whole if statement is to strip away the empty column spaces where a selected defender was
            $(".char_select").each(function () {
                var defendersLeft = $(this);
                if (defendersLeft.children("img").length === 0) {
                    defendersLeft.remove();
                };
            });
        };
    });

    $("#attack").on("click", function () {
        var hero = $("#charChosen").children("img")[0]["id"];
        var defender = $("#defender").children("img")[0]["id"];
        if (attackClick === 0) {
            heroATK = eval(hero).AP;
            heroHP = eval(hero).HP;
            heroCAP = eval(hero).CAP;
            heroName = eval(hero).name;
            defATK = eval(defender).AP;
            defHP = eval(defender).HP;
            defCAP = eval(defender).CAP;
            defName = eval(defender).name;
        };
        $("#battle_info").html("<p> You attacked " + defName + " for " + heroATK + " damage." + "<br></p>" + "<p> " + defName + " attacked you back for " + defCAP + " damage." + "<br></p>");
        defHP = defHP - heroATK;
        heroATK = heroATK + eval(hero).AP;
        heroHP = heroHP - defCAP;
        attackClick++;
        if (defHP <= 0) {
            $("#defender").remove();
            $("#battle_info").html("<p> You have defeated "+ defName + ", you can choose to fight another enemy.")
        }
        if (heroHP <= 0) {
            $("#battle_info").html("<p> You have been defeated...GAME OVER!!! <br>" + "<button name=Restart id='restart'>Restart</button>")
        }
    });

    //play the game down here
});