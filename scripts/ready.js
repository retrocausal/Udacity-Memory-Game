$(() => {
  const superHeroMindMap = games.oSuperheroMindMap();
  superHeroMindMap.build();
  superHeroMindMap.layout("deck");
  console.log(superHeroMindMap);
});