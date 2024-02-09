package com.bootcamp.integrador.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.exceptions.ObjectNotFoundException;
import com.bootcamp.integrador.models.Product;
import com.bootcamp.integrador.repositories.ProductRepository;
import com.bootcamp.integrador.specification.ProductSpecification;

@Service
public class ProductService {

	@Autowired
	ProductRepository productRepository;
	
	//GET METHODS:
	public List<Product> getProducts(ProductSpecification productSpecification){
		return productRepository.findAll(productSpecification);
	}
	
	public Product getProductById(Integer id){
		return productRepository.findById(id)
				.orElseThrow(() -> new ObjectNotFoundException("No se pudo encontrar el producto solicitado con id " + id));
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
		Product product = this.getProductById(id);
		
		product.setIsEnabled(!product.getIsEnabled());
		productRepository.save(product);
		return product.getIsEnabled() ? "Producto agregado correctamente" : "Producto eliminado correctamente";
	}
	
	//VALIDATION METHODS:
	public Boolean existsBySku(String sku) {
		return productRepository.existsBySku(sku);
	}
	
}
