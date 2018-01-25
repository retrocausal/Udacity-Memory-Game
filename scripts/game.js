/*
 ** ALL SUPER HEROES ARE VIGILANTES!
 ** NOT VICE VERSA
 */

/*
 **@name Vigilante
 **@description Provides a blueprint for making a superhero
 ** Reserved for possible later full scale game
 */
const Vigilante = function () {
  this.assetSrc = "./bundle/responsive-assets/jpegs/";
  this.rearCover = {
    src: (this.assetSrc + "dcuniverse"),
    format: "jpg"
  }
  this.cover = {
    src: this.assetSrc + "justiceleague",
    format: "jpg"
  }
};
Vigilante.prototype.justice = function (adversary) {
  return this.kill(adversary);
};
Vigilante.prototype.kill = function (criminal) {
  return true;
};
//Define All Super Powers
//Possible later use case for a full scale game
//mostly for UI effects once a library can provide these effects
Vigilante.sonic_scream = function sonic_scream() {};
Vigilante.hand_to_hand_combat = function hand_to_hand_combat() {};
Vigilante.martial_arts = function martial_arts() {};
Vigilante.superhuman_strength = function superhuman_strength() {};
Vigilante.intelligence = function intelligence() {};
Vigilante.genius_level_intelligence = function genius_level_intelligence() {};
Vigilante.superhuman_speed = function superhuman_speed() {};
Vigilante.superhuman_hearing = function superhuman_hearing() {};
Vigilante.peak_human_strength = function peak_human_strength() {};
Vigilante.xray_vision = function xray_vision() {};
Vigilante.flight = function flight() {};
Vigilante.freeze_breath = function freeze_breath() {};
Vigilante.heat_vision = function heat_vision() {};
Vigilante.force_fields = function force_fields() {};
Vigilante.telepathy = function telepathy() {};
Vigilante.detective_abilities = function detective_abilities() {};
Vigilante.subatomic_existance = function subatomic_existance() {};
Vigilante.agility = function agility() {};
Vigilante.time_travel = function time_travel() {};
Vigilante.bleeding_edge_technology = function bleeding_edge_technology() {};
Vigilante.shape_shifting = function shape_shifting() {};
Vigilante.lasso_of_truth = function lasso_of_truth() {};
Vigilante.longevity = function longevity() {};
Vigilante.archery = function archery() {};

/*
 **@name superhero
 **@description Constructor that builds a Super Hero Object. Inherits Viglante
 **@params
 *********** attributes: Assumed as the replacement for the default argument list
 *********** description is assumed to be the object configurator, and the first element of the attribute list
 */

const Superhero = function (...attributes) {
  Vigilante.call(this);
  let [description] = attributes;
  const {
    name,
    alterEgo,
    powers,
    origin,
    city
  } = description;
  const cover = name.replace(/ /g, "")
    .toLowerCase();
  this.cover.src = this.assetSrc + cover;
  this.name = name;
  this.alterEgo = alterEgo;
  this.cover.alt = `front end of a card on deck, showing an image and the name of ${this.name}`;
  this.powers = powers;
  this.origin = origin;
  this.city = city;
};
// Connect Prototype chain
Superhero.prototype = Object.create(Vigilante.prototype);
// Reset the constructor
Superhero.prototype.constructor = Superhero;
//Define Superhero Prototype
Superhero.prototype.equip = function () {
  let superPowers = [];
  for (const power of this.powers) {
    let superPower = power.replace(/ /g, "_")
      .toLowerCase();
    if (Vigilante.hasOwnProperty(superPower)) {
      superPowers.push(Vigilante[superPower]);
    }
  }
  this.superPowers = superPowers;
  return (superPowers.length || false);
};
Superhero.prototype.getCard = function () {
  return this.card;
};
Superhero.prototype.getMatch = function () {
  return this.match;
};
Superhero.prototype.createTradeCards = function () {
  this.card = new superheroCard(this);
  const superhero = {
    alias: this.alterEgo,
    cover: {
      src: this.assetSrc + "justiceleague",
      format: "jpg",
      alt: `front end of a card on deck, showing the alter ego and an image for ${this.name}`
    }
  };
  this.match = new matchCard(superhero);
};

/*
 **@name Slot
 **@description Creates a new slot instance to hold a card
 */
