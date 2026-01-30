import React, { useState, useEffect } from 'react';
import { Summary } from '../types/investment';
import { investmentService } from '../services/api';
import { SummaryCard } from './SummaryCard';

export const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSummary();
    const interval = setInterval(loadSummary, 30000); // Atualiza a cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  const loadSummary = async () => {
    try {
      setError(null);
      const data = await investmentService.getSummary();
      setSummary(data);
    } catch (error) {
      console.error('Erro ao carregar resumo:', error);
      setError('Erro ao carregar resumo da carteira. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card text-center" style={{
        padding: '4rem',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>⏳</div>
        <p style={{ color: '#64748b', fontSize: '1.25rem', fontWeight: '600' }}>
          Carregando resumo da carteira...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card text-center" style={{
        padding: '3rem',
        background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
        border: '2px solid #fecaca',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
        <p style={{ color: '#dc2626', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
          {error}
        </p>
        <button className="btn btn-primary" onClick={loadSummary}>
          🔄 Tentar Novamente
        </button>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="card text-center" style={{
        padding: '3rem',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
        <p style={{ color: '#64748b', fontSize: '1.125rem', fontWeight: '600' }}>
          Nenhum dado disponível.
        </p>
      </div>
    );
  }

  return <SummaryCard summary={summary} />;
};
