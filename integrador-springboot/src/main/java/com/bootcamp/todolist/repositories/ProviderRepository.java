package com.bootcamp.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.bootcamp.todolist.models.Provider;

public interface ProviderRepository extends JpaRepository<Provider, Integer>, JpaSpecificationExecutor<Provider> {	
	Boolean existsByCode(String code);
	Boolean existsByCuit(String cuit);
	Boolean existsByCompanyNameIgnoreCase(String companyName);
}
