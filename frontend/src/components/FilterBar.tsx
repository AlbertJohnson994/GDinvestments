import React from 'react';
import { AssetType, AssetTypeLabels } from '../types/investment';

interface FilterBarProps {
  selectedType: AssetType | '';
  searchTerm: string;
  onTypeChange: (type: AssetType | '') => void;
  onSearchChange: (term: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedType,
  searchTerm,
  onTypeChange,
  onSearchChange,
}) => {
  return (
    <div className="card" style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '2px solid #e2e8f0',
    }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1', minWidth: '250px' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.75rem',
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: '600',
          }}>
            🔍 Buscar
          </label>
          <input
            type="text"
            placeholder="Buscar por símbolo ou nome..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '1rem',
              background: '#ffffff',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#2563eb';
              e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <div style={{ minWidth: '250px' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.75rem',
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: '600',
          }}>
            📊 Filtrar por Tipo
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as AssetType | '')}
            style={{
              width: '100%',
              padding: '0.875rem 1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '1rem',
              background: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#2563eb';
              e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e2e8f0';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="">Todos os tipos</option>
            {Object.entries(AssetTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
