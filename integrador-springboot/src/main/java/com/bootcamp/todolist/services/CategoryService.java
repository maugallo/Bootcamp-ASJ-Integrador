package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.models.Category;
import com.bootcamp.todolist.repositories.CategoryRepository;

@Service
public class CategoryService {

	@Autowired
	CategoryRepository categoryRepository;
	
	public List<Category> getCategories(){
		return categoryRepository.findAll();
	}
	
	public List<Category> getEnabledCategories(){
		return categoryRepository.findByIsEnabledTrue();
	}
	
	public Optional<Category> getCategoryById(Integer id){
		return categoryRepository.findById(id);
	}
	
	public String createCategory(Category category) {
		try {
			categoryRepository.save(category);
			return "Category created correctly";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error creating the category";
		}
	}
	
	public String updateCategory(Integer id, Category updatedCategory) {
		try {
			categoryRepository.save(updatedCategory);
			return "Category updated correctly";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error updating the category";
		}
	}
	
	public String logicalDeleteCategory(Integer id) {
		try {
			Optional<Category> optionalCategory = categoryRepository.findById(id);
			
			if (optionalCategory.isPresent()) {
				Category category = optionalCategory.get();
				category.setIsEnabled(false);
				categoryRepository.save(category);
				return "Category deleted correctly";
			} else {
				return "Category doesn't exist";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "Error deleting the category";
		}
	}
	
}
