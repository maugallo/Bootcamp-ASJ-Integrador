package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.Locality;

public interface LocalityRepository extends JpaRepository<Locality, Integer> {
}
