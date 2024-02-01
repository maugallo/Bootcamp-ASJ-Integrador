package com.bootcamp.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.todolist.models.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

}
