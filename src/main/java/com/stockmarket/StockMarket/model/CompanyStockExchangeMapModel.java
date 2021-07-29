package com.stockmarket.StockMarket.model;

import com.stockmarket.StockMarket.entity.Company;
import com.stockmarket.StockMarket.entity.CompanyStockExchangeMap;
import com.stockmarket.StockMarket.entity.Stockexchange;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyStockExchangeMapModel {
	Company company;
	Stockexchange stockExchange;
	String CompanyCode;

	public CompanyStockExchangeMapModel(CompanyStockExchangeMap c) {
		this.company = new Company(c.getCompany());
		this.stockExchange = new Stockexchange(c.getStockexchange());
		this.CompanyCode = c.getCompanyCode();
	}
}
