'use strict';
/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

GOOD LUCK 😀
*/

// const game = {
//   team1: 'Bayern Munich',
//   team2: 'Borrussia Dortmund',
//   players: [
//     [
//       'Neuer',
//       'Pavard',
//       'Martinez',
//       'Alaba',
//       'Davies',
//       'Kimmich',
//       'Goretzka',
//       'Coman',
//       'Muller',
//       'Gnarby',
//       'Lewandowski',
//     ],
//     [
//       'Burki',
//       'Schulz',
//       'Hummels',
//       'Akanji',
//       'Hakimi',
//       'Weigl',
//       'Witsel',
//       'Hazard',
//       'Brandt',
//       'Sancho',
//       'Gotze',
//     ],
//   ],
//   score: '4:0',
//   scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
//   date: 'Nov 9th, 2037',
//   odds: {
//     team1: 1.33,
//     x: 3.25,
//     team2: 6.5,
//   },
// };

/* 코딩 챌린지 # 1
// 1.
// const Bayern_Munich = [...game.players[0]];
// const Borrussia_Dortmund = [...game.players[1]];

// 2.
// let [GK, ...other] = [...game.players[0]];
// const Bayern_Munich = [GK, ...other];

// [GK, ...other] = [...game.players[1]];
// const Borrussia_Dortmund = [GK, ...other];

// 3.
// const allTeam = [...game.players[0], ...game.players[1]]

// 4.
// const Bayern_Munich_final = [...game.players[0], 'Thiago', 'Coutinho', 'Perisic']

// 5.
// const { team1: team1, x: draw, team2: team2 } = game.odds;
// console.log(team1, draw, team2);

// 6.
// const printGoals = (...players) => {
//   for (let i = 0; players.length(); i++) {
//     console.log(players[i]);
//   }
//   console.log(players.length)
// };

// 7. ? ahfm
// game.odds.team1 > game.odds.team2 && console.log('win team 1');
// game.odds.team2 > game.odds.team1 && console.log('win team 2');

// 21분 걸림
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1.
// for (const [idx, player] of game.scored.entries()) {
//   console.log(`${idx + 1} :  ${player}`);
// }
//2.

//2.
// const entries = Object.entries(game.odds);
// let sum = 0;
// let keySum = 0;
// for (const [key, value] of entries) {
//   sum += value;
//   keySum += 1;
// }
// console.log(sum / keySum);

//3.
// const entries = Object.entries(game.odds);
// for (const [team, value] of entries) {
//   const victoryTeam = game[team] && `victory ${team}`;
//   console.log(`Odd of ${victoryTeam ?? 'draw'} : ${value}`);
// }

//4.
// const entries = Object.entries(game.scored);
// let scorers = {};
// let goal = 1;
// for (const [key, player] of entries) {
//   goal = 1;
//   if (scorers[player]) {
//     goal = scorers[player];
//     scorers[player] = goal++;
//   }
//   scorers[player] = goal;
// }
// console.log(scorers);

///////////////////////////////////////
// Coding Challenge #3

/*
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);
1;
const evnet = new Set(gameEvents.values());
console.log(evnet);

2;
gameEvents.delete(64);
console.log(gameEvents);

3;
const average = 90 / gameEvents.size;
console.log(
  `An event happened, on average, every ${Math.ceil(average)} minutes`
);

4;
for (const [time, event] of gameEvents) {
  console.log(
    `[${time < 45 ? 'FIRST HALF' : 'SECOND HALF'}] ${time} : ${event}`
  );
}
