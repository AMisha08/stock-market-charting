package com.stockmarket.StockMarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockmarket.StockMarket.entity.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {

	Company findByName(String name);
}
