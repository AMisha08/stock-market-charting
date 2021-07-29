package com.stockmarket.StockMarket.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stockmarket.StockMarket.entity.Company;
import com.stockmarket.StockMarket.entity.IPODetail;
import com.stockmarket.StockMarket.entity.Sector;
import com.stockmarket.StockMarket.entity.Stockexchange;
import com.stockmarket.StockMarket.jwt.AuthenticationRequest;
import com.stockmarket.StockMarket.jwt.AuthenticationResponse;
import com.stockmarket.StockMarket.jwt.JwtUtil;
import com.stockmarket.StockMarket.jwt.MyUserDetailService;
import com.stockmarket.StockMarket.model.CompanyModel;
import com.stockmarket.StockMarket.service.CompanyService;

@RestController
@CrossOrigin
public class CompanyController {

	@Autowired
	CompanyService companyService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private MyUserDetailService userDetailsService;

	@Autowired
	private JwtUtil jwtUtil;

	@PostMapping("/authenticate")
	public AuthenticationResponse createAuthenticationToken(
			@RequestBody AuthenticationRequest authenticationRequest)
			throws Exception {

		try {
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(
							authenticationRequest.getUsername(),
							authenticationRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}

		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());

		final String jwt = jwtUtil.generateToken(userDetails);
		return new AuthenticationResponse(jwt, userDetails.getUsername(),
				userDetails.getAuthorities().toString());
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PostMapping("/companies")
	public Company newCompany(@RequestBody CompanyModel req) {
		return companyService.saveCompany(req);
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PatchMapping("/companies")
	public Company companyModel(@RequestBody CompanyModel req) {
		return companyService.saveCompany(req);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
	@GetMapping("/companies")
	public List<Company> allCompanies() {
		return companyService.getAllCompanies();
	}

	@PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
	@GetMapping("/companies/{name}")
	public Company companyByName(@PathVariable String name) {
		return companyService.getCompanyByName(name);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
	@GetMapping("/companies/sector/{name}")
	public Sector companySectorByName(@PathVariable String name) {
		return companyService.getCompanySectorByName(name);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
	@GetMapping("/companies/stockexchanges/{name}")
	public List<Stockexchange> companySEByName(@PathVariable String name) {
		return companyService.getCompanyStockExchangeByName(name);
	}

	@PreAuthorize("hasAnyRole('ROLE_USER','ROLE_ADMIN')")
	@GetMapping("/companies/ipo/{name}")
	public IPODetail companyIPOByName(@PathVariable String name) {
		return companyService.getCompanyIPOByName(name);
	}

}
