package com.bootcamp.integrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	List<Category> findByIsEnabled(Boolean isEnabled);
	
	Boolean existsByNameIgnoreCase(String name);	
}
