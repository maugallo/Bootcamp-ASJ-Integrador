package com.bootcamp.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.todolist.models.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer>{

}
