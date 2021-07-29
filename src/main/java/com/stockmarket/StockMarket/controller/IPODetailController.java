package com.stockmarket.StockMarket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stockmarket.StockMarket.entity.IPODetail;
import com.stockmarket.StockMarket.model.IpoDetailModel;
import com.stockmarket.StockMarket.service.IPODetailService;

@RestController
@CrossOrigin
public class IPODetailController {

	@Autowired
	IPODetailService ipoService;

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PostMapping("/ipo")
	public IPODetail newIPO(@RequestBody IpoDetailModel req) {
		return ipoService.saveIPO(req);
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PatchMapping("/ipo")
	public IPODetail updateIpo(@RequestBody IpoDetailModel req) {
		return ipoService.saveIPO(req);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
	@GetMapping("/ipo")
	public List<IPODetail> allIPO() {
		return ipoService.getAllIPO();
	}
}
