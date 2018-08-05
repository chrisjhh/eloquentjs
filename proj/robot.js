const runRobotAnimationAsync = function(worldState, robot, robotState) {
  return new Promise((resolve) => 
    runRobotAnimation(worldState, robot, robotState, resolve)
  );
};


async function compareRobots(name1, robot1, memory1, name2, robot2, memory2) {
  // Your code here
  const body = document.getElementsByTagName('body')[0];
  const title = document.createElement('h3');
  body.insertBefore(title,body.firstChild);
  const table = document.createElement('table');
  body.appendChild(table);
  table.innerHTML = `<tr><th>Round</th><th>${name1}</th><th>${name2}</th>`;
  const averageRow = document.createElement('tr');
  averageRow.innerHTML = '<th>Arverage</th>';
  const average1Cell = document.createElement('td');
  averageRow.appendChild(average1Cell);
  const average2Cell = document.createElement('td');
  averageRow.appendChild(average2Cell);
  table.appendChild(averageRow);
  let average1 = 0;
  let average2 = 0;
  const rounds = 20;
  for (let i=0; i< rounds; ++i) {
    const newRow = document.createElement('tr');
    table.insertBefore(newRow,averageRow);
    newRow.innerHTML = `<th>${i+1}</th>`;
    const score1 = document.createElement('td');
    newRow.appendChild(score1);
    const score2 = document.createElement('td');
    newRow.appendChild(score2);

    const world = VillageState.random();
    title.innerHTML = `${name1} round ${i + 1}`;
    const result1 = await runRobotAnimationAsync(world,robot1,memory1);
    score1.innerHTML = result1;
    average1 = (average1 * i + result1)/(i + 1);
    average1Cell.innerHTML = average1;
    title.innerHTML = `${name2} round ${i + 1}`;
    const result2 = await runRobotAnimationAsync(world,robot2,memory2);
    score2.innerHTML = result2;
    average2 = (average2 * i + result2)/(i + 1);
    average2Cell.innerHTML = average2;
  }
  const winner = average1 < average2 ? name1 : name2;
  title.innerHTML = `${winner} is the winner!`;
}

function findRouteToAny(graph, from, destinations) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (destinations.includes(place)) return route.concat(place);
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function pickUpDropOffRobot({place, parcels}, route) {
  if (route.length == 0) {
    let awaitingParcels = parcels.filter(p => p.place != place);
    if (awaitingParcels.length > 0) {
      let pickups = awaitingParcels.map(p => p.place);
      route = findRouteToAny(roadGraph, place, pickups);
    } else {
      let destinations = parcels.map(p => p.address);
      route = findRouteToAny(roadGraph, place, destinations);
    }
  }
  return {direction: route[0], memory: route.slice(1)};
}