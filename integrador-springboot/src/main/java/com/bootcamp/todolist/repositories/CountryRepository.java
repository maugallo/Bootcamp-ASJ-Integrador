package com.bootcamp.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.todolist.models.Country;

public interface CountryRepository extends JpaRepository<Country, Integer> {

}
