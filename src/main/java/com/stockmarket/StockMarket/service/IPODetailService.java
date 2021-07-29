package com.stockmarket.StockMarket.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockmarket.StockMarket.entity.Company;
import com.stockmarket.StockMarket.entity.IPODetail;
import com.stockmarket.StockMarket.model.IpoDetailModel;
import com.stockmarket.StockMarket.repository.IPODetailRepository;

@Service
public class IPODetailService {

	@Autowired
	IPODetailRepository ipoRepo;

	@Autowired
	CompanyService companyService;

	public IPODetail saveIPO(IpoDetailModel req) {
		IPODetail ipo = req.getIpo();
		try {
			Company c = companyService.getCompanyByName(req.getCompanyname());
			ipo.setCompany(c);
		} catch (Exception e) {
			System.out.println(e);
		}
		return ipoRepo.save(ipo);
	}

	public List<IPODetail> getAllIPO() {
		return ipoRepo.findAll();
	}

}
