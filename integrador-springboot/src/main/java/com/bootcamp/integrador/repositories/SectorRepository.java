package com.bootcamp.integrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.Sector;

public interface SectorRepository extends JpaRepository<Sector, Integer> {
	List<Sector> findByIsEnabled(Boolean isEnabled);
	
	Boolean existsByNameIgnoreCase(String name);
}
