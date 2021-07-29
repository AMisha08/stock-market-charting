package com.stockmarket.StockMarket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stockmarket.StockMarket.entity.Company;
import com.stockmarket.StockMarket.entity.CompanyStockExchangeMap;
import com.stockmarket.StockMarket.entity.Stockexchange;
import com.stockmarket.StockMarket.model.CompanyCodeModel;
import com.stockmarket.StockMarket.repository.CompanystockexchangemapRepository;
import com.stockmarket.StockMarket.service.CompanyService;
import com.stockmarket.StockMarket.service.StockexchangeService;

@RestController
@CrossOrigin
public class CompanystockexchangemapController {

	@Autowired
	CompanyService companyServcie;

	@Autowired
	StockexchangeService stockexchangeService;

	@Autowired
	CompanystockexchangemapRepository companystockexchangemapRepository;

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PostMapping("/map")
	public CompanyStockExchangeMap mapCompanyStockexchange(
			@RequestBody CompanyCodeModel map) {
		Company c = companyServcie.getCompanyByName(map.getCompanyname());
		Stockexchange s = stockexchangeService
				.getStockexchangeByName(map.getStockexchangename());
		CompanyStockExchangeMap csm = new CompanyStockExchangeMap();
		csm.setCompany(c);
		csm.setStockexchange(s);
		csm.setCompanyCode(map.getCompanyCode());
		return companystockexchangemapRepository.save(csm);
	}
}
