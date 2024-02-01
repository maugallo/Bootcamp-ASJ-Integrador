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
import com.bootcamp.todolist.models.Product;
import com.bootcamp.todolist.services.ProductService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	ProductService productService;
	
	@GetMapping()
	public ResponseEntity<List<Product>> getProducts() {
		return new ResponseEntity<List<Product>>(productService.getProducts(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Product>> getProductById(@PathVariable Integer id){
		return new ResponseEntity<Optional<Product>>(productService.getProductById(id), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<String> createProduct(@Valid @RequestBody Product product, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(productService.createProduct(product), HttpStatus.OK);
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateProduct(@PathVariable Integer id  ,@Valid @RequestBody Product product, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(productService.updateProduct(id, product), HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> logicalDeleteProduct(@PathVariable Integer id){
		return new ResponseEntity<>(productService.logicalDeleteProduct(id), HttpStatus.OK);
	}
	
}
