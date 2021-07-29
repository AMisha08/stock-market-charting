package com.stockmarket.StockMarket.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "CompanyStockExchangeMap")
public class CompanyStockExchangeMap {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;	

	@NonNull
	private String companyCode;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private Company company;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private Stockexchange stockexchange;
	
}

