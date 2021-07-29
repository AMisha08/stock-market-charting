package com.stockmarket.StockMarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockmarket.StockMarket.entity.Sector;

public interface SectorRepository extends JpaRepository<Sector,Long>{

}
