package com.stockmarket.StockMarket.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockmarket.StockMarket.entity.Company;
import com.stockmarket.StockMarket.entity.CompanyStockExchangeMap;
import com.stockmarket.StockMarket.entity.Stockexchange;
import com.stockmarket.StockMarket.repository.StockexchangeRepository;

@Service
public class StockexchangeService {

	@Autowired
	StockexchangeRepository stockexchangeRepo;

	public Stockexchange saveStockexchange(Stockexchange req) {
		return stockexchangeRepo.save(req);
	}

	public List<Stockexchange> getAllStockexchanges() {
		return stockexchangeRepo.findAll();
	}

	public Stockexchange getStockexchangeById(long id) {
		return stockexchangeRepo.findById(id).get();
	}

	public Stockexchange getStockexchangeByName(String name) {
		return stockexchangeRepo.findByName(name);
	}

	public List<Company> getStockexchangeCompaniesById(long id) {
		Stockexchange s = stockexchangeRepo.findById(id).get();
		List<Company> cl = new ArrayList<Company>();
		List<CompanyStockExchangeMap> map = s.getCompstockmap();
		for (CompanyStockExchangeMap companyStockExchangeMap : map) {
			cl.add(new Company(companyStockExchangeMap.getCompany()));
		}
		return cl;
	}

	public List<Company> getStockexchangeCompaniesByName(String name) {
		Stockexchange s = stockexchangeRepo.findByName(name);
		List<Company> cl = new ArrayList<Company>();
		List<CompanyStockExchangeMap> map = s.getCompstockmap();
		for (CompanyStockExchangeMap companyStockExchangeMap : map) {
			cl.add(new Company(companyStockExchangeMap.getCompany()));
		}
		return cl;
	}

}
