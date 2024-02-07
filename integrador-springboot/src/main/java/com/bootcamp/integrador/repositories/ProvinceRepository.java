package com.bootcamp.integrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bootcamp.integrador.models.Province;

public interface ProvinceRepository extends JpaRepository<Province, Integer> {
	@Query(value = "SELECT * FROM provinces WHERE country_id = :countryId", nativeQuery = true)
	List<Province> findByCountryId(@Param("countryId") Integer countryId);
}
