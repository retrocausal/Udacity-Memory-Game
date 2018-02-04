let games = new WeakMap();
let oGamebuilders = new Map();
(() => {
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
      alterEgo: "Princess of Themyscira",
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
  //closure 1
  const SuperheroMindMapBuilder = function () {
    this.oGame = new SuperHeroMindMap(heroes);
    // Add the game object to a WeakMap
    //NOTE: Can be of use later, to maintain state info such as levels etc
    games.set(this.oGame, true);
  };
  SuperheroMindMapBuilder.prototype.play = function () {
    this.oGame.resetGameVariables()
      .build()
      .layout()
      .activate();
    return this;
  };
  return oGamebuilders.set('SuperheroMindMapBuilder', SuperheroMindMapBuilder);
})();