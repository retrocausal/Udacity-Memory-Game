# Udacity-Memory-Game
 - A game where a player needs to map `n` number of cards to `n` number of matching cards.
     - Each match in a game is awarded a number of points as score, added to the total score at the end of the game.
 - On failing to register a single match by a precalculated `m` number of moves
   - The deck shuffles itself
   - The rating the player is on, takes a hit
 - There are a maximum of 3 star ratings, and on a rating dip below or equal to 1,
   - The game shuffles
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
   - or because of exhausting a dynamically progressively calculated number of maximum moves 
 - The game has a maximum time to win of 12 minutes
   - The timer on the panel counts down
   - The time taken on the stats panel counts up
   - The time taken does **NOT** affect the rating
 
 ## Install and Play
  ### Dependencies
    - npm
    - bower
    - apache/nginx
    
  - Clone this repo
    - Run 
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
- Play
  
  [1]:https://docs.npmjs.com/getting-started/what-is-npm
  [2]:https://bower.io/
  [3]:https://www.polymer-project.org/
