package com.GDI.GDInvestementos.controller;

import com.GDI.GDInvestementos.model.dto.InvestmentRequestDTO;
import com.GDI.GDInvestementos.model.dto.InvestmentResponseDTO;
import com.GDI.GDInvestementos.model.dto.SummaryDTO;
import com.GDI.GDInvestementos.model.enums.AssetType;
import com.GDI.GDInvestementos.service.InvestmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/investments")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
@RequiredArgsConstructor
@Tag(name = "Investments", description = "API para gerenciamento de carteira de investimentos")
public class InvestmentController {
    
    private final InvestmentService investmentService;
    
    @PostMapping
    @Operation(summary = "Cadastrar novo ativo na carteira")
    public ResponseEntity<InvestmentResponseDTO> createInvestment(
            @Valid @RequestBody InvestmentRequestDTO requestDTO) {
        InvestmentResponseDTO response = investmentService.createInvestment(requestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    @GetMapping
    @Operation(summary = "Listar todos os ativos da carteira")
    public ResponseEntity<List<InvestmentResponseDTO>> getAllInvestments(
            @RequestParam(required = false) AssetType type) {
        
        List<InvestmentResponseDTO> investments;
        if (type != null) {
            investments = investmentService.getInvestmentsByType(type);
        } else {
            investments = investmentService.getAllInvestments();
        }
        
        return ResponseEntity.ok(investments);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Buscar ativo por ID")
    public ResponseEntity<InvestmentResponseDTO> getInvestmentById(@PathVariable Long id) {
        InvestmentResponseDTO investment = investmentService.getInvestmentById(id);
        return ResponseEntity.ok(investment);
    }
    
    @GetMapping("/search")
    @Operation(summary = "Buscar ativos por símbolo ou nome")
    public ResponseEntity<List<InvestmentResponseDTO>> searchInvestments(
            @RequestParam(required = false) String symbol,
            @RequestParam(required = false) String name) {
        
        List<InvestmentResponseDTO> investments = investmentService.searchInvestments(symbol, name);
        return ResponseEntity.ok(investments);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Atualizar um ativo")
    public ResponseEntity<InvestmentResponseDTO> updateInvestment(
            @PathVariable Long id,
            @Valid @RequestBody InvestmentRequestDTO requestDTO) {
        
        InvestmentResponseDTO updatedInvestment = investmentService.updateInvestment(id, requestDTO);
        return ResponseEntity.ok(updatedInvestment);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Remover um ativo da carteira")
    public ResponseEntity<Void> deleteInvestment(@PathVariable Long id) {
        investmentService.deleteInvestment(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/summary")
    @Operation(summary = "Obter resumo da carteira")
    public ResponseEntity<SummaryDTO> getSummary() {
        SummaryDTO summary = investmentService.getSummary();
        return ResponseEntity.ok(summary);
    }
    
    @PatchMapping("/{id}/market-price")
    @Operation(summary = "Atualizar preço de mercado de um ativo")
    public ResponseEntity<InvestmentResponseDTO> updateMarketPrice(
            @PathVariable Long id,
            @RequestParam BigDecimal currentPrice) {
        
        InvestmentResponseDTO updatedInvestment = investmentService.updateMarketPrice(id, currentPrice);
        return ResponseEntity.ok(updatedInvestment);
    }
}
