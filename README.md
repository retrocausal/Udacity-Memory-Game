# Udacity-Memory-Game
 - A game where a player needs to map `n` number of cards to `n` number of matching cards.
     - Each match in a game is awarded a number of points as score, added to the total score at the end of the game.
 - On failing to register a single match by a precalculated `m` number of moves
   - The deck shuffles itself
   - The rating the player is on, takes a hit
 - There are a maximum of 3 star ratings, and on a rating dip below or equal to 1,
   - The game shuffles, and informs the user of low scoring points hereafter
   - On each rating dip,
     - The score per match reduces by a factor `f`
 - The game accumalates statistics such as
   - Highest scoring match
   - Rating
   - Number of moves
   - Time taken
 - A statistics card is shown with the above accumalations at the end of the game
   - either by a win (match all cards)
   - or because of a timeout
 - The game has a maximum time to win of 6 minutes
   - The timer on the panel counts down
   - The time taken on the stats panel shows the actual time taken to either
       - win
       - timeout (6 minutes)
   - The time taken does **NOT** affect the rating


> An example [STATS CARD][4] can be used, to familiarize oneself, with the `superhero names`, and their respective `alter egoes`. Just look under the column `Matches` as shown in the image for the mappings.

 ## Install and Play
  ### Dependencies
    - npm
    - bower
    - apache/nginx

  - Clone this repo and cd to the clone directory
    - In case, you already **Do not have**  the directory `bower_components`, Only then, Run
        ```
           npm install -g bower

           bower install
         ```
>  **NOTE**
> - [Bower][2], is a frontend package manager
>    - You can install Bower, by running
        ```npm install bower```
> - If you do not know what npm is, you can learn about node and npm [here][1]
> - [Polymer][3], is a library by google, offereing syntactic eas to implement webcomponents
> - This game, uses Polymer, to implement and layout all the cards on the deck













- Navigate to the game folder via a webserver such as `nginx`/`apache`
> Meaning, the nav bar on your browser, should not read **file:///** , but **localhost:/<path-to-clone-of-this-repo>**
- Play

  [1]:https://docs.npmjs.com/getting-started/what-is-npm
  [2]:https://bower.io/
  [3]:https://www.polymer-project.org/
  [4]:https://github.com/retrocausal/udacity-memory-game/blob/master/stats.png
