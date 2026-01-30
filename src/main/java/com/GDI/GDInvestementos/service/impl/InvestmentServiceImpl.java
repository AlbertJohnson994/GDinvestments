package com.GDI.GDInvestementos.service.impl;

import com.GDI.GDInvestementos.model.dto.InvestmentRequestDTO;
import com.GDI.GDInvestementos.model.dto.InvestmentResponseDTO;
import com.GDI.GDInvestementos.model.dto.SummaryDTO;
import com.GDI.GDInvestementos.model.entity.Investment;
import com.GDI.GDInvestementos.model.enums.AssetType;
import com.GDI.GDInvestementos.repository.InvestmentRepository;
import com.GDI.GDInvestementos.service.InvestmentService;
import com.GDI.GDInvestementos.service.MarketDataService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class InvestmentServiceImpl implements InvestmentService {
    
    private final InvestmentRepository investmentRepository;
    private final MarketDataService marketDataService;
    private final ModelMapper modelMapper;
    
    @Override
    public InvestmentResponseDTO createInvestment(InvestmentRequestDTO requestDTO) {
        log.info("Criando novo investimento: {}", requestDTO.getSymbol());
        
        // Cria o investimento manualmente para garantir mapeamento correto
        Investment investment = Investment.builder()
                .type(requestDTO.getType())
                .symbol(requestDTO.getSymbol().toUpperCase().trim())
                .name(requestDTO.getName().trim())
                .quantity(requestDTO.getQuantity())
                .purchasePrice(requestDTO.getPurchasePrice())
                .purchaseDate(requestDTO.getPurchaseDate())
                .build();
        
        // Busca preço atual do mercado
        try {
            BigDecimal currentPrice = marketDataService.getCurrentPrice(
                investment.getSymbol(), 
                investment.getType()
            );
            investment.setCurrentPrice(currentPrice);
        } catch (Exception e) {
            log.warn("Erro ao buscar preço de mercado para {}: {}. Usando preço de compra como fallback.", 
                    investment.getSymbol(), e.getMessage());
            investment.setCurrentPrice(requestDTO.getPurchasePrice());
        }
        
        Investment savedInvestment = investmentRepository.save(investment);
        log.info("Investimento criado com ID: {}", savedInvestment.getId());
        
        return mapToResponseDTO(savedInvestment);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<InvestmentResponseDTO> getAllInvestments() {
        log.info("Buscando todos os investimentos");
        return investmentRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<InvestmentResponseDTO> getInvestmentsByType(AssetType type) {
        log.info("Buscando investimentos por tipo: {}", type);
        return investmentRepository.findByType(type)
                .stream()
                .map(this::mapToResponseDTO)
                .toList();
    }
    
    @Override
    @Transactional(readOnly = true)
    public InvestmentResponseDTO getInvestmentById(Long id) {
        log.info("Buscando investimento por ID: {}", id);
        Investment investment = findInvestmentById(id);
        return mapToResponseDTO(investment);
    }
    
    @Override
    public InvestmentResponseDTO updateInvestment(Long id, InvestmentRequestDTO requestDTO) {
        log.info("Atualizando investimento ID: {}", id);
        
        Investment investment = findInvestmentById(id);
        
        // Atualiza apenas os campos permitidos
        investment.setType(requestDTO.getType());
        investment.setSymbol(requestDTO.getSymbol().toUpperCase().trim());
        investment.setName(requestDTO.getName().trim());
        investment.setQuantity(requestDTO.getQuantity());
        investment.setPurchasePrice(requestDTO.getPurchasePrice());
        investment.setPurchaseDate(requestDTO.getPurchaseDate());
        
        // Mantém o preço atual se não for fornecido
        if (investment.getCurrentPrice() == null) {
            BigDecimal currentPrice = marketDataService.getCurrentPrice(
                investment.getSymbol(), 
                investment.getType()
            );
            investment.setCurrentPrice(currentPrice);
        }
        
        Investment updatedInvestment = investmentRepository.save(investment);
        log.info("Investimento ID: {} atualizado", id);
        
        return mapToResponseDTO(updatedInvestment);
    }
    
    @Override
    public void deleteInvestment(Long id) {
        log.info("Deletando investimento ID: {}", id);
        
        if (!investmentRepository.existsById(id)) {
            throw new EntityNotFoundException("Investimento não encontrado com ID: " + id);
        }
        
        investmentRepository.deleteById(id);
        log.info("Investimento ID: {} deletado", id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public SummaryDTO getSummary() {
        log.info("Gerando resumo da carteira");
        
        List<Investment> investments = investmentRepository.findAll();
        int assetCount = investments.size();
        
        // Calcula total investido
        BigDecimal totalInvested = investments.stream()
                .map(i -> i.getPurchasePrice().multiply(i.getQuantity()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        // Calcula valor atual total
        BigDecimal currentTotalValue = investments.stream()
                .map(Investment::getCurrentValue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        // Calcula lucro/prejuízo total
        BigDecimal totalProfitLoss = currentTotalValue.subtract(totalInvested);
        
        // Calcula porcentagem de lucro/prejuízo
        BigDecimal totalProfitLossPercentage = BigDecimal.ZERO;
        if (totalInvested.compareTo(BigDecimal.ZERO) > 0) {
            totalProfitLossPercentage = totalProfitLoss
                    .divide(totalInvested, 4, RoundingMode.HALF_UP)
                    .multiply(BigDecimal.valueOf(100));
        }
        
        // Agrupa por tipo
        Map<AssetType, BigDecimal> totalByType = Arrays.stream(AssetType.values())
                .collect(Collectors.toMap(
                        type -> type,
                        type -> investments.stream()
                                .filter(i -> i.getType() == type)
                                .map(i -> i.getPurchasePrice().multiply(i.getQuantity()))
                                .reduce(BigDecimal.ZERO, BigDecimal::add)
                ));
        
        Map<AssetType, BigDecimal> currentValueByType = Arrays.stream(AssetType.values())
                .collect(Collectors.toMap(
                        type -> type,
                        type -> investments.stream()
                                .filter(i -> i.getType() == type)
                                .map(Investment::getCurrentValue)
                                .reduce(BigDecimal.ZERO, BigDecimal::add)
                ));
        
        return SummaryDTO.builder()
                .totalInvested(totalInvested)
                .currentTotalValue(currentTotalValue)
                .totalProfitLoss(totalProfitLoss)
                .totalProfitLossPercentage(totalProfitLossPercentage)
                .totalByType(totalByType)
                .currentValueByType(currentValueByType)
                .assetCount(assetCount)
                .build();
    }
    
    @Override
    public InvestmentResponseDTO updateMarketPrice(Long id, BigDecimal currentPrice) {
        log.info("Atualizando preço de mercado para investimento ID: {}", id);
        
        Investment investment = findInvestmentById(id);
        investment.setCurrentPrice(currentPrice);
        
        Investment updatedInvestment = investmentRepository.save(investment);
        log.info("Preço de mercado atualizado para investimento ID: {}", id);
        
        return mapToResponseDTO(updatedInvestment);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<InvestmentResponseDTO> searchInvestments(String symbol, String name) {
        log.info("Buscando investimentos com símbolo: {}, nome: {}", symbol, name);
        
        List<Investment> investments;
        
        if (symbol != null && !symbol.isBlank()) {
            investments = investmentRepository.findBySymbolContainingIgnoreCase(symbol);
        } else if (name != null && !name.isBlank()) {
            investments = investmentRepository.findByNameContainingIgnoreCase(name);
        } else {
            investments = investmentRepository.findAll();
        }
        
        return investments.stream()
                .map(this::mapToResponseDTO)
                .toList();
    }
    
    private Investment findInvestmentById(Long id) {
        return investmentRepository.findById(id)
                .orElseThrow(() -> {
                    log.error("Investimento não encontrado com ID: {}", id);
                    return new EntityNotFoundException("Investimento não encontrado com ID: " + id);
                });
    }
    
    private InvestmentResponseDTO mapToResponseDTO(Investment investment) {
        InvestmentResponseDTO dto = modelMapper.map(investment, InvestmentResponseDTO.class);
        dto.setCurrentValue(investment.getCurrentValue());
        dto.setProfitLoss(investment.getProfitLoss());
        dto.setProfitLossPercentage(investment.getProfitLossPercentage());
        return dto;
    }
}