const Slot = function () {
  this.slots = [];
  this.assetSrc = "./bundle/responsive-assets/jpegs/";
};
//define the Slot prototype
Slot.prototype.push = function (content, hash) {
  const order = this.slots.length || 0;
  const flippedContent = new flipCard({
    name: "DC Multiverse",
    cover: {
      src: this.assetSrc + "dcuniverse",
      format: "jpg",
      alt: "rear face of the card on deck, showing a picture of the dc multiverse"
    }
  });
  const currentContent = "rear";
  const id = "slot" + order;
  let card = {
    content,
    order,
    hash,
    currentContent,
    flippedContent,
    id
  };
  const toggle = function () {
    return card.currentContent = (card.currentContent == "rear") ? "main" : "rear";
  };
  card.toggle = toggle;
  return this.slots.push(card);
};
Slot.prototype.getSlots = function () {
  return this.slots;
};
Slot.prototype.shuffleSlots = function () {
  const ceil = this.slots.length || 1;
  const floor = 0;
  let slotsTaken = [];
  let newOrder = 0;
  for (let slot of this.slots) {
    const order = slot.order;
    //Keep generating random css order of card display on the lex deck
    //UNTIL the new randomly assigned css order , is not the same as the previously assigned order,
    //OR, the randomly assigned css order has not been already assigned to another card
    //in which CASE, two cards fight for a slot on the flex deck.
    while (slotsTaken.indexOf(newOrder) >= 0 || newOrder == order) {
      newOrder = Math.floor(Math.random() * (ceil - floor + 1)) + floor;
    }
    //assign new order
    slot.order = newOrder;
    //In case of a mid game shuffle, or, in case of a restart, reset the current content pointer always
    slot.currentContent = "rear";
    //push the currently generated new css order to a list, to track assigned order duplication
    slotsTaken.push(newOrder);
  }
  return this.slots;
};

/*
 ** @name SuperHeroMindMap
 ** @Description generate the game! Build its behaviours
 ** @params
 ********** config : Replacement for the default argument list. The first param is assumed to be the configuration
 parameter. This is ideally an array of hero objects
 */

