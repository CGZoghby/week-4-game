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

    //So I had an issue where the character object that I defined above was not being read inside of the function calls below. I still don't understand why. 
    //The fix that seems to work is if I just split the object full of objects into their individual objects. I hate objects, and wish I understood them better
    var luke = {
        name: "Luke Skywalker",
        HP: 100,
        AP: 10,
        CAP: 10,
    };
    var obiWan = {
        name: "Obi-Wan Kenobi",
        HP: 120,
        AP: 12,
        CAP: 12,
    };
    var darthSidious = {
        name: "Darth Sidious",
        HP: 150,
        AP: 15,
        CAP: 15,
    };
    var darthMaul = {
        name: "Darth Maul",
        HP: 180,
        AP: 20,
        CAP: 20,
    };

    //A simple var declaration that sets my status for attacking so the game knows to continue with stat edits instead of resetting them every time the button is clicked.
    var attackClick = 0;
    var newDefender = 0;
    var charsDefeated = 0; //A little dirty trick for checking when to display victory screen

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
        //So first things first I assign a hero variable so the game knows exactly whom it's dealing with.
        var hero = $("#charChosen").children("img")[0]["id"];
        //Check if defender is empty
        if ($("#defender").children().length === 0) {
            $("#battle_info").html("No enemy here.")
        } else { //If defender is not empty, actually play the game
            var defender = $("#defender").children().children("img")[0]["id"]; //I'm really proud of figuring out both these selectors
            if (attackClick === 0) { //Attack click is my initialization variable. This if block only fires at the start of the game, with the first fight
                heroATK = eval(hero).AP; //the eval code is how I can take the string id's tied to the images and get their object stats (another thing I'm proud of)
                heroHP = eval(hero).HP;
                heroCAP = eval(hero).CAP;
                heroName = eval(hero).name;
            }
            if (newDefender === 0) { //newDefender is how I preserve the hero's stats but can choose to fight new people, re-initializes with every new enemy
                defATK = eval(defender).AP;
                defHP = eval(defender).HP;
                defCAP = eval(defender).CAP;
                defName = eval(defender).name;
            };
            //The actual DOM writing
            $("#battle_info").html("<p> You attacked " + defName + " for " + heroATK + " damage." + "<br></p>" + "<p> " + defName + " attacked you back for " + defCAP + " damage." + "<br></p>");
            attackClick = 1; //how I set those stages up so I don't step unnecessarily through more if blocks
            newDefender = 1;
            //dynamically update defenders HP after they get hit
            defHP = defHP - heroATK;
            $("#defender > div > div.caption_bot").html(defHP); //parent child selecting is great because it allows me to format all captions under the same class instead of id's
            if (defHP <= 0) { //this selector works. 
                $("#defender").empty();
                newDefender = 0;
                charsDefeated++;
                if (charsDefeated === 3) { //yea ok so this is hard coded and that's lousy. I would need to somehow check against the length of possible characters minus 1, but I can't put
                    $("#battle_info").html("<p> You Won!!!!! </p>") //all possible characters into the same object because I-don't-know-why, so not sure how to make that work in this case
                    $("#restart").css("visibility", "visible")
                } else {
                    $("#battle_info").html("<p> You have defeated " + defName + ", you can choose to fight another enemy.")
                };
            };
            //dynamically update hero HP and attack power
            heroATK = heroATK + eval(hero).AP;
            if (defHP > 0) { //if the defender dies on attack, do not hit me back (duh)
                heroHP = heroHP - defCAP;
            };
            $("#charChosen > div.caption_bot").html(heroHP);
            //In the rare case you are defeated because mechanics of the game aren't clear (because they aren't)
            if (heroHP <= 0) {
                $("#battle_info").html("<p> You have been defeated...GAME OVER!!! <br>")
                //so having already dealt with an issue where I can't do jQuery selector commands on newly created elements within the DOM, I am instead hiding and revealing elements already present.
                $("#restart").css("visibility", "visible");
            };
        };
    });

    //Is this cheating? Instead of resetting and repopulating values (seems nightmarish with moving images and divs around) I can just tell the window to reload on button click
    $("#restart").on("click", function () {
        window.location.reload();
    });
});