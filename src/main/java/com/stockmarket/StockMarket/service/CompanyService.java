package com.stockmarket.StockMarket.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockmarket.StockMarket.entity.Company;
import com.stockmarket.StockMarket.entity.CompanyStockExchangeMap;
import com.stockmarket.StockMarket.entity.IPODetail;
import com.stockmarket.StockMarket.entity.Sector;
import com.stockmarket.StockMarket.entity.Stockexchange;
import com.stockmarket.StockMarket.model.CompanyModel;
import com.stockmarket.StockMarket.repository.CompanyRepository;

@Service
public class CompanyService {

	@Autowired
	CompanyRepository companyRepo;

	@Autowired
	SectorService sectorService;

	public Company saveCompany(CompanyModel req) {
		Company c = new Company(req.getCompany());
		try {
			Sector s = sectorService.getSectorById(req.getSectorId());
			c.setSector(s);
		} catch (Exception e) {
			System.out.println(e);
		}
		return companyRepo.save(c);
	}

	public List<Company> getAllCompanies() {
		return companyRepo.findAll();
	}

	public Company getCompanyByName(String name) {
		return companyRepo.findByName(name);
	}

	public Sector getCompanySectorByName(String name) {
		Company c = companyRepo.findByName(name);
		return new Sector(c.getSector());
	}

	public List<Stockexchange> getCompanyStockExchangeByName(String name) {
		Company c = companyRepo.findByName(name);
		List<Stockexchange> sel = new ArrayList<Stockexchange>();
		List<CompanyStockExchangeMap> map = c.getCompstockmap();
		for (CompanyStockExchangeMap companyStockExchangeMap : map) {
			sel.add(new Stockexchange(
					companyStockExchangeMap.getStockexchange()));
		}
		return sel;
	}

	public IPODetail getCompanyIPOByName(String name) {
		Company c = companyRepo.findByName(name);
		return c.getIpo();
	}

}
