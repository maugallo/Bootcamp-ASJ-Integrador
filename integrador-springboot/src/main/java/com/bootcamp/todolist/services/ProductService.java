package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.exceptions.ObjectNotFoundException;
import com.bootcamp.todolist.models.Product;
import com.bootcamp.todolist.repositories.ProductRepository;
import com.bootcamp.todolist.specification.ProductSpecification;

@Service
public class ProductService {

	@Autowired
	ProductRepository productRepository;
	
	//GET METHODS:
	public List<Product> getProducts(ProductSpecification productSpecification){
		return productRepository.findAll(productSpecification);
	}
	
	public Product getProductById(Integer id){
		Optional<Product> product = productRepository.findById(id);
		if (product.isPresent()) {
			return product.get();
		} else {
			throw new ObjectNotFoundException("No se pudo encontrar el producto solicitado con id " + id);
		}
	}
	
	//CREATE METHOD:
	public String createProduct(Product product) {
		productRepository.save(product);
		return "Producto creado correctamente";
	}
	
	//UPDATE METHOD:
	public String updateProduct(Integer id, Product updatedProduct) {
		productRepository.save(updatedProduct);
		return "Producto actualizado correctamente";
	}
	
	//DELETE & RECOVER METHOD:
	public String toggleIsEnabled(Integer id) {
		Optional<Product> optProduct = productRepository.findById(id);
		if (optProduct.isPresent()) {
			Product product = optProduct.get();
			product.setIsEnabled(!product.getIsEnabled());
			productRepository.save(product);
			return product.getIsEnabled() ? "Producto agregado correctamente" : "Producto eliminado correctamente";
		} else {
			throw new ObjectNotFoundException("No se pudo encontrar el producto solicitado con id: " + id);
		}
	}
	
	//VALIDATION METHODS:
	public Boolean existsBySku(String sku) {
		return productRepository.existsBySku(sku);
	}
	
}
