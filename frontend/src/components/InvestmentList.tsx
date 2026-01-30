import React, { useState, useEffect } from 'react';
import { Investment, AssetType } from '../types/investment';
import { investmentService } from '../services/api';
import { InvestmentCard } from './InvestmentCard';
import { FilterBar } from './FilterBar';
import { InvestmentForm } from './InvestmentForm';
import { InvestmentRequest } from '../types/investment';

export const InvestmentList: React.FC = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [filteredInvestments, setFilteredInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<AssetType | ''>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | undefined>();

  useEffect(() => {
    loadInvestments();
  }, [selectedType]);

  useEffect(() => {
    filterInvestments();
  }, [searchTerm, investments]);

  const loadInvestments = async () => {
    try {
      setLoading(true);
      const data = selectedType
        ? await investmentService.getAll(selectedType as AssetType)
        : await investmentService.getAll();
      setInvestments(data);
    } catch (error) {
      console.error('Erro ao carregar investimentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterInvestments = async () => {
    if (!searchTerm.trim()) {
      setFilteredInvestments(investments);
      return;
    }

    try {
      const data = await investmentService.search(searchTerm, searchTerm);
      setFilteredInvestments(data);
    } catch (error) {
      console.error('Erro ao buscar investimentos:', error);
      setFilteredInvestments([]);
    }
  };

  const handleSave = async (data: InvestmentRequest) => {
    try {
      if (editingInvestment) {
        await investmentService.update(editingInvestment.id, data);
      } else {
        await investmentService.create(data);
      }
      setShowForm(false);
      setEditingInvestment(undefined);
      loadInvestments();
    } catch (error: any) {
      console.error('Erro ao salvar investimento:', error);
      // O erro será tratado no componente InvestmentForm
      throw error;
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este investimento?')) {
      try {
        await investmentService.delete(id);
        loadInvestments();
      } catch (error) {
        console.error('Erro ao excluir investimento:', error);
        alert('Erro ao excluir investimento');
      }
    }
  };

  const handleUpdatePrice = async (id: number) => {
    const investment = investments.find((inv) => inv.id === id);
    if (!investment) return;

    const newPrice = prompt('Digite o novo preço de mercado:', investment.currentPrice.toString());
    if (newPrice && !isNaN(parseFloat(newPrice))) {
      try {
        await investmentService.updateMarketPrice(id, parseFloat(newPrice));
        loadInvestments();
      } catch (error) {
        console.error('Erro ao atualizar preço:', error);
        alert('Erro ao atualizar preço');
      }
    }
  };

  const handleEdit = (investment: Investment) => {
    setEditingInvestment(investment);
    setShowForm(true);
  };

  const displayInvestments = searchTerm ? filteredInvestments : investments;

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <h1 style={{ 
            color: '#1e293b', 
            margin: 0,
            fontSize: '2rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}>
            <span>📈</span> Meus Investimentos
          </h1>
          <p style={{ color: '#64748b', margin: '0.5rem 0 0 0', fontSize: '1rem' }}>
            Gerencie sua carteira de investimentos
          </p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingInvestment(undefined);
            setShowForm(true);
          }}
          style={{
            fontSize: '1rem',
            padding: '0.875rem 1.75rem',
          }}
        >
          ➕ Novo Investimento
        </button>
      </div>

      <FilterBar
        selectedType={selectedType}
        searchTerm={searchTerm}
        onTypeChange={setSelectedType}
        onSearchChange={setSearchTerm}
      />

      {showForm && (
        <InvestmentForm
          investment={editingInvestment}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setEditingInvestment(undefined);
          }}
        />
      )}

      {loading ? (
        <div className="card text-center" style={{
          padding: '3rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
          <p style={{ color: '#64748b', fontSize: '1.125rem', fontWeight: '600' }}>
            Carregando investimentos...
          </p>
        </div>
      ) : displayInvestments.length === 0 ? (
        <div className="card text-center" style={{
          padding: '3rem',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
          <p style={{ color: '#64748b', fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            Nenhum investimento encontrado.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingInvestment(undefined);
              setShowForm(true);
            }}
          >
            ➕ Criar Primeiro Investimento
          </button>
        </div>
      ) : (
        <div>
          {displayInvestments.map((investment) => (
            <InvestmentCard
              key={investment.id}
              investment={investment}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onUpdatePrice={handleUpdatePrice}
            />
          ))}
        </div>
      )}
    </div>
  );
};
