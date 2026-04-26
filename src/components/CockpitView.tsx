import React from 'react';
import type { GameState } from '../game/engine';
import './CockpitView.css';

interface CockpitViewProps {
  currentState: GameState;
  playerHP: number;
  enemyHP: number;
  pageNumber: number;
}

export const CockpitView: React.FC<CockpitViewProps> = ({ currentState, playerHP, enemyHP, pageNumber }) => {
  // Determine visual cues based on state
  const getEnemyPositionText = () => {
    switch (currentState) {
      case 'Advantage': return 'TARGET IN SIGHT';
      case 'Disadvantage': return 'EVASIVE ACTION REQUIRED';
      case 'HeadOn': return 'WARNING: HEAD-ON APPROACH';
      case 'Neutral': return 'NO CLEAR ADVANTAGE';
      default: return 'UNKNOWN STATE';
    }
  };

  const getStateClass = () => {
    if (currentState === 'Advantage') return 'hud-text green';
    if (currentState === 'Disadvantage') return 'hud-text red';
    if (currentState === 'HeadOn') return 'hud-text amber';
    return 'hud-text';
  };

  return (
    <div className="glass-panel cockpit-container">
      <div className="cockpit-images-container">
        <img 
          src={`/img/g${pageNumber}.png`} 
          onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          onLoad={(e) => { e.currentTarget.style.display = 'block'; }}
          alt={`German view for page ${pageNumber}`}
        />
        <img 
          src={`/img/a${pageNumber}.png`} 
          onError={(e) => { e.currentTarget.style.display = 'none'; }} 
          onLoad={(e) => { e.currentTarget.style.display = 'block'; }}
          alt={`Allied view for page ${pageNumber}`}
        />
      </div>
      <div className="hud-overlay">
        <div className="hud-info top-left">
          <span className="hud-text label">GERMAN INTEGRITY</span>
          <div className="hp-bar">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`hp-segment ${i < playerHP ? 'active' : 'lost'}`}></div>
            ))}
          </div>
        </div>

        <div className="hud-info top-right">
          <span className="hud-text label">ALLIED INTEGRITY</span>
          <div className="hp-bar right">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={`hp-segment ${i < enemyHP ? 'active' : 'lost'}`}></div>
            ))}
          </div>
        </div>

      </div>
      
      {/* Footer Status Bar */}
      <div className="cockpit-footer">
        <div className="status-item">
          <span className="hud-text label">CURRENT LOCATION:</span>
          <span className={`hud-text ${pageNumber === 999 ? 'red' : 'amber'}`} style={{ fontSize: '1.2rem' }}>
            {pageNumber === 999 ? 'ERROR 999' : `PAGE ${pageNumber}`}
          </span>
        </div>
        
        <div className="status-separator"></div>
        
        <div className="status-item">
          <span className="hud-text label">COMBAT STATUS:</span>
          <span className={pageNumber === 999 ? 'hud-text red' : getStateClass()} style={{ fontSize: '1.2rem' }}>
            {pageNumber === 999 ? 'TRANSITION NOT MAPPED' : getEnemyPositionText()}
          </span>
        </div>
      </div>
    </div>
  );
};
