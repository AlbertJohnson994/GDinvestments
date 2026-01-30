package com.GDI.GDInvestementos.service;

import com.GDI.GDInvestementos.model.dto.InvestmentRequestDTO;
import com.GDI.GDInvestementos.model.dto.InvestmentResponseDTO;
import com.GDI.GDInvestementos.model.dto.SummaryDTO;
import com.GDI.GDInvestementos.model.enums.AssetType;

import java.math.BigDecimal;
import java.util.List;

public interface InvestmentService {
    
    InvestmentResponseDTO createInvestment(InvestmentRequestDTO requestDTO);
    
    List<InvestmentResponseDTO> getAllInvestments();
    
    List<InvestmentResponseDTO> getInvestmentsByType(AssetType type);
    
    InvestmentResponseDTO getInvestmentById(Long id);
    
    InvestmentResponseDTO updateInvestment(Long id, InvestmentRequestDTO requestDTO);
    
    void deleteInvestment(Long id);
    
    SummaryDTO getSummary();
    
    InvestmentResponseDTO updateMarketPrice(Long id, BigDecimal currentPrice);
    
    List<InvestmentResponseDTO> searchInvestments(String symbol, String name);
}
