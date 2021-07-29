package com.stockmarket.StockMarket.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockmarket.StockMarket.entity.CompanyStockExchangeMap;
import com.stockmarket.StockMarket.model.CompanyStockExchangeMapModel;
import com.stockmarket.StockMarket.repository.CompanystockexchangemapRepository;

@RestController
public class MainController {

	@Autowired
	CompanystockexchangemapRepository mapRepo;
	
	@GetMapping("/complete")
	public List<CompanyStockExchangeMapModel> allCompanyStock() {
		List<CompanyStockExchangeMap> all = mapRepo.findAll();
		List<CompanyStockExchangeMapModel> comp = new ArrayList<CompanyStockExchangeMapModel>();
		for (CompanyStockExchangeMap cse : all) {
			comp.add(new CompanyStockExchangeMapModel(cse));
		}
		return comp;
	}
	
}
