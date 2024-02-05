package com.bootcamp.todolist.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.todolist.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	List<Category> findByIsEnabled(Boolean isEnabled);
	
	Boolean existsByNameIgnoreCase(String name);	
}
