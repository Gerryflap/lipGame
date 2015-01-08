        //Make a player object
        var player = {"x": 0, "y":0, "visitedCoords": [[0 ,0]], "inventory": [], "score": 0, "health": 100};
        //Gives highest dmg weapon in player's inventory
        function playerHighestDmg() {
            var Item = player.inventory[0];
            for(var i = 1; i < player.inventory.length; i++) {
                if (player.inventory[i].dmg > Item.dmg) {
                    Item = player.inventory[i];
                }
            }
            return Item.dmg;
        }
        //Give starting weapon
        var club = {"dmg":1, "price":0}; //price could be used as score or maybe sold or bought or something like that
        player.inventory.push(club);
        //Monster/enemy constructor object(?)
        function Monster(x, y, dmg, health, id, swagger, carriedItem) {
            //str = monster health; dmg = damage the monster does per turn; swagger = points allocated to player    x/y = position
            this.dmg = dmg;
            this.health = health;
            this.id = id;
            this.swagger = swagger; //TO BE used as score/money
            this.carriedItem = carriedItem;
            this.x = x;
            this.y = y;
            if (health <= 0) {
                //monster is killed, drop carriedItem, allocated swagger to player
                if (carriedItem != 0) {
                    //if carriedItem is 0, do not add carriedItem to player.inventory
                    player.inventory.push(carriedItem);
                }
                player.score += swagger;
                //TODO remove monster
            }
            return this;
        }
		
		//Monsterlist   list with all monster in the game
        var monsterList = [];

		
		        //returns a list with the whole combat log!
        function combatLog(enemy, player) {
            var combatLogArray = [];
            combatLogArray.push("A monster has appeared and starts lashing out!");
            while (enemy.health > 0 && player.health > 0) {
                combatLogArray.push("The monster did " + enemy.dmg + " damage to you!");
                player.health -= enemy.dmg;
                combatLogArray.push("You have " + player.health + " left!");
                combatLogArray.push('You lunge at the monster for' + playerHighestDmg() + 'damage!');
                enemy.health -= playerHighestDmg();
                //maybe add a string with some vague idea of the enemy his health? (str)
            }
            return combatLogArray;
        }