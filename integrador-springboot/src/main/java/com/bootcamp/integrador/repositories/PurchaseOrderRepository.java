package com.bootcamp.integrador.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.OrderStatus;
import com.bootcamp.integrador.models.PurchaseOrder;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Integer> {
	List<PurchaseOrder> findByStatus(OrderStatus orderStatus);
}
