package com.bootcamp.integrador.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.exceptions.ObjectNotFoundException;
import com.bootcamp.integrador.models.Category;
import com.bootcamp.integrador.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;
	
	//GET METHODS:
	public List<Category> getCategories(Boolean isEnabled){
		return categoryRepository.findByIsEnabled(isEnabled);
	}
	
	public Category getCategoryById(Integer id){
		return categoryRepository.findById(id)
				.orElseThrow(() -> new ObjectNotFoundException("No se pudo encontrar la categoría solicitada con id " + id));
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
		Category category = this.getCategoryById(id);
		
		category.setIsEnabled(!category.getIsEnabled());
		categoryRepository.save(category);
		return category.getIsEnabled() ? "Categoría agregada correctamente" : "Categoría eliminada correctamente";
	}
	
	//VALIDATE METHOD:
	public Boolean existsByName(String name) {
		return categoryRepository.existsByNameIgnoreCase(name);
	}
}
