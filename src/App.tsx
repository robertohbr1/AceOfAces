import { useState } from 'react';
import './App.css';
import { CockpitView } from './components/CockpitView';
import { ControlPanel } from './components/ControlPanel';
import type { GameState, Maneuver } from './game/engine';
import { getSmartEnemyManeuver, resolveTurnBook } from './game/engine';
import { damageData, type Faction } from './game/book_data';

export default function App() {
  const [pageNumber, setPageNumber] = useState(170);
  const [gameState, setGameState] = useState<GameState>('Neutral');
  const [playerFaction] = useState<Faction>('G');

  const [playerHP, setPlayerHP] = useState(6);
  const [enemyHP, setEnemyHP] = useState(6);
  const [preRolledEnemyMove, setPreRolledEnemyMove] = useState<Maneuver | null>(null);
  const [enemyIntention, setEnemyIntention] = useState<string | null>(null);

  const [isAIEnabled, setIsAIEnabled] = useState(false);

  const [isProcessing, setIsProcessing] = useState(false);
  const [log, setLog] = useState<string[]>(['SYSTEM INITIALIZED. NEUTRAL ENGAGEMENT (PAGE 170).']);

  const addLog = (msg: string) => {
    setLog(prev => [msg, ...prev].slice(0, 5)); // Keep last 5 messages
  };

  const handleManeuver = (playerMove: Maneuver) => {
    setIsProcessing(true);
    addLog(`EXECUTING MANEUVER: ${playerMove.toUpperCase()}...`);

    setTimeout(() => {
      try {
        let enemyMove: Maneuver = 'StraightCruising';

        if (isAIEnabled) {
          if (preRolledEnemyMove) {
            enemyMove = preRolledEnemyMove;
          } else {
            enemyMove = getSmartEnemyManeuver(gameState, gameState === 'Disadvantage' ? playerMove : undefined);
          }
          addLog(`ENEMY EXECUTED: ${enemyMove.toUpperCase()}`);
        } else {
          addLog(`AI DISABLED: ENEMY MAINTAINS COURSE`);
        }

        const { nextPage: calculatedFinalPage, intermediatePage } = resolveTurnBook(playerFaction, pageNumber, playerMove, enemyMove);

        const actualNextPage = isAIEnabled ? calculatedFinalPage : intermediatePage;

        // 1. APLICAR DANOS
        console.log(`Page: ${actualNextPage}, damageData keys:`, Object.keys(damageData));
        const damage = (damageData as any)[actualNextPage] || (damageData as any)[String(actualNextPage)];
        
        if (damage) {
          console.log(`Applying damage for page ${actualNextPage}:`, damage);
          if (damage.G > 0) {
            setPlayerHP(prev => Math.max(0, prev - damage.G));
            addLog(`HIT! GERMAN INTEGRITY -${damage.G}`);
          }
          if (damage.A > 0) {
            setEnemyHP(prev => Math.max(0, prev - damage.A));
            addLog(`HIT! ALLIED INTEGRITY -${damage.A}`);
          }
        } else {
          console.log(`No damage defined for page ${actualNextPage}`);
        }

        setPageNumber(actualNextPage);

        if (!isAIEnabled) {
          addLog(`VALIDATION: ${playerMove.toUpperCase()} -> PAGE ${intermediatePage}`);
        } else {
          if (actualNextPage === 999) {
            addLog(`ERROR: DATA NOT FOUND FOR PAGE ${intermediatePage} IN ENEMY BOOK.`);
          } else {
            addLog(`TRANSITION: ${pageNumber} -> ${intermediatePage} -> ${actualNextPage}`);
          }
        }

        // Reset intentions
        setPreRolledEnemyMove(null);
        setEnemyIntention(null);

        if (actualNextPage === 223) {
          addLog('CONTACT LOST! BOTH AIRCRAFT FLED.');
        }
      } catch (err) {
        console.error("Maneuver Error:", err);
        addLog("SYSTEM ERROR DURING TRANSITION.");
      } finally {
        setIsProcessing(false);
      }
    }, 600);
  };

  const resetGame = () => {
    setPageNumber(170);
    setGameState('Neutral');
    setPlayerHP(6);
    setEnemyHP(6);
    setLog(['SIMULATION RESTARTED. PAGE 170.']);
  };

  const isGameOver = playerHP <= 0 || enemyHP <= 0 || pageNumber === 223;

  return (
    <div className="app-container">
      <div className="header-bar">
        <h1 className="hud-text" style={{ fontSize: '1.2rem', margin: 0 }}>ACE OF ACES: LUFTSTREITKRÄFTE COCKPIT</h1>
      </div>

      <CockpitView
        currentState={gameState}
        playerHP={playerHP}
        enemyHP={enemyHP}
        pageNumber={pageNumber}
      />

      {isGameOver ? (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
          <h2 className={`hud-text ${pageNumber === 223 ? 'amber' : (playerHP <= 0 ? 'red' : 'green')}`} style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            {pageNumber === 223 ? 'MISSION ABORTED: CONTACT LOST' : (playerHP <= 0 ? 'MISSION FAILED: FOKKER DESTROYED' : 'MISSION ACCOMPLISHED: ALLIED AIRCRAFT DOWN')}
          </h2>
          <button
            className="control-btn primary"
            style={{ margin: '0 auto', width: '200px' }}
            onClick={resetGame}
          >
            <span className="text">RESTART SIMULATION</span>
          </button>
        </div>
      ) : (
        <ControlPanel
          onSelectManeuver={handleManeuver}
          disabled={isProcessing}
          enemyIntention={enemyIntention}
          isAIEnabled={isAIEnabled}
          onToggleAI={() => setIsAIEnabled(prev => !prev)}
          playerFaction={playerFaction}
          currentPage={pageNumber}
        />
      )}

      <div className="glass-panel" style={{ padding: '1rem' }}>
        <div className="hud-text label" style={{ marginBottom: '0.5rem' }}>COMBAT LOG</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {log.map((entry, i) => (
            <div key={i} className="hud-text" style={{
              fontSize: '0.8rem',
              opacity: i === 0 ? 1 : 0.7 - (i * 0.15),
              color: entry.includes('WARNING') || entry.includes('HIT!') || entry.includes('UNMAPPED') ? 'var(--color-hud-red)' : 'var(--color-hud-green)'
            }}>
              &gt; {entry}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
