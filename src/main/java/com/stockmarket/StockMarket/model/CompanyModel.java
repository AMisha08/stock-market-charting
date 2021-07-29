package com.stockmarket.StockMarket.model;

import com.stockmarket.StockMarket.entity.Company;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyModel {
	Company company;
	long sectorId;
}
