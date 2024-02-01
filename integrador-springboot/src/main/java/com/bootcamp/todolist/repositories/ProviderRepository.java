package com.bootcamp.todolist.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bootcamp.todolist.models.Provider;

public interface ProviderRepository extends JpaRepository<Provider, Integer> {
	List<Provider> findByIsEnabledTrue();
	List<Provider> findByIsEnabledFalse();
	
	Optional<Provider> findByCode(String code);
	
	Boolean existsByCode(String code);
	Boolean existsByCuit(String cuit);
	Boolean existsByCompanyName(String companyName);
	
//	@Query(value = "SELECT p FROM Provider p LEFT JOIN FETCH p.products WHERE p.code = :code") //We use LEFT JOIN FETCH to include in the result the providers who doesn't have any product connected.
//	Optional<Provider> findByCodeWithProductsEager(@Param("code") String code);
//	
//	@Query(value = "SELECT p FROM Provider p JOIN FETCH p.address a JOIN FETCH a.locality loc JOIN FETCH loc.province prov JOIN FETCH prov.country c WHERE p.code = :code")
//	Optional<Provider> findByCodeWithAddressEager(@Param("code") String code);
}
