package com.GDI.GDInvestementos.service;

import com.GDI.GDInvestementos.model.enums.AssetType;

import java.math.BigDecimal;

public interface MarketDataService {
    
    BigDecimal getCurrentPrice(String symbol, AssetType assetType);
    
    void updateAllMarketPrices();
}
