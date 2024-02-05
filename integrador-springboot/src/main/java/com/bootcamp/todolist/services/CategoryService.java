package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.exceptions.ObjectNotFoundException;
import com.bootcamp.todolist.models.Category;
import com.bootcamp.todolist.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;
	
	//GET METHODS:
	public List<Category> getCategories(Boolean isEnabled){
		return categoryRepository.findByIsEnabled(isEnabled);
	}
	
	public Category getCategoryById(Integer id){
		Optional<Category> category = categoryRepository.findById(id);
		if (category.isPresent()) {
			return category.get();
		} else {
			throw new ObjectNotFoundException("No se pudo encontrar la categoría solicitada con id " + id);
		}
	}
	
	//CREATE METHOD:
	public String createCategory(Category category) {
		categoryRepository.save(category);
		return "Categoría agregada correctamente";
	}
	
	//UPDATE METHOD:
	public String updateCategory(Integer id, Category updatedCategory) {
		categoryRepository.save(updatedCategory);
		return "Categoría actualizada correctamente";
	}
	
	//DELETE & RECOVER METHOD:
	public String toggleIsEnabled(Integer id) {
		Optional<Category> optCategory = categoryRepository.findById(id);
		
		if (optCategory.isPresent()) {
			Category category = optCategory.get();
			category.setIsEnabled(!category.getIsEnabled());
			categoryRepository.save(category);
			return category.getIsEnabled() ? "Categoría agregada correctamente" : "Categoría eliminada correctamente";
		} else {
			throw new ObjectNotFoundException("No se pudo encontrar la categoría solicitada con id: " + id);
		}
	}
	
	//VALIDATE METHOD:
	public Boolean existsByName(String name) {
		return categoryRepository.existsByNameIgnoreCase(name);
	}
}
