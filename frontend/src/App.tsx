import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { InvestmentList } from './components/InvestmentList';
import './styles/index.css';

import { Footer } from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'investments'>('dashboard');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-primary)' }}>
      <header style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        padding: '1.5rem 2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'white',
              boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)',
            }}>
              💰
            </div>
            <div>
              <h1 style={{ 
                color: '#1e293b', 
                margin: 0, 
                fontSize: '1.75rem',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                GD Investimentos
              </h1>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>
                Gerencie sua carteira de investimentos
              </p>
            </div>
          </div>
          <nav style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn"
              onClick={() => setActiveTab('dashboard')}
              style={{
                background: activeTab === 'dashboard' 
                  ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' 
                  : 'rgba(241, 245, 249, 0.8)',
                color: activeTab === 'dashboard' ? 'white' : '#64748b',
                border: activeTab === 'dashboard' ? 'none' : '1px solid #e2e8f0',
                boxShadow: activeTab === 'dashboard' ? '0 4px 6px -1px rgba(37, 99, 235, 0.3)' : 'none',
              }}
            >
              📊 Dashboard
            </button>
            <button
              className="btn"
              onClick={() => setActiveTab('investments')}
              style={{
                background: activeTab === 'investments' 
                  ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' 
                  : 'rgba(241, 245, 249, 0.8)',
                color: activeTab === 'investments' ? 'white' : '#64748b',
                border: activeTab === 'investments' ? 'none' : '1px solid #e2e8f0',
                boxShadow: activeTab === 'investments' ? '0 4px 6px -1px rgba(37, 99, 235, 0.3)' : 'none',
              }}
            >
              📈 Investimentos
            </button>
          </nav>
        </div>
      </header>

      <div className="container" style={{ flex: 1, width: '100%' }}>
        {activeTab === 'dashboard' ? <Dashboard /> : <InvestmentList />}
      </div>

      <Footer />
    </div>
  );
}

export default App;
