package com.GDI.GDInvestementos.model.dto;

import com.GDI.GDInvestementos.model.enums.AssetType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SummaryDTO {
    
    private BigDecimal totalInvested;
    private BigDecimal currentTotalValue;
    private BigDecimal totalProfitLoss;
    private BigDecimal totalProfitLossPercentage;
    private Map<AssetType, BigDecimal> totalByType;
    private Map<AssetType, BigDecimal> currentValueByType;
    private Integer assetCount;
}
