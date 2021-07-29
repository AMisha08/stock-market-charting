package com.stockmarket.StockMarket.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockmarket.StockMarket.entity.StockPrice;

public interface StockPriceRepository extends JpaRepository<StockPrice,Long>{
	List<StockPrice> findByCompanyName(String name);
	List<StockPrice> findByCompanyCode(String code);
}
