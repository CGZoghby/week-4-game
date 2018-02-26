# week-4-game

In this javascript game, you click from a list of characters to be your hero, and then that hero fights the remaining list of characters
in an rpg-esque fashion. You fight by clicking the attack button, which displays how much damage you do to the opponent, and how much damage 
the opponent deals back to you.

Each character has three atrributes: health (displayed underneath their portrait), attack power (hidden until you attack), and counter
attack power (hidden until a defender hits you back). 

When you attack, your attack power increases by its base amount, so if your attack power is 8, your first attack will hit for 8 damage.
Your second attack would hit for 16, then 24, and so on. Counter attack power does not change, and is always a flat damage.

You can reliably expect characters with larger health pools to have larger attack power, and counter attack power.
