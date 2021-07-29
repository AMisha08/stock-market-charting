package com.stockmarket.StockMarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockmarket.StockMarket.entity.Stockexchange;

public interface StockexchangeRepository extends JpaRepository<Stockexchange,Long>{
	
	Stockexchange findByName(String name);

}
