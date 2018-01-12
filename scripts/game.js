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
  this.match = new matchCard(this.alterEgo);
};


/*
 **@name Slot
 **@description Creates a new slot instance to hold a card
 */
const Slot = function () {
  this.slots = [];
};
Slot.prototype.push = function (content, hash) {
  const order = this.slots.length || 0;
  return this.slots.push({
    content: content,
    order: order,
    hash: hash,
    flippedContent: "<div></div>",
    id: "slot" + order
  });
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
const Game = function (...config) {
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
Game.prototype.build = function () {
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
  const slots = this.slot.shuffleSlots();
  for (const slot of slots) {
    this.slots[slot.id] = slot;
  }
  return this.slots;
};

Game.prototype.layout = function (container) {
  const ceil = this.slots.length;
  const cols = 4;
  const rows = ceil / cols;
  const oContainer = $("." + container);
  const width = oContainer.width();
  for (const slot of this.slot.slots) {
    const card = $("<article></article>");
    card.attr("id", slot.id)
      .html(slot.flippedContent)
      .addClass("card")
      .css({
        "order": slot.order
      });
    oContainer.append(card);
  }
};
/*
 **@name game
 **@description start a game
 */
const game = (() => {
  // create game
  const heroes = [
    {
      name: "Superman",
      alterEgo: "Kal El",
      powers: ["Freeze Breath", "Heat Vision", "Superhuman Strength", "Superhuman Speed", "Flight", "Xray Vision", "Superhuman Hearing", "Telepathy"],
      origin: "Krypton",
      city: "Metropolis"
    },
    {
      name: "Batman",
      alterEgo: "Bruce Wayne",
      powers: ["Genius Level Intelligence", "Peak Human Strength", "Martial Arts", "Hand to Hand Combat", "Detective Abilities", "Bleeding edge Technology"],
      origin: "Earth-Two",
      city: "Gotham"
    },
    {
      name: "Supergirl",
      alterEgo: "Kara Zor El",
      powers: ["Freeze Breath", "Heat Vision", "Superhuman Strength", "Superhuman Speed", "Flight", "Xray Vision", "Superhuman Hearing"],
      origin: "Krypton",
      city: "National City"
    },
    {
      name: "The Flash",
      alterEgo: "Barry Allen",
      powers: ["Superhuman Speed", "Agility", "Intelligence", "Time travel"],
      origin: "Earth-X/One",
      city: "Central City"
    },
    {
      name: "Martian Man Hunter",
      alterEgo: "Jonn Jonzz",
      powers: ["Telepathy", "Superhuman Strength", "Shape Shifting"],
      origin: "Mars",
      City: "National City"
    },
    {
      name: "Wonder Woman",
      alterEgo: "Princess Diana of Themyscira",
      powers: ["Lasso of Truth", "Superhuman Strength", "Flight", "Longevity"],
      origin: "New Earth",
      city: "Themyscira"
    },
    {
      name: "Aquaman",
      alterEgo: "Orin",
      powers: ["Telepathy", "Superhuman Strength"],
      origin: "Earth-Three",
      city: "Atlantis"
    },
    {
      name: "Cyborg",
      alterEgo: "Vic Stone",
      powers: ["Superhuman Speed", "Superhuman Strength", "Flight"],
      origin: "Earth-Twentythree",
      city: "Central City"
    },
    {
      name: "Green Arrow",
      alterEgo: "Ollie Queen",
      powers: ["Archery"],
      origin: "Earth-Thirty",
      city: "Star City"
    },
    {
      name: "Green Lantern",
      alterEgo: "Hal Jordan",
      powers: ["Force Fields", "Flight"],
      origin: "Oa",
      city: "Coast City"
    },
    {
      name: "The Atom",
      alterEgo: "Ray Palmer",
      powers: ["Hand to Hand Combat", "Subatomic Existance"],
      origin: "Earth-Eleven",
      city: "Ivy Town"
    },
    {
      name: "Black Canary",
      alterEgo: "Laurel Lance",
      powers: ["Sonic Scream", "Martial Arts"],
      origin: "New Earth",
      city: "Gotham"
    }
  ];
  const oGame = new Game(heroes);
  oGame.build();
  oGame.layout("deck");
  return oGame;
})();
console.log(game);