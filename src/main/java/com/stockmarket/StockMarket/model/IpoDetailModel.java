package com.stockmarket.StockMarket.model;

import com.stockmarket.StockMarket.entity.IPODetail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IpoDetailModel {
	IPODetail ipo;
	String companyname;
}
