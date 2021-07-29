package com.stockmarket.StockMarket.model;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FusionChartModel {

	private Date label;
	private float value;
}
