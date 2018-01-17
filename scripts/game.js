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
Slot.prototype.push = function (content, hash) {
  const order = this.slots.length || 0;
  const flippedContent = new flipCard({
    name: "DC Universe",
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
    while (slotsTaken.indexOf(newOrder) >= 0 || newOrder == order) {
      newOrder = Math.floor(Math.random() * (ceil - floor + 1)) + floor;
    }
    slot.order = newOrder;
    slot.currentContent = "rear";
    slotsTaken.push(newOrder);
  }
  return this.slots;
};

/*
 ** @name Game
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
/*
 **@ method build
 **@ description builds superheroes on the fly, assigns them to available slots on the game grid
 */
SuperHeroMindMap.prototype.build = function () {
  //For All Heroes, in the Game, build a superhero object on the fly
  for (const hero of this.heroes) {
    const name = hero.name.replace(/ /g, "")
      .toLowerCase();
    const superhero = new Superhero(hero);
    superhero.equip(superhero.powers);
    superhero.createTradeCards();
    const card = superhero.getCard();
    const match = superhero.getMatch();
    const hash = superhero.alterEgo.replace(/ /g, "")
      .toLowerCase();
    this.slot.push(card, hash);
    this.slot.push(match, hash);
    this.superHeroes[name] = superhero;
  }
  return this.slots = this.shuffleDeck();
};

SuperHeroMindMap.prototype.layout = function (container) {
  const oContainer = $(container);
  this.oContainer = oContainer;
  const reload = $(".reload");
  reload.click(() => {
    return this.restart();
  });
  return this.addCards(false);
};

SuperHeroMindMap.prototype.addCards = function (reload) {
  for (const slot of this.slot.slots) {
    const card = $("<article class='card'></article>");
    card.attr("id", slot.id)
      .empty()
      .append(slot.flippedContent)
      .css({
        order: slot.order,
        display: "block"
      });
    this.oContainer.append(card);
  }
  const width = this.oContainer.width();
  const height = this.oContainer.height();
  const canvas = {
    width,
    height
  };
  this.oCanvas = canvas;
};

SuperHeroMindMap.prototype.activate = function () {
  this.reset();
  const oContainer = this.oContainer;
  const cards = oContainer.find("article.card");
  cards.click((eCard) => {
    const id = eCard.delegateTarget.id;
    const card = $("#" + id);
    const slot = this.slots[id];
    const hash = slot.hash;
    const shake = () => {
      const prevCard = $("#" + this.currentMatchableId);
      const prevSlot = this.slots[this.currentMatchableId];
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
      this.currentMatchableId = "";
      this.currentMatchableHash = "";
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
          this.slotsMatched.push(this.currentMatchableId);
          this.slotsMatched.push(id);
        } else {
          setTimeout(shake, 29);
        }
      }
    }
    this.showMoves();
    return ((this.matchesComplete) ? this.finish() : this.rate());
  });
};
SuperHeroMindMap.prototype.reset = function () {
  this.currentMatchableHash = "";
  this.moves = 0;
  this.slotsMatched = [];
  this.currentMatchableId = "";
  this.matchesComplete = false;
}
SuperHeroMindMap.prototype.shuffleDeck = function () {
  this.slots = {};
  const slots = this.slot.shuffleSlots();
  for (const slot of slots) {
    this.slots[slot.id] = slot;
  }
  console.log(this.slots);
  return this.slots;
}
SuperHeroMindMap.prototype.flip = function (card, slot) {
  const toggledContent = (slot.toggle() == "rear") ? "flippedContent" : "content";
  const content = slot[toggledContent];

  const reveal = function () {
    card.children()
      .each(function () {
        $(this)
          .fadeIn(5)
      });
  }
  const flip = function () {
    card.empty()
      .append(content);
    return reveal();
  }
  card.children()
    .each(function () {
      $(this)
        .fadeOut(5)
    });
  return flip();
};
SuperHeroMindMap.prototype.rate = function () {
  const moves = this.moves;
  const matches = this.slotsMatched.length / 2;
  return true;
};
SuperHeroMindMap.prototype.finish = function () {
  return true;
};
SuperHeroMindMap.prototype.showMoves = function () {
  const moveCounter = $(".move");
  return moveCounter.empty()
    .append(`<span class="move-count">${this.moves}</span>`);

};
SuperHeroMindMap.prototype.restart = function () {
  const shuffle = $("<div class='shuffle'><h1><span class='fa fa-redo fa-spin fa-3x'></span></h1></div>'");
  this.oContainer.children()
    .each(function () {
      return this.remove();
    });
  this.oContainer.css({
      "min-height": this.oCanvas.height
    })
    .append(shuffle);
  const relayoutDeck = () => {
    this.oContainer.empty();
    setTimeout(() => {
      return this.oContainer.css({
        "min-height": 0
      });
    }, 200);
    this.shuffleDeck();
    this.shuffleDeck();
    this.shuffleDeck();
    this.addCards(true);
    this.activate();
  };
  setTimeout(relayoutDeck, 3000);
};