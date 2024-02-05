package com.bootcamp.todolist.specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.bootcamp.todolist.models.Category;
import com.bootcamp.todolist.models.Product;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class ProductSpecification implements Specification<Product> {

	 private String titleOrDescription;
	 private String category;
	 private Boolean isEnabled;
	
	public ProductSpecification(String titleOrDescription, String category, Boolean isEnabled) {
		
		this.titleOrDescription = titleOrDescription;
		this.category = category;
		this.isEnabled = isEnabled;
	}

	@Override
	public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		
		List<Predicate> predicates = new ArrayList<Predicate>();
		
		if (StringUtils.hasText(titleOrDescription)) { //IF TRUE THEN WE ARE CREATING A QUERY --> p.title LIKE %:titleOrDescription%
			
			Predicate hasTitle = criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%".concat(titleOrDescription.toLowerCase()).concat("%"));
			Predicate hasDescription = criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), "%".concat(titleOrDescription.toLowerCase()).concat("%"));
			
			predicates.add(criteriaBuilder.or(hasTitle, hasDescription));
		}
		
		Join<Product, Category> productCategoryJoin = root.join("category"); // QUERY --> JOIN p.category c
		if (StringUtils.hasText(category)) { // IF TRUE THEN WE ARE CREATING A QUERY --> c.name LIKE %:category%
			Predicate hasCategory = criteriaBuilder.like(productCategoryJoin.get("name"), "%".concat(category).concat("%"));
			predicates.add(hasCategory);
		}
		
		if (isEnabled != null) {
			Predicate hasIsEnabled = criteriaBuilder.equal(root.get("isEnabled"), isEnabled);
			predicates.add(hasIsEnabled);
		}
		
		Predicate[] arrayPredicates = predicates.toArray( new Predicate[predicates.size()] );
		
		return criteriaBuilder.and(arrayPredicates);
	}
	
}