package com.GDI.GDInvestementos.repository;

import com.GDI.GDInvestementos.model.entity.Investment;
import com.GDI.GDInvestementos.model.enums.AssetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface InvestmentRepository extends JpaRepository<Investment, Long> {
    
    List<Investment> findByType(AssetType type);
    
    List<Investment> findBySymbolContainingIgnoreCase(String symbol);
    
    List<Investment> findByNameContainingIgnoreCase(String name);
    
    @Query("SELECT i FROM Investment i WHERE i.purchaseDate BETWEEN :startDate AND :endDate")
    List<Investment> findByPurchaseDateBetween(@Param("startDate") LocalDate startDate, 
                                               @Param("endDate") LocalDate endDate);
    
    @Query("SELECT SUM(i.purchasePrice * i.quantity) FROM Investment i")
    Optional<BigDecimal> getTotalInvested();
    
    @Query("SELECT i.type, SUM(i.purchasePrice * i.quantity) " +
           "FROM Investment i GROUP BY i.type")
    List<Object[]> getTotalInvestedByType();
    
    @Query("SELECT COUNT(i) FROM Investment i")
    Long countAllInvestments();
}
