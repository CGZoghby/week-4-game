$(document).ready(function () {

    //TODO: Fix victory screen. And dynamically update stats as characters become damaged.

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

    //So I had an issue where the character object that I defined above was not being read inside of the function calls below. I still don't understand why. 
    //The fix that seems to work is if I just split the object full of objects into their individual objects. I hate objects, and wish I understood them better
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

    //A simple var declaration that sets my status for attacking so the game knows to continue with stat edits instead of resetting them every time the button is clicked.
    var attackClick = 0;
    var newDefender = 0;

    //primary selector for choosing hero and populating remaining list with defenders
    $(".char_select").on("click", function () {
        var imgChosen = $(this).children();
        //var idToTag = imgChosen[0]["id"]; --> seemed a cool trick so saving it
        imgChosen.remove();
        $("#charChosen").append(imgChosen);
        if ($("#charChosen").append(imgChosen)) {  //for every character not chosen to be hero, they are parsed into the defender select pool
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
    $("#charsNotChosen").on("click", ".char_select", function () {
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
        if ($("#defender").children().length === 0) {
            $("#battle_info").html("No enemy here.")
        } else {
            var defender = $("#defender").children().children("img")[0]["id"];
            if (attackClick === 0) {
                heroATK = eval(hero).AP;
                heroHP = eval(hero).HP;
                heroCAP = eval(hero).CAP;
                heroName = eval(hero).name;
            }
            if (newDefender === 0) {
                defATK = eval(defender).AP;
                defHP = eval(defender).HP;
                defCAP = eval(defender).CAP;
                defName = eval(defender).name;
            };
            $("#battle_info").html("<p> You attacked " + defName + " for " + heroATK + " damage." + "<br></p>" + "<p> " + defName + " attacked you back for " + defCAP + " damage." + "<br></p>");
            attackClick = 1;
            newDefender = 1;
            //Need to dynamically target just the hero's and defender's captions to update them with correct stats
            //Also need to figure out why victory screen for defeating everyone isn't working
            defHP = defHP - heroATK;
            if ($("#charsNotChosen").children().length === 0) {
                $("#defender").empty()
                $("battle_info").html("<p> You Won!!!!! </p>")
                $("#restart").css("visibility", "visible")
            } else if (defHP <= 0 && $("#charsNotChosen").children().length > 0) {
                $("#defender").empty();
                $("#battle_info").html("<p> You have defeated " + defName + ", you can choose to fight another enemy.")
                newDefender = 0;
            };
            heroATK = heroATK + eval(hero).AP;
            heroHP = heroHP - defCAP;
            if (heroHP <= 0) {
                $("#battle_info").html("<p> You have been defeated...GAME OVER!!! <br>")
                //so having already dealt with an issue where I can't do jQuery selector commands on newly created elements within the DOM, I am instead hiding and revealing elements already present.
                $("#restart").css("visibility", "visible");
            };

        };
    });

    $("#restart").on("click", function () {
        window.location.reload();
    });
});