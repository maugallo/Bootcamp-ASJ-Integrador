package com.bootcamp.integrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bootcamp.integrador.models.Locality;

public interface LocalityRepository extends JpaRepository<Locality, Integer> {
	@Query(value = "SELECT * FROM localities WHERE province_id = :provinceId", nativeQuery = true)
	List<Locality> findByProvinceId(@Param("provinceId") Integer provinceId);
}
