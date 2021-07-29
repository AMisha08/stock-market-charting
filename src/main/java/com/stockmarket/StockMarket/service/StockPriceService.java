package com.stockmarket.StockMarket.service;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockmarket.StockMarket.entity.Company;
import com.stockmarket.StockMarket.entity.CompanyStockExchangeMap;
import com.stockmarket.StockMarket.entity.StockPrice;
import com.stockmarket.StockMarket.repository.CompanystockexchangemapRepository;
import com.stockmarket.StockMarket.repository.StockPriceRepository;

@Service
public class StockPriceService {

	@Autowired
	EntityManager em;

	@Autowired
	StockPriceRepository stockpriceRepo;

	@Autowired
	CompanyService companyService;

	@Autowired
	CompanystockexchangemapRepository mapRepo;

	public StockPrice addStockPrice(StockPrice req) {

		List<CompanyStockExchangeMap> maps = mapRepo
				.findByCompanyCode(req.getCompanyCode());
		req.setCompany(maps.get(0).getCompany());
		req.setCompanyName(req.getCompany().getName());
		return stockpriceRepo.save(req);
	}

	public List<StockPrice> getAllStockprice() {
		return stockpriceRepo.findAll();
	}

	public List<StockPrice> getStockpriceOfCompanyByName(String name) {
		Company c = companyService.getCompanyByName(name);
		String ccode = "00" + c.getId();
		TypedQuery<StockPrice> query = em.createQuery(
				"select s from StockPrice s where s.companyCode=:compcode",
				StockPrice.class).setParameter("compcode", ccode);
		List<StockPrice> resultList = query.getResultList();
		return resultList;
		// return stockpriceRepo.findByCompanyname(name);
	}

	public List<StockPrice> getStockpriceOfCompanyByNamePeriod(String name,
			Date sdate, Time stime, Date edate, Time etime) {
		Company c = companyService.getCompanyByName(name);
		String ccode = "00" + c.getId();
		if (sdate.after(edate)) {
			return List.of();
		}
		if (!sdate.equals(edate)) {
			System.out.println("DIFFERENT");
			TypedQuery<StockPrice> query = em.createQuery(
					"select s from StockPrice s where s.companyCode=:compcode and ((s.stockPriceDate>:sdate and s.stockPriceDate<:edate) or (s.stockPriceDate=:sdate and s.stockPriceTime>=:stime) or (s.stockPriceDate=:edate and s.stockPriceTime<=:etime))",
					StockPrice.class).setParameter("compcode", ccode)
					.setParameter("sdate", sdate).setParameter("stime", stime)
					.setParameter("edate", edate).setParameter("etime", etime);
			List<StockPrice> resultList = query.getResultList();
			return resultList;
		} else if (!stime.after(etime)) {
			System.out.println("SAME");
			TypedQuery<StockPrice> query = em.createQuery(
					"select s from StockPrice s where s.companyCode=:compcode and s.stockPriceDate=:sdate and s.stockPriceTime>=:stime and s.stockPriceTime<=:etime",
					StockPrice.class).setParameter("compcode", ccode)
					.setParameter("sdate", sdate).setParameter("stime", stime)
					.setParameter("etime", etime);
			List<StockPrice> resultList = query.getResultList();
			return resultList;
		}
		return List.of();
		// return stockpriceRepo.findByCompanyname(name);
	}

	public List<StockPrice> getStockpriceOfCompanyByCode(String code) {
		return stockpriceRepo.findByCompanyCode(code);
	}

	public List<StockPrice> getStockpriceOfCompanyByCodePeriod(String code,
			Date sdate, Time stime, Date edate, Time etime) {
		if (sdate.after(edate)) {
			return List.of();
		}
		if (!sdate.equals(edate)) {
			System.out.println("DIFFERENT");
			TypedQuery<StockPrice> query = em.createQuery(
					"select s from StockPrice s where s.companyCode=:code and ((s.stockPriceDate>:sdate and s.stockPriceDate<:edate) or (s.stockPriceDate=:sdate and s.stockPriceTime>=:stime) or (s.stockPriceDate=:edate and s.stockPriceTime<=:etime))",
					StockPrice.class).setParameter("code", code)
					.setParameter("sdate", sdate).setParameter("stime", stime)
					.setParameter("edate", edate).setParameter("etime", etime);
			List<StockPrice> resultList = query.getResultList();
			return resultList;
		} else if (!stime.after(etime)) {
			System.out.println("SAME");
			TypedQuery<StockPrice> query = em.createQuery(
					"select s from StockPrice s where s.companyCode=:code and s.stockPriceDate=:sdate and s.stockPriceTime>=:stime and s.stockPriceTime<=:etime",
					StockPrice.class).setParameter("code", code)
					.setParameter("sdate", sdate).setParameter("stime", stime)
					.setParameter("etime", etime);
			List<StockPrice> resultList = query.getResultList();
			return resultList;
		}
		return List.of();
	}

}
