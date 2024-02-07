package com.bootcamp.integrador.specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.bootcamp.integrador.models.Category;
import com.bootcamp.integrador.models.Product;
import com.bootcamp.integrador.models.Provider;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class ProductSpecification implements Specification<Product> {

	 private String titleOrDescription;
	 private String category;
	 private Integer idProvider;
	 private Boolean isEnabled;
	
	public ProductSpecification(String titleOrDescription, String category, Integer idProvider, Boolean isEnabled) {
		
		this.titleOrDescription = titleOrDescription;
		this.category = category;
		this.idProvider = idProvider;
		this.isEnabled = isEnabled;
	}

	@Override
	public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		
		List<Predicate> predicates = new ArrayList<Predicate>();
		
		if (StringUtils.hasText(titleOrDescription)) { // p.title LIKE %:titleOrDescription%
			
			Predicate hasTitle = criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%".concat(titleOrDescription.toLowerCase()).concat("%"));
			Predicate hasDescription = criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), "%".concat(titleOrDescription.toLowerCase()).concat("%"));
			
			predicates.add(criteriaBuilder.or(hasTitle, hasDescription));
		}
		
		Join<Product, Category> productCategoryJoin = root.join("category"); // JOIN p.category c
		if (StringUtils.hasText(category)) { // c.name LIKE %:category%
			Predicate hasCategory = criteriaBuilder.like(productCategoryJoin.get("name"), "%".concat(category).concat("%"));
			predicates.add(hasCategory);
		}
		
		Join<Product, Provider> productProviderJoin = root.join("provider");
		if (idProvider != null && idProvider != 0) {
			Predicate hasProviderId = criteriaBuilder.equal(productProviderJoin.get("id"), idProvider);
			predicates.add(hasProviderId);
		}
		
		if (isEnabled != null) {
			Predicate hasIsEnabled = criteriaBuilder.equal(root.get("isEnabled"), isEnabled);
			predicates.add(hasIsEnabled);
		}
		
		query.orderBy(criteriaBuilder.asc(root.get("title")));
		
		Predicate[] arrayPredicates = predicates.toArray( new Predicate[predicates.size()] ); //SELECT p FROM Provider p WHERE predicate AND predicate AND predicate ORDER by p.title
		
		return criteriaBuilder.and(arrayPredicates);
	}
	
}
