package com.bootcamp.integrador.specification;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.bootcamp.integrador.models.Provider;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class ProviderSpecification implements Specification<Provider> {

	private String companyNameOrCode;
	private Boolean isEnabled;
	
	public ProviderSpecification(String companyNameOrCode, Boolean isEnabled) {
		this.companyNameOrCode = companyNameOrCode;
		this.isEnabled = isEnabled;
	}

	@Override
	public Predicate toPredicate(Root<Provider> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		
		List<Predicate> predicates = new ArrayList<Predicate>();
		
		if (StringUtils.hasText(companyNameOrCode)) {
			Predicate hasCompanyName = criteriaBuilder.like(criteriaBuilder.lower(root.get("companyName")), "%".concat(companyNameOrCode.toLowerCase()).concat("%"));
			Predicate hasCode = criteriaBuilder.equal(root.get("code"), companyNameOrCode);
			
			predicates.add(criteriaBuilder.or(hasCompanyName, hasCode));
		}
		
		if (isEnabled != null) {
			Predicate hasIsEnabled = criteriaBuilder.equal(root.get("isEnabled"), isEnabled);
			predicates.add(hasIsEnabled);
		}
		
		Predicate[] arrayPredicates = predicates.toArray(new Predicate[predicates.size()] );
		
		return criteriaBuilder.and(arrayPredicates);
	}

}
