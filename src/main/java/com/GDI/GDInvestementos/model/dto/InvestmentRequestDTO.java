package com.GDI.GDInvestementos.model.dto;

import com.GDI.GDInvestementos.model.enums.AssetType;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvestmentRequestDTO {
    
    @NotNull(message = "Tipo do ativo é obrigatório")
    private AssetType type;
    
    @NotBlank(message = "Símbolo é obrigatório")
    @Size(max = 20, message = "Símbolo deve ter no máximo 20 caracteres")
    private String symbol;
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100, message = "Nome deve ter no máximo 100 caracteres")
    private String name;
    
    @NotNull(message = "Quantidade é obrigatória")
    @DecimalMin(value = "0.0001", message = "Quantidade deve ser maior que zero")
    private BigDecimal quantity;
    
    @NotNull(message = "Preço de compra é obrigatório")
    @DecimalMin(value = "0.01", message = "Preço de compra deve ser maior que zero")
    private BigDecimal purchasePrice;
    
    @NotNull(message = "Data de compra é obrigatória")
    @PastOrPresent(message = "Data de compra deve ser no passado ou presente")
    private LocalDate purchaseDate;
}
