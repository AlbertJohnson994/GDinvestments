import React, { useState, useEffect } from 'react';
import { Investment, InvestmentRequest, AssetType, AssetTypeLabels } from '../types/investment';

interface InvestmentFormProps {
  investment?: Investment;
  onSave: (data: InvestmentRequest) => Promise<void>;
  onCancel: () => void;
}

export const InvestmentForm: React.FC<InvestmentFormProps> = ({
  investment,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<InvestmentRequest>({
    type: AssetType.STOCK,
    symbol: '',
    name: '',
    quantity: 0,
    purchasePrice: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (investment) {
      setFormData({
        type: investment.type,
        symbol: investment.symbol,
        name: investment.name,
        quantity: investment.quantity,
        purchasePrice: investment.purchasePrice,
        purchaseDate: investment.purchaseDate.split('T')[0],
      });
    }
  }, [investment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSave(formData);
    } catch (err: any) {
      let errorMessage = 'Erro ao salvar investimento';
      
      if (err.response?.data) {
        if (err.response.data.details) {
          // Erros de validação
          const validationErrors = Object.entries(err.response.data.details)
            .map(([field, message]) => `${field}: ${message}`)
            .join(', ');
          errorMessage = `Erro de validação: ${validationErrors}`;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{investment ? 'Editar Investimento' : 'Novo Investimento'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        {error && (
          <div style={{ 
            padding: '1rem 1.25rem', 
            background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)', 
            color: '#dc2626', 
            borderRadius: '12px', 
            marginBottom: '1.5rem',
            border: '2px solid #fecaca',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontWeight: '600',
          }}>
            <span style={{ fontSize: '1.25rem' }}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Tipo de Ativo *</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as AssetType })}
              required
            >
              {Object.entries(AssetTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>Símbolo *</label>
            <input
              type="text"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
              required
              maxLength={20}
            />
          </div>

          <div className="input-group">
            <label>Nome *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              maxLength={100}
            />
          </div>

          <div className="input-group">
            <label>Quantidade *</label>
            <input
              type="number"
              step="0.0001"
              min="0.0001"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>

          <div className="input-group">
            <label>Preço de Compra (R$) *</label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={formData.purchasePrice}
              onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) || 0 })}
              required
            />
          </div>

          <div className="input-group">
            <label>Data de Compra *</label>
            <input
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1 }}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel} style={{ flex: 1 }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
