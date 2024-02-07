package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.Country;

public interface CountryRepository extends JpaRepository<Country, Integer> {

}
