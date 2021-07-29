package com.stockmarket.StockMarket.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "StockMarketUser")
public class Users {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NonNull
	private String name;
	
	@NonNull
	private String password;
	
	@NonNull
	private String email;
	
	@NonNull
	private Boolean confirmed;
	
	@NonNull
	private Boolean admin;
	
	@NonNull
	private String role;		
}
