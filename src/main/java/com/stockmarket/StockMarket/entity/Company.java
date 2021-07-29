package com.stockmarket.StockMarket.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@NamedQuery(name = "Company.findByname", query = "SELECT c FROM Company c WHERE c.name = :name")
@Entity
@Table(name = "Company")
public class Company {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private Double turnover;

	@Column(nullable = false)
	private String ceo;

	@Column(nullable = false)
	@Type(type = "text")
	private String boardOfDirectors;

	@Column(nullable = false)
	@Type(type = "text")
	private String companyBrief;

	@OneToOne(fetch = FetchType.LAZY, mappedBy = "company", cascade = CascadeType.REMOVE)
	@JsonIgnore
	private IPODetail ipo;

	@OneToMany(mappedBy = "company", targetEntity = CompanyStockExchangeMap.class)
	@JsonIgnore
	private List<CompanyStockExchangeMap> compstockmap;

	@ManyToOne(fetch = FetchType.LAZY)
	@JsonIgnore
	private Sector sector;

	@OneToMany(mappedBy = "company", targetEntity = StockPrice.class, fetch = FetchType.LAZY)
	@JsonIgnore
	private List<StockPrice> stockPrices;

	public Company(String name, double turnover, String ceo,
			String boardOfDirectors, String companyBrief) {
		super();
		this.name = name;
		this.turnover = turnover;
		this.ceo = ceo;
		this.boardOfDirectors = boardOfDirectors;
		this.companyBrief = companyBrief;
	}

	public Company(Company c) {
		super();
		this.id = c.getId();
		this.name = c.getName();
		this.turnover = c.getTurnover();
		this.ceo = c.getCeo();
		this.boardOfDirectors = c.getBoardOfDirectors();
		this.companyBrief = c.getCompanyBrief();
	}
}