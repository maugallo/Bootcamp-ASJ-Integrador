package com.bootcamp.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.todolist.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
