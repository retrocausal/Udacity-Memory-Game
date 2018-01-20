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
      format: "jpg"
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
      format: "jpg"
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
 ** @Description Constructor Definition for generating new games on the fly.
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
/*
 **@ method build
 **@ description builds superheroes on the fly, assigns them to available slots on the game grid
 */
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
    this.superHeroes[name] = superhero;
  }
  //shuffle the deck for display later via layout
  //copy over the slots generated via the Slot class, to a local "slots" property
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
  //Initialize the scores container
  this.oScoreContainer = $(".total-user-score");
  //Iteratively Add Slots with self contained cards to the flex deck
  return this.addCards();
};
SuperHeroMindMap.prototype.addCards = function () {
  //loop over each available slot, print the card backwards onto the slot on deck
  for (const slot of this.slot.slots) {
    //create a card to display content, flipped or front
    const card = $("<article class='card'></article>");
    //Assign an ID, to the card
    //Empty to begin
    //Assign the css display order and display the card as a block with the flip side in view
    card.attr("id", slot.id)
      .empty()
      .append(slot.flippedContent)
      .css({
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
  cards.children()
    .off("click");
  //Activate a click handler , in case the user is stubborn, globally on deck
  //Should not enable user to reactivate deck,
  //Should keep throwing alerts to user initiated restart
  oContainer.click((eContainer) => {
    this.notificationMsg = "You have exhausted the number of moves to find a match.Please click Replay Game from the options panel below";
    return this.notify("error");
  });
};
SuperHeroMindMap.prototype.activate = function () {
  //Copy locally, the local container property
  const oContainer = this.oContainer;
  //Extract all slotted cards into cards
  const cards = oContainer.find("article.card");
  //copy over the locally available / defined click handler,
  //reset
  //Assign a click handler by binding the copied click handler to the current object
  const clickedCallBack = this.clickedCallBack;
  this.reset();
  return cards.click(clickedCallBack.bind(this));
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
    prevCard.children()
      .effect("shake", {
        times: 5,
        distance: 5,
        direction: "left"
      }, "fast");
    card.children()
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
  const puffScore = (score) => {
    $(".puff-of-score")
      .remove();
    const prevCard = $("#" + this.currentMatchableId);
    const prevSlot = this.slots[this.currentMatchableId];
    const oScoreContainer = $('<div class="puff-of-score"></div>');
    $("BODY")
      .append(oScoreContainer);
    const scoreText = `<h1 class="current-score">+${score}</h1>`;
    oScoreContainer.empty();
    card.children()
      .effect("puff");
    prevCard.children()
      .effect("puff");
    return oScoreContainer.html(scoreText)
      .effect("scale")
      .effect("transfer", {
        to: $('.points')
      }, 200, () => {
        return oScoreContainer.effect("explode", {}, 1000, () => {
          return oScoreContainer.remove();
        });
      });
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
        //Set a Rating parameter to determine how many moves were made since the last match
        this.moveOnLastMatch = this.moves;
        //Grade or aggregate points per match
        const score = this.score();
        setTimeout(() => {
          puffScore(score);
          return this.showScores();
        }, 10);
      } else {
        //flips take about 10 ms each,
        // two cards flipped equals 20ms
        // delay mismatch handler by an additional 9 ms for aesthetics and view ease
        setTimeout(onMismatch, 29);
      }
    }
    //on each click of a crad on deck, display the moves completed
    this.showMoves();
    //on each click, rate the user based on moves, matches
    return this.rate();
  }
  return false;
};
SuperHeroMindMap.prototype.reset = function () {
  // reset match check params
  this.currentMatchableHash = "";
  this.currentMatchableId = "";
  this.slotsMatched = [];
  this.matchesComplete = false;
  //reset rate params
  this.moves = 0;
  this.matches = 0;
  this.ratingDip = 0;
  this.moveOnLastMatch = 0;
  //reset score
  this.userScore = 0;
  this.oScoreContainer.empty();
  //remove stale modal dialogs
  this.oModalContainer.empty();
  this.notificationMsg = "";
  //remove click handler set on rate dipping to 0
  this.oContainer.off("click");
};
SuperHeroMindMap.prototype.shuffleDeck = function () {
  //Initialize / re Initialize a local property to track slots in play
  this.slots = {};
  //Shuffle the Deck
  //Grab all slots and their respective cards
  const slots = this.slot.shuffleSlots();
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
  const content = slot[toggledContent];
  //Reveals a Card on Slot
  const reveal = function () {
    return card.children()
      .each(function () {
        $(this)
          .fadeIn(5)
      });
  };
  //Flips a card
  //Just appends the toggled content above, to the card on slot
  const flip = function () {
    return card.empty()
      .append(content);
  };
  //hides a card
  const hide = function () {
    return card.children()
      .each(function () {
        $(this)
          .fadeOut(5)
      });
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
  const maxMovesDelta = Math.floor(Math.round((cardsAvailable - 1) / 2));
  //Determine if, The rating should dip
  const deltaHigh = ((deltaMatches == 0) && (deltaMoves >= maxMovesDelta));
  //Determine if this is an even move
  const onEvenMove = (this.moves % 2 == 0 && true);
  //Reset matches till now
  //Set it to the current number of matches, So, in the event of a next match, the delta is always 1
  //else always 0
  this.matches = matches;
  const rating = $(".rating");
  //Only Dip the rating, on an even move
  if (deltaHigh && onEvenMove) {
    const star = rating.find("svg:first-child");
    star.remove();
    this.ratingDip++;
  }
  //If out of a maximum of 5 deductable ratings,the user has moved to a point where
  //All 5 of them have been deducted,
  //Notify the user, that they need to restart the game
  //Also deActivate the deck of cards
  if (this.ratingDip > 4) {
    const notify = () => {
      this.oContainer.effect("shake", {
        times: 5,
        direction: "right"
      }, "fast", () => {
        this.deActivate();
        this.notificationMsg = "You have exhausted the number of moves to find a match.Please click Replay Game from the options panel below";
        return this.notify("error");
      });
    };
    //Let the deck shake for a while for visual effects
    //Then, NOTFIY
    setTimeout(notify, 120);
  }
  //define a menu of scoring parameters
  const scoreMenu = {
    deltaHigh,
    deltaMoves,
    maxMovesDelta
  };
  return this.scoreMenu = scoreMenu;
};
SuperHeroMindMap.prototype.score = function () {
  const maxPointsPerMatch = 25;
  let delta = 0;
  let pointsThisMatch = 0;
  let scoreThisMatch = 0;
  const currentRating = 5 - this.ratingDip;
  const dip = (this.ratingDip > 0) ? this.ratingDip : 1;
  if (this.scoreMenu.deltaHigh) {
    delta = this.scoreMenu.deltaMoves - this.scoreMenu.maxMovesDelta;
    pointsThisMatch = maxPointsPerMatch - delta;
    scoreThisMatch = currentRating * (pointsThisMatch / dip);
  } else {
    delta = this.scoreMenu.maxMovesDelta - this.scoreMenu.deltaMoves;
    pointsThisMatch = maxPointsPerMatch;
    scoreThisMatch = (currentRating * pointsThisMatch) + delta;
  }
  scoreThisMatch = Math.ceil(Math.abs(scoreThisMatch));
  this.userScore += scoreThisMatch;
  return scoreThisMatch;
};
SuperHeroMindMap.prototype.notify = function (category) {
  //Empty any stale Notification modals
  this.oModalContainer.empty();
  //Create a new modal
  const oNotifyCard = document.createElement("notify-card");
  //Categorize the message as an:
  ///////////////////////////////////////ERROR
  //////////////////////////////////SUCCESS OR
  ////////////////////////////////////////OTHER
  const categoryAttributed = oNotifyCard.setAttribute(category, true);
  //Add the new notification message
  const oTextContainer = document.createElement("DIV");
  oTextContainer.setAttribute("id", "notification-box");
  const innerHTML = `<span class="notification-text">${this.notificationMsg}</span>`;
  oTextContainer.innerHTML = innerHTML;
  oNotifyCard.appendChild(oTextContainer);
  //Pop Up Notify
  this.oModalContainer.append(oNotifyCard);
};
SuperHeroMindMap.prototype.finish = function () {
  return true;
};
SuperHeroMindMap.prototype.showMoves = function () {
  const moveCounter = $(".move");
  return moveCounter.empty()
    .append(`<span class="move-count">${this.moves}</span>`);

};
SuperHeroMindMap.prototype.showScores = function () {
  const scoreText = `${this.userScore}`;
  setTimeout(() => {
    return this.oScoreContainer.empty()
      .append(scoreText)
      .effect("bounce");
  }, 500);
};
SuperHeroMindMap.prototype.restart = function () {
  //Create a visually engaging spinning wheel
  const shuffle = $('<div class="shuffle"><h1><span class="fa fa-cog fa-spin fa-3x"></span></h1></div>');
  //Empty the Deck
  this.oContainer.children()
    .each(function () {
      return this.remove();
    });
  //Set the Deck's dimensions to be retained to what they were before emptying it's content
  //Display that spinning wheel indicating, the cards are being shuffled, and a new game is being initialized
  this.oContainer.css({
      "min-height": this.oCanvas.height
    })
    .append(shuffle);
  //Determine how many dips in rating the user took - in case of a mid game restart by the user
  //Add those many stars back
  //reset dips in rating to 0
  if (0 < this.ratingDip) {
    const rating = $(".rating");
    let star;
    while (0 < this.ratingDip) {
      star = $('<span class="fa fa-star star"></span>');
      rating.append(star);
      this.ratingDip--;
    }
  }
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