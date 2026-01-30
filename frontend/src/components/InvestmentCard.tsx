import React from 'react';
import { Investment } from '../types/investment';
import { AssetTypeLabels } from '../types/investment';

interface InvestmentCardProps {
  investment: Investment;
  onEdit: (investment: Investment) => void;
  onDelete: (id: number) => void;
  onUpdatePrice: (id: number) => void;
}

export const InvestmentCard: React.FC<InvestmentCardProps> = ({
  investment,
  onEdit,
  onDelete,
  onUpdatePrice,
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  const formatPercentage = (value: number) => {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  const getBadgeClass = (type: string) => {
    const typeLower = type.toLowerCase().replace('_', '-');
    return `badge badge-${typeLower}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'STOCK': return '📈';
      case 'CRYPTO': return '₿';
      case 'FUND': return '📊';
      case 'FIXED_INCOME': return '💼';
      default: return '📁';
    }
  };

  return (
    <div className="card card-hover" style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: '2px solid #e2e8f0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Barra de cor no topo */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: investment.profitLoss >= 0
          ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
          : 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{getTypeIcon(investment.type)}</span>
            <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.5rem', fontWeight: '700' }}>
              {investment.symbol}
            </h3>
            <span className={getBadgeClass(investment.type)}>
              {AssetTypeLabels[investment.type]}
            </span>
          </div>
          <p style={{ color: '#64748b', margin: 0, fontSize: '1rem' }}>{investment.name}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => onEdit(investment)} 
            style={{ 
              padding: '0.625rem 1.25rem', 
              fontSize: '0.875rem',
              borderRadius: '8px',
            }}
          >
            ✏️ Editar
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => onDelete(investment.id)} 
            style={{ 
              padding: '0.625rem 1.25rem', 
              fontSize: '0.875rem',
              borderRadius: '8px',
            }}
          >
            🗑️ Excluir
          </button>
        </div>
      </div>

      <div className="grid grid-2" style={{ marginBottom: '1.5rem' }}>
        <div style={{
          padding: '1rem',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}>
          <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
            Quantidade
          </p>
          <p style={{ fontWeight: '700', color: '#1e293b', margin: 0, fontSize: '1.125rem' }}>
            {investment.quantity.toLocaleString('pt-BR')}
          </p>
        </div>
        <div style={{
          padding: '1rem',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}>
          <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
            Data de Compra
          </p>
          <p style={{ fontWeight: '700', color: '#1e293b', margin: 0, fontSize: '1.125rem' }}>
            {formatDate(investment.purchaseDate)}
          </p>
        </div>
        <div style={{
          padding: '1rem',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}>
          <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
            Preço de Compra
          </p>
          <p style={{ fontWeight: '700', color: '#1e293b', margin: 0, fontSize: '1.125rem' }}>
            {formatCurrency(investment.purchasePrice)}
          </p>
        </div>
        <div style={{
          padding: '1rem',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}>
          <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
            Preço Atual
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between' }}>
            <p style={{ fontWeight: '700', color: '#1e293b', margin: 0, fontSize: '1.125rem' }}>
              {formatCurrency(investment.currentPrice)}
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => onUpdatePrice(investment.id)}
              style={{ 
                padding: '0.375rem 0.75rem', 
                fontSize: '0.75rem',
                borderRadius: '6px',
              }}
            >
              🔄
            </button>
          </div>
        </div>
      </div>

      {/* Seção de resultados */}
      <div style={{ 
        padding: '1.5rem', 
        background: investment.profitLoss >= 0
          ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
          : 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
        borderRadius: '12px',
        border: `2px solid ${investment.profitLoss >= 0 ? '#bbf7d0' : '#fecaca'}`,
      }}>
        <div className="grid grid-3">
          <div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
              Valor Atual
            </p>
            <p style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#1e293b', margin: 0 }}>
              {formatCurrency(investment.currentValue)}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
              Lucro/Prejuízo
            </p>
            <p style={{
              fontWeight: 'bold',
              fontSize: '1.25rem',
              color: investment.profitLoss >= 0 ? '#10b981' : '#ef4444',
              margin: 0,
            }}>
              {formatCurrency(investment.profitLoss)}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0 0 0.5rem 0', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>
              Rentabilidade
            </p>
            <p style={{
              fontWeight: 'bold',
              fontSize: '1.25rem',
              color: investment.profitLossPercentage >= 0 ? '#10b981' : '#ef4444',
              margin: 0,
            }}>
              {formatPercentage(investment.profitLossPercentage)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
