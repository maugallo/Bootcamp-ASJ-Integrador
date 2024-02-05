package com.bootcamp.todolist.controllers;

import java.util.List;

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
import org.springframework.web.bind.annotation.RequestParam;
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
	
	//GET METHODS:
	@GetMapping()
	public ResponseEntity<List<Category>> getCategories(@RequestParam(required = true) Boolean isEnabled){
		return new ResponseEntity<List<Category>>(categoryService.getCategories(isEnabled), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Category> getCategoryById(@PathVariable Integer id){
		return new ResponseEntity<Category>(categoryService.getCategoryById(id), HttpStatus.OK);
	}
	
	//CREATE METHOD:
	@PostMapping()
	public ResponseEntity<String> createCategory(@Valid @RequestBody Category category, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(ErrorHandler.getErrorMessages(errorList), HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(categoryService.createCategory(category), HttpStatus.OK);
		}
	}
	
	//UPDATE METHOD:
	@PutMapping("/{id}")
	public ResponseEntity<String> updateCategory(@PathVariable Integer id, @Valid @RequestBody Category category, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(ErrorHandler.getErrorMessages(errorList), HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(categoryService.updateCategory(id, category), HttpStatus.OK);
		}
	}
	
	//DELETE & RECOVER METHOD:
	@DeleteMapping("/{id}")
	public ResponseEntity<String> toggleIsEnabled(@PathVariable Integer id){
		return new ResponseEntity<>(categoryService.toggleIsEnabled(id), HttpStatus.OK);
	}
	
	//VALIDATION METHOD:
	@GetMapping("/validate/{name}")
	public ResponseEntity<Boolean> existsByName(@PathVariable String name){
		return new ResponseEntity<>(categoryService.existsByName(name), HttpStatus.OK);
	}
	
}
