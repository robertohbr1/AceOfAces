import React from 'react';
import type { Maneuver } from '../game/engine';
import './ControlPanel.css';

import { bookData, type Faction } from '../game/book_data';
import { getManeuverIndex } from '../game/engine';

interface ControlPanelProps {
  onSelectManeuver: (maneuver: Maneuver) => void;
  disabled: boolean;
  enemyIntention?: string | null;
  isAIEnabled: boolean;
  onToggleAI: () => void;
  playerFaction: Faction;
  currentPage: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onSelectManeuver,
  disabled,
  enemyIntention,
  isAIEnabled,
  onToggleAI,
  playerFaction,
  currentPage
}) => {
  const renderManeuverBtn = (maneuver: Maneuver, icon: string, label: string, extraClass: string = '') => {
    const mIdx = getManeuverIndex(maneuver);
    const pageArray = bookData[playerFaction]?.[currentPage] || bookData[playerFaction]?.[String(currentPage)];
    const destPage = pageArray ? pageArray[mIdx] : null;

    // Lógica de cores: Vermelho se for para 223, caso contrário Azul (ou âmbar para destaque)
    const iconColor = destPage === 223 ? 'var(--color-hud-red)' : '#00aaff';

    return (
      <button
        className={`control-btn ${extraClass}`}
        onClick={() => onSelectManeuver(maneuver)}
        disabled={disabled}
        title={`${maneuver}: ${destPage || '?'}`}
      >
        <div className="btn-content">
          <div className="main-info">
            <span className="icon" style={{ color: iconColor, textShadow: `0 0 5px ${iconColor}44` }}>{icon}</span>
            <span className="text">{label}</span>
          </div>
          <div className="dest-page">
            {destPage !== null ? destPage : '---'}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="glass-panel control-panel-container">
      <div className="hud-text label sticky-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.2rem 1rem' }}>
        <span style={{ fontSize: '0.6rem', opacity: 0.5 }}>MANEUVER DECK (26)</span>
        <div
          onClick={onToggleAI}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            padding: '2px 8px',
            borderRadius: '4px',
            background: isAIEnabled ? 'rgba(0, 255, 102, 0.05)' : 'rgba(255, 51, 51, 0.05)',
            border: `1px solid ${isAIEnabled ? 'var(--color-hud-green)' : 'var(--color-hud-red)'}`,
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isAIEnabled ? 'var(--color-hud-green)' : 'var(--color-hud-red)' }} />
          <span style={{ fontSize: '0.5rem', color: isAIEnabled ? 'var(--color-hud-green)' : 'var(--color-hud-red)', fontWeight: 'bold' }}>
            {isAIEnabled ? 'AI ACTIVE' : 'AI OFF'}
          </span>
        </div>
      </div>

      <div className="maneuver-deck">
        {enemyIntention && (
          <div className="hud-text amber tailing-warning">
            TAILING ADVANTAGE! ENEMY INTENDS: {enemyIntention.toUpperCase()}
          </div>
        )}
        
        <div className="speed-frames-container">
          {/* --- SLOW (LENTAS) --- */}
          <div className="speed-frame slow">
            <div className="speed-label">SLOW</div>
            <div className="direction-groups">
              <div className="dir-group left">
                <div className="dir-label">L</div>
                {renderManeuverBtn('TurnLeftSlow', '↰', 'L')}
                {renderManeuverBtn('HardTurnLeftSlow', '↶', 'HL')}
                {renderManeuverBtn('SlipLeftSlow', '↖', 'SL')}
              </div>
              <div className="dir-group straight">
                <div className="dir-label">S</div>
                {renderManeuverBtn('StraightSlow', '↑', 'STR')}
                {renderManeuverBtn('StraightLeftSlow', '↑↰', 'SL')}
                {renderManeuverBtn('StraightRightSlow', '↑↱', 'SR')}
              </div>
              <div className="dir-group right">
                <div className="dir-label">R</div>
                {renderManeuverBtn('TurnRightSlow', '↱', 'R')}
                {renderManeuverBtn('HardTurnRightSlow', '↷', 'HR')}
                {renderManeuverBtn('SlipRightSlow', '↗', 'SR')}
              </div>
            </div>
          </div>

          {/* --- CRUISING (MÉDIAS) --- */}
          <div className="speed-frame cruising">
            <div className="speed-label">CRUISING</div>
            <div className="direction-groups">
              <div className="dir-group left">
                <div className="dir-label">L</div>
                {renderManeuverBtn('TurnLeftCruising', '↰', 'L')}
                {renderManeuverBtn('HardTurnLeftCruising', '↶', 'HL')}
                {renderManeuverBtn('SlipLeftCruising', '↖', 'SL')}
              </div>
              <div className="dir-group straight specials">
                <div className="dir-label">S</div>
                {renderManeuverBtn('StraightCruising', '↑', 'STR')}
                {renderManeuverBtn('Immelmann', '⤾', 'IMM')}
                {renderManeuverBtn('BarrelRollLeft', '⟲', 'RL')}
                {renderManeuverBtn('BarrelRollRight', '⟳', 'RR')}
              </div>
              <div className="dir-group right">
                <div className="dir-label">R</div>
                {renderManeuverBtn('TurnRightCruising', '↱', 'R')}
                {renderManeuverBtn('HardTurnRightCruising', '↷', 'HR')}
                {renderManeuverBtn('SlipRightCruising', '↗', 'SR')}
              </div>
            </div>
          </div>

          {/* --- FAST (RÁPIDAS) --- */}
          <div className="speed-frame fast">
            <div className="speed-label">FAST</div>
            <div className="direction-groups">
              <div className="dir-group left">
                <div className="dir-label">L</div>
                {renderManeuverBtn('TurnLeftFast', '↰', 'L')}
                {renderManeuverBtn('BanksLeftFast', '⇖', 'BL')}
              </div>
              <div className="dir-group straight">
                <div className="dir-label">S</div>
                {renderManeuverBtn('StraightFast', '↑', 'STR')}
                {renderManeuverBtn('StraightLeftFast', '↑↖', 'SL')}
                {renderManeuverBtn('StraightRightFast', '↑↗', 'SR')}
              </div>
              <div className="dir-group right">
                <div className="dir-label">R</div>
                {renderManeuverBtn('TurnRightFast', '↱', 'R')}
                {renderManeuverBtn('BanksRightFast', '⇗', 'BR')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
