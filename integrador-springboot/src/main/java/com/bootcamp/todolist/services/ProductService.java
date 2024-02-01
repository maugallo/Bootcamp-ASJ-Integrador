package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.models.Product;
import com.bootcamp.todolist.repositories.ProductRepository;

@Service
public class ProductService {

	@Autowired
	ProductRepository productRepository;
	
	public List<Product> getProducts(){
		return productRepository.findAll();
	}
	
	public Optional<Product> getProductById(Integer id){
		return productRepository.findById(id);
	}
	
	public String createProduct(Product product) {
		try {
			productRepository.save(product);
			return "Product created correctly";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error creating the product";
		}
	}
	
	public String updateProduct(Integer id, Product updatedProduct) {
		try {
			productRepository.save(updatedProduct);
			return "Product updated correctly";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error updating the product";
		}
	}
	
	public String logicalDeleteProduct(Integer id) {
		try {
			Optional<Product> optionalProduct = productRepository.findById(id);
			
			if (optionalProduct.isPresent()) {
				Product product = optionalProduct.get();
				product.setIsEnabled(false);
				productRepository.save(product);
				return "Product deleted correctly";
			} else {
				return "Product doesn't exist";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "Error deleting the product";
		}
	}
	
}
