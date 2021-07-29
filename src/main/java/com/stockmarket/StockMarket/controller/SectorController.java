package com.stockmarket.StockMarket.controller;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stockmarket.StockMarket.entity.Company;
import com.stockmarket.StockMarket.entity.Sector;
import com.stockmarket.StockMarket.model.FusionChartModel;
import com.stockmarket.StockMarket.service.SectorService;

@RestController
@CrossOrigin
public class SectorController {

	@Autowired
	SectorService sectorService;

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PostMapping("/sectors")
	public Sector newSector(@RequestBody Sector req) {
		return sectorService.saveSector(req);
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PatchMapping("/sectors")
	public Sector updateSector(@RequestBody Sector req) {
		return sectorService.saveSector(req);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
	@GetMapping("/sectors")
	public List<Sector> allSectors() {
		return sectorService.getAllSectors();
	}

	@PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
	@GetMapping("/sectors/{id}")
	public Sector sectorById(@PathVariable long id) {
		return sectorService.getSectorById(id);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
	@GetMapping("/sectors/companies/{id}")
	public List<Company> allComapniesInSector(@PathVariable long id) {
		return sectorService.getAllComapniesInSector(id);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
	@GetMapping("/sectors/analyses/{id}/{sdate}/{stime}/{edate}/{etime}")
	public List<FusionChartModel> stockAnalyses(@PathVariable Long id,
			@PathVariable Date sdate, @PathVariable Time stime,
			@PathVariable Date edate, @PathVariable Time etime) {
		return sectorService.getSectorAnalyses(id, sdate, stime, edate, etime);
	}
}
