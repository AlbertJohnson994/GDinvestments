package com.GDI.GDInvestementos.model.enums;

public enum AssetType {
    STOCK("Ação"),
    CRYPTO("Criptomoeda"),
    FUND("Fundo de Investimento"),
    FIXED_INCOME("Renda Fixa"),
    OTHER("Outro");
    
    private final String description;
    
    AssetType(String description) {
        this.description = description;
    }
    
    public String getDescription() {
        return description;
    }
}
