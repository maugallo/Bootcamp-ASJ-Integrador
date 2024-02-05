package com.bootcamp.todolist.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.todolist.models.Sector;

public interface SectorRepository extends JpaRepository<Sector, Integer> {
	List<Sector> findByIsEnabled(Boolean isEnabled);
	
	Boolean existsByNameIgnoreCase(String name);
}
