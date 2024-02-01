package com.bootcamp.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.todolist.models.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
