package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

}
