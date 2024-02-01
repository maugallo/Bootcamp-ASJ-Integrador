package com.bootcamp.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.todolist.models.PurchaseOrder;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Integer> {

}
