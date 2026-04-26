import { bookData, type Faction } from './book_data';

export type GameState = 'Neutral' | 'Advantage' | 'Disadvantage' | 'HeadOn';

export type Maneuver = 
  | 'TurnLeftSlow' | 'HardTurnLeftSlow' | 'SlipLeftSlow' 
  | 'StraightSlow' | 'StraightLeftSlow' | 'StraightRightSlow'
  | 'TurnRightSlow' | 'HardTurnRightSlow' | 'SlipRightSlow'
  | 'TurnLeftCruising' | 'HardTurnLeftCruising' | 'SlipLeftCruising' | 'StraightCruising'
  | 'Immelmann' | 'BarrelRollLeft' | 'BarrelRollRight'
  | 'TurnRightCruising' | 'HardTurnRightCruising' | 'SlipRightCruising'
  | 'TurnLeftFast' | 'BanksLeftFast' | 'StraightFast' 
  | 'StraightLeftFast' | 'StraightRightFast' | 'TurnRightFast' | 'BanksRightFast';

export const allManeuvers: Maneuver[] = [
  'TurnLeftSlow', 'HardTurnLeftSlow', 'SlipLeftSlow',
  'StraightSlow', 'StraightLeftSlow', 'StraightRightSlow',
  'TurnRightSlow', 'HardTurnRightSlow', 'SlipRightSlow',
  'TurnLeftCruising', 'HardTurnLeftCruising', 'SlipLeftCruising', 'StraightCruising',
  'Immelmann', 'BarrelRollLeft', 'BarrelRollRight',
  'TurnRightCruising', 'HardTurnRightCruising', 'SlipRightCruising',
  'TurnLeftFast', 'BanksLeftFast', 'StraightFast',
  'StraightLeftFast', 'StraightRightFast', 'TurnRightFast', 'BanksRightFast'
];

export const getManeuverIndex = (m: Maneuver): number => allManeuvers.indexOf(m);

export const resolveTurnBook = (
  playerFaction: Faction,
  currentPage: number,
  playerMove: Maneuver,
  enemyMove: Maneuver
): { nextPage: number; intermediatePage: number } => {
  const pIdx = getManeuverIndex(playerMove);
  const eIdx = getManeuverIndex(enemyMove);

  console.log(`--- TURN RESOLUTION ---`);
  console.log(`Player (${playerFaction}) Page: ${currentPage}, Move: ${playerMove} (Idx: ${pIdx})`);
  console.log(`Enemy Move: ${enemyMove} (Idx: ${eIdx})`);

  // 1. Get intermediate page from player's book (Current Page -> Player's Maneuver)
  const playerBook = bookData[playerFaction];
  const pageArray = playerBook[currentPage] || playerBook[String(currentPage)];
  
  if (!pageArray) {
    console.error(`Page ${currentPage} not found in ${playerFaction} book!`);
    return { nextPage: 999, intermediatePage: 999 };
  }

  const intermediatePage = pageArray[pIdx];
  console.log(`Intermediate Page: ${intermediatePage}`);

  if (intermediatePage === null || intermediatePage === undefined || intermediatePage === 999) {
    return { nextPage: 999, intermediatePage: intermediatePage || 999 };
  }

  // 2. Get final page from enemy's book (Intermediate Page -> Enemy's Maneuver)
  const enemyFaction: Faction = playerFaction === 'G' ? 'A' : 'G';
  const enemyBook = bookData[enemyFaction];
  const enemyPageArray = enemyBook[intermediatePage] || enemyBook[String(intermediatePage)];

  if (!enemyPageArray) {
    console.error(`Intermediate Page ${intermediatePage} not found in ${enemyFaction} book!`);
    return { nextPage: 999, intermediatePage: intermediatePage };
  }

  const finalPage = enemyPageArray[eIdx];
  console.log(`Final Page: ${finalPage}`);

  return {
    nextPage: finalPage || 999,
    intermediatePage
  };
};

export const getRandomManeuver = (): Maneuver => {
  return allManeuvers[Math.floor(Math.random() * allManeuvers.length)];
};

export const getSmartEnemyManeuver = (currentState: GameState, playerMove?: Maneuver): Maneuver => {
  if (currentState === 'Disadvantage' && playerMove) {
    if (playerMove.includes('Left')) return 'TurnLeftFast';
    if (playerMove.includes('Right')) return 'TurnRightFast';
    return 'StraightFast';
  }

  if (currentState === 'Disadvantage') {
    const defensive: Maneuver[] = [
      'HardTurnLeftCruising', 'HardTurnRightCruising', 'SlipLeftCruising', 'SlipRightCruising', 'Immelmann'
    ];
    return defensive[Math.floor(Math.random() * defensive.length)];
  }
  
  if (currentState === 'Advantage') {
    const aggressive: Maneuver[] = [
      'StraightCruising', 'StraightFast', 'TurnLeftFast', 'TurnRightFast', 'HardTurnLeftSlow', 'HardTurnRightSlow'
    ];
    return aggressive[Math.floor(Math.random() * aggressive.length)];
  }
  
  return getRandomManeuver();
};
