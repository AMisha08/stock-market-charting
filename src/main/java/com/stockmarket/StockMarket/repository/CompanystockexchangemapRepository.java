package com.stockmarket.StockMarket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockmarket.StockMarket.entity.CompanyStockExchangeMap;


public interface CompanystockexchangemapRepository  extends JpaRepository<CompanyStockExchangeMap,Long> {
	List<CompanyStockExchangeMap> findByCompanyCode(String code);
}
