$(() => {
  const superHeroMindMap = games.oSuperheroMindMap();
  const play = function () {
    superHeroMindMap.build();
    superHeroMindMap.layout(".deck");
    return superHeroMindMap.activate();
  };
  window.addEventListener('WebComponentsReady', (W) => {
    return play();
  });
});