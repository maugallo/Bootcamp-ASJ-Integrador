package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer>{

}
