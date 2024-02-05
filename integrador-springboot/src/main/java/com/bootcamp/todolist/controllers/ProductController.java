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
import com.bootcamp.todolist.models.Product;
import com.bootcamp.todolist.repositories.ProductRepository;
import com.bootcamp.todolist.services.ProductService;
import com.bootcamp.todolist.specification.ProductSpecification;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	ProductService productService;
	
	//GET METHODS:
	@GetMapping()
	public ResponseEntity<List<Product>> getProducts(
			@RequestParam(required = false) String titleOrDescription,
			@RequestParam(required = false) String category,
			@RequestParam(required = true) Boolean isEnabled){
		
		ProductSpecification productSpecification = new ProductSpecification(titleOrDescription, category, isEnabled);
		
		return new ResponseEntity<List<Product>>(productService.getProducts(productSpecification), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Product> getProductById(@PathVariable Integer id){
		return new ResponseEntity<Product>(productService.getProductById(id), HttpStatus.OK);
	}
	
	//CREATE METHOD:
	@PostMapping()
	public ResponseEntity<String> createProduct(@Valid @RequestBody Product product, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(ErrorHandler.getErrorMessages(errorList), HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(productService.createProduct(product), HttpStatus.OK);
		}
	}
	
	//UPDATE METHOD:
	@PutMapping("/{id}")
	public ResponseEntity<String> updateProduct(@PathVariable Integer id  ,@Valid @RequestBody Product product, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(ErrorHandler.getErrorMessages(errorList), HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(productService.updateProduct(id, product), HttpStatus.OK);
		}
	}
	
	//DELETE & RECOVER METHOD:
	@DeleteMapping("/{id}")
	public ResponseEntity<String> toggleIsEnabled(@PathVariable Integer id){
		return new ResponseEntity<>(productService.toggleIsEnabled(id), HttpStatus.OK);
	}
	
	//VALIDATION METHODS:
	@GetMapping("/validate/{sku}")
	public ResponseEntity<Boolean> existsBySku(@PathVariable String sku){
		return new ResponseEntity<>(productService.existsBySku(sku), HttpStatus.OK);
	}
	
}
