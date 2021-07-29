package com.stockmarket.StockMarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockmarket.StockMarket.entity.IPODetail;


public interface IPODetailRepository extends JpaRepository<IPODetail,Long>{
}
