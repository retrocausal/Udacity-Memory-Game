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
  const width = oContainer.width();
  for (const slot of this.slot.slots) {
    const card = $("<article></article>");
    card.attr("id", slot.id)
      .html(slot.flippedContent)
      .addClass("card")
      .css({
        "order": slot.order
      })
      .hide()
      .fadeIn(3000);
    oContainer.append(card);
  }
  return this.oContainer = oContainer;
};

SuperHeroMindMap.prototype.activateCards = function () {
  this.reset();
  const oContainer = this.oContainer;
  const cards = oContainer.find("article.card");
  cards.click((eCard) => {
    const id = eCard.delegateTarget.id;
    const card = $("#" + id);
    const slot = this.slots[id];
    const hash = slot.hash;
    const animationCss = {
      "background": "red",
      "height": "toggle"
    };
    //if card already matched, or, if the same card clicked, do nothing
    if (this.slotsMatched.indexOf(id) >= 0 || id == this.currentMatchableId) {
      return false;
    }
    //if the card is not matched with a pair, or, if a different card clicked, inspect
    else {
      //flip the card, count one move
      this.flip(card, slot);
      this.moves++;
      //if odd move, store the to be matched hash
      if ((this.moves % 2) != 0) {
        this.currentMatchableHash = hash;
        this.currentMatchableId = id;
      }
      //if the move is even, compare and act
      else {
        const prevCard = $("#" + this.currentMatchableId);
        const prevSlot = this.slots[this.currentMatchableId];
        if (hash === this.currentMatchableHash) {
          this.slotsMatched.push(this.currentMatchableId);
          this.slotsMatched.push(id);
        } else {
          card.effect("shake");
          prevCard.effect("shake");
          setTimeout(() => {
            this.flip(card, slot);
            this.flip(prevCard, prevSlot)
          }, 1000);

        }
        this.currentMatchableId = "";
        this.currentMatchableHash = "";
      }
    }
    console.log(this.slotsMatched, this.moves);
  });
};
SuperHeroMindMap.prototype.reset = function () {
  this.currentMatchableHash = "";
  this.moves = 0;
  this.slotsMatched = [];
  this.currentMatchableId = "";
}
SuperHeroMindMap.prototype.shuffleDeck = function () {
  this.slots = {};
  const slots = this.slot.shuffleSlots();
  for (const slot of slots) {
    this.slots[slot.id] = slot;
  }
  return this.slots;
}
SuperHeroMindMap.prototype.flip = function (card, slot) {
  console.log(card);
  const toggledContent = (slot.toggle() == "rear") ? "flippedContent" : "content";
  const content = slot[toggledContent];
  card.fadeOut("slow", function () {
    card.empty()
      .fadeIn("slow")
      .append(content);
  });

};