package com.bootcamp.todolist.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.todolist.ErrorHandler;
import com.bootcamp.todolist.models.Category;
import com.bootcamp.todolist.services.CategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/categories")
public class CategoryController {

	@Autowired
	CategoryService categoryService;
	
	@GetMapping()
	public ResponseEntity<List<Category>> getCategories() {
		return new ResponseEntity<List<Category>>(categoryService.getCategories(), HttpStatus.OK);
	}
	
	@GetMapping("/enabled")
	public ResponseEntity<List<Category>> getEnabledCategories() {
		return new ResponseEntity<List<Category>>(categoryService.getEnabledCategories(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Category>> getCategoryById(@PathVariable Integer id){
		return new ResponseEntity<Optional<Category>>(categoryService.getCategoryById(id), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<String> createCategory(@Valid @RequestBody Category category, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(categoryService.createCategory(category), HttpStatus.OK);
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateCategory(@PathVariable Integer id, @Valid @RequestBody Category category, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(categoryService.updateCategory(id, category), HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> logicalDeleteCategory(@PathVariable Integer id){
		return new ResponseEntity<>(categoryService.logicalDeleteCategory(id), HttpStatus.OK);
	}
	
}
