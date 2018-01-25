# udacity-mind-game
 - A game where a player needs to map `n` number of cards to `n` number of matching cards.
  -- Each match in a game is awarded a number of points as score, added to the total score at the end of the game.
 - On failing to register a single match by a precalculated `m` number of moves
   - The deck shuffles itself
   - The rating the player is on, takes a hit
 - There are a maximum of 5 star ratings, and on a rating dip below or equal to 1,
   - The game resets
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
 - The game has a maximum time to win of 3 minutes
   - The timer on the panel counts down
   - The time taken on the stats panel counts up
 
 ## Install and Play
  - Clone this repo
    - Run 
        ```
           bower install
         ```
  - Navigate to the game folder via a webserver such as `nginx`/`apache`
  - Play
