window.addEventListener('WebComponentsReady', (W) => {
  const superHeroMindMap = games.oSuperheroMindMap();
  const play = function () {
    superHeroMindMap.build();
    superHeroMindMap.layout(".deck");
    return superHeroMindMap.activate();
  };
  const docLoaded = () => {
    let check;
    if (document.readyState === "complete") {
      setTimeout(play, 100);
      return check = window.cancelAnimationFrame(check);
    }
    return check = window.requestAnimationFrame(() => {
      return docLoaded();
    });
  };
  return docLoaded();
});