const SuperHeroMindMap = function (...config) {
  const [heroes] = config;
  this.heroes = heroes;
  this.superHeroes = {};
  this.slot = new Slot();
  this.slots = {};
};
//define the Game prototype
SuperHeroMindMap.prototype.build = function () {
  //For All Heroes, in the Game, build a superhero object on the fly
  for (const hero of this.heroes) {
    const name = hero.name.replace(/ /g, "")
      .toLowerCase();
    //create new superhero out of the given hero
    const superhero = new Superhero(hero);
    // Assign the new superhero, their respective powers
    superhero.equip(superhero.powers);
    //Create trade card like display profile to print the superhero profile on the front of the card
    //Create trade card like match profile to print the match profile on the front of the card
    superhero.createTradeCards();
    const card = superhero.getCard();
    const match = superhero.getMatch();
    //Create a hash string to match the card with the match
    const hash = superhero.alterEgo.replace(/ /g, "")
      .toLowerCase();
    //Push the match and the superhero profiles into their respective slots on the flex deck
    this.slot.push(card, hash);
    this.slot.push(match, hash);
    //Track all superheroes created, may be of use
    this.superHeroes[hash] = superhero;
  }
  //shuffle the deck for display later via layout
  //copy over the slots generated via the Slot class, to a local "slots" property
  this.shuffleDeck();
  this.shuffleDeck();
  return this.shuffleDeck();
};
SuperHeroMindMap.prototype.layout = function () {
  //Initialize the container
  const oContainer = $(".deck");
  //Assign a restart game button
  const reload = $(".reload");
  reload.click(() => {
    return this.restart();
  });
  //copy the container over locally
  this.oContainer = oContainer;
  //Initialize the notification box
  this.oModalContainer = $(".notify-modals");
  //Initialize the panel containers
  this.oMovesContainer = $(".move");
  this.oScoreContainer = $(".total-user-score");
  this.oClockContainer = $(".stop-clock");
  this.oRatingContainer = $(".rating");
  this.oStatsHighScoreContainer = $('.highest-scoring-match');
  this.oScorecardScoreContainer = $(".scorecard-game-score");
  this.oScorecardClockContainer = $(".scorecard-stop-clock");
  this.oScorecardMovesContainer = $(".scorecard-number-of-moves");
  this.oScorecardRatingContainer = $(".scorecard-user-rating-stars");
  this.oStatsMatchesContainer = $(".matches");
  this.oStatsMismatchesContainer = $(".mismatches");
  this.oStatisticsContainer = $(".statistics");
  //empty the Deck
  this.oContainer.empty();
  //Iteratively Add Slots with self contained cards to the flex deck
  return this.addCards();
};
SuperHeroMindMap.prototype.addCards = function () {
  //loop over each available slot, print the card backwards onto the slot on deck
  for (const slot of this.slot.slots) {
    //create a card to display content, flipped or front
    const card = $("<article class='card'></article>");
    //TOTALLY AVOIDABLE CONTAINER
    //CAN REMOVE ONCE JQUERY MATURES ITS UI
    //JQ creates / or rather, CLONES (WHY?????) an entire node as a placeholder for UI effects
    //In case of webcomponents, like what we have, THIS SCREWS UP THE ENTIRE flow
    //if proper defaults arent set on the component
    //The below container DIV node, encapsulates the webcomponents used
    //Hence, avoiding an improperly initiated webcomponent / even STALE ONES
    //JQ now clones this div
    const unnecessaryContainerForSHODDYjQueryUI = $('<div class="placeholder"></div>')
      .css({
        display: "block",
        width: "100%"
      });
    //Assign an ID, to the card
    //Empty to begin
    //Assign the css display order and display the card as a block with the flip side in view
    card.attr("id", slot.id)
      .empty()
      .append(unnecessaryContainerForSHODDYjQueryUI);

    card.find(".placeholder")
      .append(slot.flippedContent);
    card.css({
      order: slot.order,
      display: "block"
    });
    //Append the card onto the slot on deck
    this.oContainer.append(card);
  }
  //Calculate Deck Dimensions
  const width = this.oContainer.width();
  const height = this.oContainer.height();
  //Create and store the dimensions above, as a canvas property
  const canvas = {
    width,
    height
  };
  return this.oCanvas = canvas;
};
SuperHeroMindMap.prototype.deActivate = function () {
  //copy locally, the local container property as a constant
  const oContainer = this.oContainer;
  //Extract all cards within the container deck, into a cards constant
  const cards = oContainer.find("article.card");
  //Deactivate click handlers, even on children, safe side
  cards.off("click");
  return cards.children()
    .off("click");
};
SuperHeroMindMap.prototype.activate = function () {
  //Copy locally, the local container property
  const oContainer = this.oContainer;
  //Extract all slotted cards into cards
  const cards = oContainer.find("article.card");
  //copy over the locally available / defined click handler,
  //reset
  //define a click handler
  const clickedCallBack = (e) => {
    return setTimeout(() => {
      return this.clickedCallBack(e);
    }, 30);
  };
  this.reset();
  return cards.click(clickedCallBack);
};
SuperHeroMindMap.prototype.clickedCallBack = function (eCard) {
  //copy all essential decision makers from the card clicked
  // id is the delegate because, the contents of the card, are from Polymer
  // also, the user can only click on the content, and not the card itself
  // the delegate to the content clicked on, is the card
  const id = eCard.delegateTarget.id;
  const card = $("#" + id);
  //Determine and copy the currently pressed slot containing the card containing the Polymer
  const slot = this.slots[id];
  //Copy the hash on slot, for matching purposes
  const hash = slot.hash;
  //Define a mismatch handler
  const onMismatch = () => {
    //Previously flipped card, determined by the pointer to the slot referenced by an odd move
    // and also, its slot
    const prevCard = $("#" + this.currentMatchableId);
    const prevSlot = this.slots[this.currentMatchableId];
    //Shake them
    //Flip them
    prevCard.find(".placeholder")
      .effect("shake", {
        times: 5,
        distance: 5,
        direction: "left"
      }, "fast");
    card.find(".placeholder")
      .effect("shake", {
        times: 5,
        distance: 5,
        direction: "left"
      }, "fast", () => {
        this.flip(prevCard, prevSlot);
        this.flip(card, slot);
      });
    //mismatch handler is called on an even move
    //reset the pointers to the previous matchable card and slot
    //reset the previous card's matchable hash
    this.currentMatchableId = "";
    this.currentMatchableHash = "";
  };
  //Define a per match visual effects handler
  const puffScore = (score) => {
    //remove any stale score containers
    $(".puff-of-score")
      .remove();
    //identify the to be matched cards
    const prevCard = $("#" + this.currentMatchableId);
    const prevSlot = this.slots[this.currentMatchableId];
    //puff the two matching cards
    card.find(".placeholder")
      .effect("puff")
      .fadeIn(5);
    prevCard.find(".placeholder")
      .effect("puff")
      .fadeIn(5);
    //add a new score on this match container
    const oScoreContainer = $('<div class="puff-of-score"></div>');
    $("BODY")
      .append(oScoreContainer);
    //append the score on this match
    const scoreText = `<h1 class="current-score">+${score}</h1>`;
    oScoreContainer.empty();
    return oScoreContainer.html(scoreText)
      //let it appear to have popped up
      .effect("scale")
      //now let the user see the score transferred to the total score
      .effect("transfer", {
        to: $('.points')
      }, 200, () => {
        //scores visualised, remove the score container
        return oScoreContainer.effect("explode", {}, 400, () => {
          oScoreContainer.remove();
          return this.updateScoreOnPanels();
        });
      });
  };
  //Checks if, the score recorded this match, is the overall highest yet
  const isMaxScore = s => {
    if (this.maxScoreOnMatch == false) {
      this.maxScoreOnMatch = s;
    }
    this.maxScoreOnMatch = (this.maxScoreOnMatch >= s) ? this.maxScoreOnMatch : s;
    return (s >= this.maxScoreOnMatch);
  };
  //if card already matched, or, if the same card clicked, set exit condition to do nothing
  const exitCondition = (this.slotsMatched.indexOf(id) >= 0 || id == this.currentMatchableId);
  //if the card is not matched with a pair, or, if a different card clicked, continue to inspect a possible match
  if (!exitCondition) {
    //flip the card, count one move
    this.flip(card, slot);
    this.moves++;
    const oddMove = ((this.moves % 2) != 0);
    //if odd move, store the to be matched hash
    if (oddMove) {
      this.currentMatchableHash = hash;
      this.currentMatchableId = id;
    }
    //if the move is even, compare and act
    else {
      if (hash === this.currentMatchableHash) {
        //Its a Match!
        //Push the two currently matched slots with their respective cards, into a tracker list of
        //matched slots and cards
        this.slotsMatched.push(this.currentMatchableId);
        this.slotsMatched.push(id);
        this.matchedSlotHashes.push(hash);
        //Set a Rating parameter to determine how many moves were made since the last match
        this.moveOnLastMatch = this.moves;
        //Grade or aggregate points per match
        const score = this.score();
        //Is this the highest score yet?
        //If it is, update the game statistic - high score move
        const isMax = isMaxScore(score);
        if (isMax) {
          const matchingId = this.currentMatchableId;
          this.setHighScoringMatch(id, matchingId, score);
        }
        //call in some visual effects
        puffScore(score);
        //Is the game complete with all cards matched?
        this.updateFinishParams();
      } else {
        //flips take about 10 ms each,
        // two cards flipped equals 20ms
        // delay mismatch handler by an additional 9 ms for aesthetics and view ease
        setTimeout(onMismatch, 29);
      }
    }
    if (this.gameBegun === false) {
      this.gameBegun = true;
      this.startTickerTimers();
    }
    //on each click of a crad on deck, display the moves completed
    this.updateMoveCountOnPanels();
    //on each click, rate the user based on moves, matches
    this.rate();
    const gameWon = this.gameWon();
    const ratingTooLow = this.ratingDipBoundsReached();
    const finishCondition = (gameWon || ratingTooLow);
    const shuffleNow = (this.shuffleAtWhim && !finishCondition) ? this.randomShuffle() : false;
    return (finishCondition && true) ? this.finish() : false;
  }
  return false;
};
SuperHeroMindMap.prototype.startTickerTimers = function () {
  //time this animation frame
  const time_now = Date.now();
  //time last animation frame
  this.time_before = (this.time_before === false) ? time_now : this.time_before;
  //diff in time between two frames ~ 1 milliseconds
  const diff_in_time = time_now - this.time_before;
  //set time last animation frame to time now this animation frame
  //on the next frame, it is handy to find the diff
  this.time_before = time_now;
  //Actual time elapsed since the game began
  //sum of differences between animation frames
  //Also, the time to count down on the panel is the deduction of time difference between animation frames
  //from the inital value of 180000 milliseconds
  this.time += diff_in_time;
  this.panelTime -= diff_in_time;
  const timeOver = this.gameTimeOver();
  //loop frames
  this.ticktock = window.requestAnimationFrame(() => {
    return this.startTickerTimers();
  });
  return (timeOver && true) ?
    //if 3 minutes are up, stop the game
    //show stats
    this.finish() :
    //count down/up timers
    this.tickTthemTimers();
};
SuperHeroMindMap.prototype.gameTimeOver = function () {
  if (this.panelTime <= 0) {
    this.notificationCategory = "error";
    this.notificationMsg = "Game Over!! Replay anytime by clicking the replay game option on the panel below";
    this.timeOver = true;
  }
  return (this.timeOver && true);
};
SuperHeroMindMap.prototype.reset = function () {
  // reset match check params
  this.currentMatchableHash = "";
  this.currentMatchableId = "";
  this.slotsMatched = [];
  this.matchesComplete = false;
  this.matchedSlotHashes = [];
  //reset rate params
  this.moves = 0;
  this.matches = 0;
  this.ratingDip = 0;
  this.moveOnLastMatch = 0;
  this.shuffleAtWhim = false;
  //reset score
  this.userScore = 0;
  this.maxScoreOnMatch = false;
  //remove stale modal notifications
  this.notificationMsg = "";
  this.notificationCategory = "info";
  //reset panels
  this.resetPanel();
  this.resetStatistics();
  //remove a request to the global object for animation frames if any
  this.ticktock = window.cancelAnimationFrame(this.ticktock);
  this.ticktock = false;
  //reset the time difference helpers
  this.time = 0;
  this.gameBegun = false;
  this.time_before = false;
  this.panelTime = 180021;
  this.timeOver = false;
  //reset the move the deck was shuffled on
  this.shuffledOnMove = 0;
};
SuperHeroMindMap.prototype.resetPanel = function (gameOver) {
  //All text displaying containers on the game panel, need reset
  // ON - replay / a win
  this.oRatingContainer.children()
    .remove();
  //Hold off on adding 5 stars to the rating container just yet
  //Add them, only on user initiated replay, before the game is won
  if (!gameOver) {
    let star;
    for (let i = 0; i < 5; i++) {
      star = $('<span class="fa fa-star star"></span>');
      this.oRatingContainer.append(star);
    }
  }
  this.oClockContainer.empty();
  this.oScoreContainer.empty()
    .html("--");
  return this.oMovesContainer
    .empty()
    .html("<h2>--</h2>");
};
SuperHeroMindMap.prototype.resetStatistics = function () {
  //fairy straightforward
  //All text appended on to the stats panel during the game, need reset to null / "--"
  const highScoreText = "<h2>--</h2>";
  const initialScore = "<h2>--</h2>";
  this.oStatsHighScoreContainer.empty()
    .html(highScoreText);
  this.oScorecardScoreContainer.empty()
    .html(initialScore);
  this.oStatsMatchesContainer.find("h3")
    .remove();
  this.oStatsMismatchesContainer.find("h3")
    .remove();
  this.oScorecardClockContainer.empty();
  this.oScorecardMovesContainer.empty();
  this.oScorecardRatingContainer.empty();
  this.oScorecardClockContainer.empty();
  //Important! Hide the stats panel on
  // - replay
  return this.oStatisticsContainer.hide();
};
SuperHeroMindMap.prototype.shuffleDeck = function () {
  //Shuffle the Deck
  //Grab all slots and their respective cards
  const slots = this.slot.shuffleSlots();
  //Initialize / re Initialize a local property to track slots in play
  this.slots = {};
  //loop over available shuffled slots
  //Store them all in the tracker for this play/hand
  for (const slot of slots) {
    this.slots[slot.id] = slot;
  }
  return this.slots;
};
SuperHeroMindMap.prototype.flip = function (card, slot) {
  //grab the currently displayed content on the card in the slot on deck
  //toggle the view to the alternative content
  const toggledContent = (slot.toggle() == "rear") ? "flippedContent" : "content";
  let content = slot[toggledContent];
  //Reveals a Card on Slot
  const reveal = function () {
    return card.find(".placeholder")
      .fadeIn(5);
  };
  //Flips a card
  //Just appends the toggled content above, to the card on slot
  const flip = function () {
    card.find(".placeholder")
      .children()
      .remove();
    return card.find(".placeholder")
      .empty()
      .append(content);
  };
  //hides a card
  const hide = function () {
    return card.find(".placeholder")
      .fadeOut(5);
  };
  //Order : Hide , Then Flip, and finally, Reveal
  hide();
  flip();
  reveal();
};
SuperHeroMindMap.prototype.rate = function () {
  const moves = this.moves;
  const matches = this.slotsMatched.length / 2;
  const cardsAvailable = this.slot.slots.length - this.slotsMatched.length;
  const matchesRemaining = cardsAvailable / 2;

  /*
   **    C1 C2 C3 C4
   ** C1  X  1  2  3
   ** C2  4  X  5  6
   ** C3  7  8  X  9
   ** C4  10 11 12 X
   */
  //Possible number of card:match combinations, whether a match, or not
  const uniqueCombinations = cardsAvailable * (cardsAvailable - 1);
  //Number of moves since the last successful match
  const deltaMoves = moves - this.moveOnLastMatch;
  //Whether this move recorded a Match - either 0(No!!) or 1(Yes!)
  const deltaMatches = matches - this.matches;
  //Maximum number of moves granted to log a match - Half of the number of Cards Unmatched discounting the currently to be matched card
  const factor = (cardsAvailable > 4) ? 2 : 1;
  let maxMovesDelta = Math.floor(Math.round((cardsAvailable - 1) / factor));
  //Determine if this is an even move
  const onEvenMove = (this.moves % 2 == 0 && true);
  //Determine if, The rating should dip
  const deltaHigh = ((deltaMatches == 0) && (deltaMoves >= maxMovesDelta));
  //Reset matches till now
  //Set it to the current number of matches, So, in the event of a next match, the delta is always 1
  //else always 0
  this.matches = matches;
  //How many moves have been registered on the counter since the last shuffle?
  const deltaShuffle = this.moves - this.shuffledOnMove;
  //Should we shuffle whimsically?
  //If max permissible number of moves have been exceeded, and the game is on an even move
  //then, check if the last shuffle was made a while back
  //if so, shuffle away!
  this.shuffleAtWhim = (deltaHigh && (cardsAvailable >= 6) && onEvenMove && (deltaShuffle >= (maxMovesDelta / 2)));
  //set the move the deck was last shuffled on, to this move
  this.shuffledOnMove = (this.shuffleAtWhim) ? this.moves : this.shuffledOnMove;
  //Only Dip the rating, on an even move
  if (deltaHigh && onEvenMove) {
    const star = this.oRatingContainer.find("svg:first-child");
    star.remove();
    this.ratingDip++;
  }
  //If out of a maximum of 5 deductable ratings,the user has moved to a point where
  //All 5 of them have been deducted,
  //Notify the user, that they need to restart the game
  //Also deActivate the deck of cards
  if (this.ratingDip > 4) {
    const alert = () => {
      this.oContainer.effect("shake", {
        times: 5,
        direction: "right"
      }, "fast");
    };
    //Let the deck shake for a while for visual effects
    //Then, NOTFIY
    setTimeout(alert, 110);
    this.notificationMsg = "You have exhausted the number of moves to find a match.Please click Replay Game from the options panel below";
    this.notificationCategory = "error";
  }
  //define a menu of scoring parameters
  const scoreMenu = {
    deltaHigh,
    deltaMoves,
    maxMovesDelta
  };
  return this.scoreMenu = scoreMenu;
};
SuperHeroMindMap.prototype.randomShuffle = function () {
  //delay a blink for visual registers
  setTimeout(() => {
    //Extract all slotted cards into cards
    const cards = this.oContainer.find("article.card");
    const slots = this.slots;
    //notify the user, that the deck is being shuffled
    this.notify();
    //Delay this till the flipped cards have been flipped back, and then some more
    //just wait a sec and some
    setTimeout(() => {
      this.oContainer.effect("shake", {
        times: 5,
        direction: "right"
      }, "fast");
      //shuffle well
      this.shuffleDeck();
      this.shuffleDeck();
      //layout the shuffled deck
      cards.each((cardIndex, card) => {
        const id = $(card)
          .attr("id");
        const slot = this.slots[id];
        const order = slot.order;
        $(card)
          .css({
            "order": order,
            "display": "block"
          })
          .fadeOut()
          .fadeIn();
      });
      //unset the shuffle parameter and set it to false, so  the next shuffle happens later
      //and not on the next click
      return this.shuffleAtWhim = false;
    }, 1800);
  }, 50);
  this.notificationCategory = "info";
  this.notificationMsg = "Shuffling Deck";
};
SuperHeroMindMap.prototype.ratingDipBoundsReached = function () {
  return (this.ratingDip > 4);
};
SuperHeroMindMap.prototype.score = function () {
  //Arbitrary max points per match
  const maxPointsPerMatch = 25;
  //Initialize scoring parameters
  let delta = 0;
  let pointsThisMatch = 0;
  let scoreThisMatch = 0;
  //the rating the game is on at the moment
  //(maxrating of 5 minus the dip in rating)
  const currentRating = 5 - this.ratingDip;
  //the dip in rating
  //check if it is 0, and set it to be a minimum of 1, if it is
  const dip = (this.ratingDip > 0) ? this.ratingDip : 1;
  if (this.scoreMenu.deltaHigh) {
    //delta becomes the number of moves over and above the max permissible moves
    delta = this.scoreMenu.deltaMoves - this.scoreMenu.maxMovesDelta;
    //points scored, are a deduction of the delta above from the max arbitray points to be awarded per match
    pointsThisMatch = maxPointsPerMatch - delta;
    //rating needs to be a factor
    //also, the more the dip, the less the points => divide by dip
    scoreThisMatch = currentRating * (pointsThisMatch / dip);
  } else {
    //delta becomes the number of moves left to exceed the max permissible moves
    delta = this.scoreMenu.maxMovesDelta - this.scoreMenu.deltaMoves;
    //No deductions here!
    pointsThisMatch = maxPointsPerMatch;
    //factor in the rating
    //Since the user matched this one without exceeding max permissible Moves,
    //the delta above, is the bonus
    scoreThisMatch = (currentRating * pointsThisMatch) + delta;
  }
  scoreThisMatch = Math.ceil(Math.abs(scoreThisMatch));
  //add score on this match to the game score
  this.userScore += scoreThisMatch;
  return scoreThisMatch;
};
SuperHeroMindMap.prototype.setHighScoringMatch = function (...highs) {
  //gather the high scoring slot, and its matching slots
  //For a later possible feature of displaying cards on the stats panel
  const [id, match, score] = highs;
  const matchedSlot = this.slot[match];
  //for now, identify the superhero card that was matched
  //get the name and matched alter ego
  const oSuperhero = this.getSuperhero(id);
  const name = oSuperhero.name;
  const alterEgo = oSuperhero.alterEgo;
  //Append the name / alterego concatenation to the stats panel's high scoring match container
  const highScoreText = `<h2>${name} / ${alterEgo} ( + ${score} )</h2>`;
  return this.oStatsHighScoreContainer.empty()
    .append(highScoreText);
};
SuperHeroMindMap.prototype.getSuperhero = function (id) {
  const slot = this.slots[id];
  const hash = slot.hash;
  const oSuperhero = this.superHeroes[hash];
  return oSuperhero;
};
SuperHeroMindMap.prototype.notify = function () {
  //Empty any stale Notification modals
  this.oModalContainer.children()
    .remove();
  //Create a new modal
  const oNotifyCard = document.createElement("notify-card");
  //Categorize the message as an:
  ///////////////////////////////////////ERROR
  //////////////////////////////////SUCCESS OR
  ////////////////////////////////////////OTHER
  const categoryAttributed = oNotifyCard.setAttribute(this.notificationCategory, true);
  //Add the new notification message
  const oTextContainer = document.createElement("DIV");
  oTextContainer.setAttribute("id", "notification-box");
  const innerHTML = `<span class="notification-text">${this.notificationMsg}</span>`;
  oTextContainer.innerHTML = innerHTML;
  oNotifyCard.appendChild(oTextContainer);
  //Pop Up Notify
  this.oModalContainer.append(oNotifyCard);
};
SuperHeroMindMap.prototype.updateFinishParams = function () {
  //number of cards still unmatched
  const cardsAvailable = this.slot.slots.length - this.slotsMatched.length;
  //Is the game over? are all superheroes matched to their respective alter egoes?
  const matchesComplete = (cardsAvailable === 0) && true;
  this.matchesComplete = matchesComplete;
  //If all matches are done, set a congratulatory message
  //set the notification criteria
  if (this.matchesComplete) {
    this.notificationMsg = `You have mapped all Superheroes, to their alter egoes!!!
    You can now view some statistics, or, just hit replay`;
    this.notificationCategory = "cmesg";
    $(".scorecard-timer-header")
      .empty()
      .html("Game Won In");
  }
};
SuperHeroMindMap.prototype.gameWon = function () {
  return (this.matchesComplete && true);
};
SuperHeroMindMap.prototype.finish = function () {
  this.ticktock = window.cancelAnimationFrame(this.ticktock);
  //Delay for visual effects
  setTimeout(() => {
    //Reset the game panel displaying scores and moves
    //Do not add stars until the game is over - results in more than 5 star ratings
    this.resetPanel(true);
    //reset the min dimensions of the deck container, to 0, as we are hiding it for stats to take its place
    //then, empty the deck, make space for statistics
    this.oContainer.css({
        "min-height": 0,
        "height": "auto",
        "min-width": 0,
        "width": "auto"
      })
      .empty();
    //then , finally, load the stats
    return this.showStatistics();
  }, 1500);
  //notify the user, that he has either failed, or won
  setTimeout(() => {
    return this.notify();
  }, 1000);
  //while the finish is delayed, show the spinner for visual effects
  return this.emptyDeck();
};
SuperHeroMindMap.prototype.updateMoveCountOnPanels = function () {
  //Display the number of moves on both the game panel while in play
  //And, the stats panel for display post finish either by exhaustion of moves, or a win
  this.oScorecardMovesContainer.empty()
    .append(`<h2>${this.moves}</h2>`);
  return this.oMovesContainer.empty()
    .append(`<span class="move-count">${this.moves}</span>`);

};
SuperHeroMindMap.prototype.updateScoreOnPanels = function () {
  //Display score on both the game panel while the game is on
  //And, the hidden stats panel for display after the game ended
  const scoreText = `${this.userScore}`;
  this.oScorecardScoreContainer.empty()
    .append(`<h2>${scoreText}</h2>`);
  return this.oScoreContainer.empty()
    .append(scoreText)
    .effect("bounce");
};
SuperHeroMindMap.prototype.tickTthemTimers = function () {
  const readableStatsTime = new Date(this.time)
    .toISOString()
    .slice(11, -5);
  const readablePanelTime = new Date(this.panelTime)
    .toISOString()
    .slice(11, -5);
  this.oClockContainer.empty()
    .html(`<h2>${readablePanelTime}</h2>`);
  this.oScorecardClockContainer.empty()
    .html(`<h2>${readableStatsTime}</h2>`);
};
SuperHeroMindMap.prototype.showStatistics = function () {
  let star;
  let oContainer;
  //Show the overall rating on which the game ended
  this.oScorecardRatingContainer.empty();
  let rating = 5 - this.ratingDip;
  if (rating < 1)
    rating = 1;
  for (let i = 0; i < rating; i++) {
    star = $('<span class="fa fa-star star"></span>');
    this.oScorecardRatingContainer.append(star);
  }
  //Create lists of all matched superHeroes
  //Also, a list of all unmatched superHeroes
  const superheroKeys = Object.keys(this.superHeroes);
  const matchedSuperheroes = superheroKeys.reduce((accumalatedMatchedSuperheroes, currentKey) => {
    if (this.matchedSlotHashes.indexOf(currentKey) >= 0) {
      accumalatedMatchedSuperheroes.push(this.superHeroes[currentKey]);
    }
    return accumalatedMatchedSuperheroes;
  }, []);
  const unmatchedSuperheroes = superheroKeys.reduce((accumalatedUnMatchedSuperheroes, currentKey) => {
    if (this.matchedSlotHashes.indexOf(currentKey) < 0) {
      accumalatedUnMatchedSuperheroes.push(this.superHeroes[currentKey]);
    }

    return accumalatedUnMatchedSuperheroes;
  }, []);
  //Append the list of all matched superheroes to the mathes container on the stats panel
  for (const superhero of matchedSuperheroes) {
    oContainer = $('<h3 class="cards-found"></h3>');
    oContainer.html(`${superhero.name} / ${superhero.alterEgo}`);
    this.oStatsMatchesContainer.append(oContainer);
  }
  //Also, append the list of all unamtched superheroes to the mismatched container on the statistics panel
  for (const superhero of unmatchedSuperheroes) {
    oContainer = $('<h3 class="cards-not-found"></h3>');
    oContainer.html(`${superhero.name} / ${superhero.alterEgo}`);
    this.oStatsMismatchesContainer.append(oContainer);
  }
  //Important! Show the stats after the player finishes
  this.oStatisticsContainer.fadeIn(1505);
};
SuperHeroMindMap.prototype.emptyDeck = function () {
  //Create a visually engaging spinning wheel
  const shuffle = $('<div class="shuffle"><h1><span class="fa fa-cog fa-spin fa-3x"></span></h1></div>');
  this.deActivate();
  //Empty the Deck
  //Append spinner
  //Add a timeout delay, because, after the last winning match, the spinner and the shuffle
  //hijack the score puff effect
  setTimeout(() => {
    this.oContainer.children()
      .each(function () {
        return this.remove();
      });
    //Set the Deck's dimensions to be retained to what they were before emptying it's content
    //Display that spinning wheel indicating, the cards are being shuffled, and a new game is being initialized
    return this.oContainer.css({
        "min-height": this.oCanvas.height
      })
      .append(shuffle);
  }, 1005);
};
SuperHeroMindMap.prototype.restart = function () {
  this.emptyDeck();
  //Relayout the game
  const relayoutDeck = () => {
    //reset the container for the deck
    this.oContainer.empty();
    //The shuffle takes time. give it some time
    setTimeout(() => {
      return this.oContainer.css({
        "min-height": 0
      });
    }, 200);
    //Shuffle thrice
    this.shuffleDeck();
    this.shuffleDeck();
    this.shuffleDeck();
    //Repopulate the deck
    this.addCards();
    //Activate the click handlers for each card
    this.activate();
  };
  //Let the user see a spinning wheel for a while
  setTimeout(relayoutDeck, 3000);
};