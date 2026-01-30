import React from 'react';
import { Summary } from '../types/investment';
import { AssetTypeLabels, AssetType } from '../types/investment';

interface SummaryCardProps {
  summary: Summary;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ summary }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div>
      {/* Cards principais de resumo */}
      <div className="grid grid-4" style={{ marginBottom: '2rem' }}>
        <div className="card card-hover" style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          border: '2px solid #e2e8f0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}>
              💵
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
                Total Investido
              </p>
              <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
                {formatCurrency(summary.totalInvested)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card card-hover" style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
          border: '2px solid #bbf7d0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}>
              📈
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
                Valor Atual
              </p>
              <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>
                {formatCurrency(summary.currentTotalValue)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card card-hover" style={{
          background: summary.totalProfitLoss >= 0 
            ? 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)'
            : 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
          border: summary.totalProfitLoss >= 0 ? '2px solid #bbf7d0' : '2px solid #fecaca',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: summary.totalProfitLoss >= 0
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}>
              {summary.totalProfitLoss >= 0 ? '📊' : '📉'}
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
                Lucro/Prejuízo
              </p>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                color: summary.totalProfitLoss >= 0 ? '#10b981' : '#ef4444',
                margin: 0,
              }}>
                {formatCurrency(summary.totalProfitLoss)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="card card-hover" style={{
          background: summary.totalProfitLossPercentage >= 0 
            ? 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)'
            : 'linear-gradient(135deg, #fef2f2 0%, #ffffff 100%)',
          border: summary.totalProfitLossPercentage >= 0 ? '2px solid #bbf7d0' : '2px solid #fecaca',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: summary.totalProfitLossPercentage >= 0
                ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
            }}>
              %
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
                Rentabilidade
              </p>
              <p style={{
                fontSize: '1.75rem',
                fontWeight: 'bold',
                color: summary.totalProfitLossPercentage >= 0 ? '#10b981' : '#ef4444',
                margin: 0,
              }}>
                {formatPercentage(summary.totalProfitLossPercentage)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Distribuição por tipo */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '2px solid #e2e8f0',
      }}>
        <h2 style={{ 
          marginBottom: '1.5rem', 
          color: '#1e293b',
          fontSize: '1.5rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span>📊</span> Distribuição por Tipo de Ativo
        </h2>
        <div className="grid grid-2">
          {Object.entries(summary.totalByType)
            .filter(([_, value]) => value > 0)
            .map(([type, value]) => (
            <div key={type} style={{ 
              padding: '1.5rem', 
              background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', 
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: type === 'STOCK' ? '#3b82f6' :
                             type === 'CRYPTO' ? '#f59e0b' :
                             type === 'FUND' ? '#10b981' :
                             type === 'FIXED_INCOME' ? '#a855f7' : '#64748b',
                }} />
                <p style={{ fontWeight: '700', color: '#1e293b', margin: 0, fontSize: '1.125rem' }}>
                  {AssetTypeLabels[type as AssetType]}
                </p>
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Investido
                </p>
                <p style={{ fontSize: '1.25rem', fontWeight: '600', color: '#1e293b', margin: '0.25rem 0 0 0' }}>
                  {formatCurrency(value)}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Valor Atual
                </p>
                <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#10b981', margin: '0.25rem 0 0 0' }}>
                  {formatCurrency(summary.currentValueByType[type as AssetType] || 0)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
