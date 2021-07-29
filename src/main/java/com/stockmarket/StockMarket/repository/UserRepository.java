package com.stockmarket.StockMarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockmarket.StockMarket.entity.Users;

public interface UserRepository extends JpaRepository<Users,Long>{
	Users findByName(String name);
}
