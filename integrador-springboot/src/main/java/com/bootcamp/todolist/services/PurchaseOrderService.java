package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.exceptions.ObjectNotFoundException;
import com.bootcamp.todolist.models.OrderStatus;
import com.bootcamp.todolist.models.PurchaseOrder;
import com.bootcamp.todolist.repositories.PurchaseOrderRepository;

import jakarta.transaction.Transactional;

@Service
public class PurchaseOrderService {

	@Autowired
	PurchaseOrderRepository purchaseOrderRepository;
	
	@Autowired
	OrderDetailService orderDetailService;
	
	//GET METHODS:
	public List<PurchaseOrder> getPurchaseOrders(){
		return purchaseOrderRepository.findAll();
	}
	
	public List<PurchaseOrder> getPurchaseOrdersByStatus(String status){
		OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
		return purchaseOrderRepository.findByOrderStatus(orderStatus);
	}
	
	public PurchaseOrder getPurchaseOrderById(Integer id){
		Optional<PurchaseOrder> purchaseOrder = purchaseOrderRepository.findById(id);
		if (purchaseOrder.isPresent()) {
			return purchaseOrder.get();
		} else {
			throw new ObjectNotFoundException("No se pudo encontrar la órden de compra solicitada con id: " + id);
		}
	}
	
	//CREATE METHOD: (Transactional)
	@Transactional
	public String createPurchaseOrder(PurchaseOrder purchaseOrder) {
		
		PurchaseOrder savedOrder = purchaseOrderRepository.save(purchaseOrder);
		
		purchaseOrder.getDetails().forEach((detail) -> {
			detail.setPurchaseOrder(savedOrder);
			orderDetailService.createOrderDetail(detail);
		});
		
		return "Orden de compra agregada correctamente";
	}
	
	//UPDATE METHOD:
	public String updatePurchaseOrder(Integer id, PurchaseOrder updatedPurchaseOrder) {
		return null;
	}
	
	//CANCEL METHOD:
	public String cancelPurchaseOrder(Integer id) {
		PurchaseOrder purchaseOrder = this.getPurchaseOrderById(id);
		
		purchaseOrder.setOrderStatus(OrderStatus.CANCELADA);
		purchaseOrderRepository.save(purchaseOrder);
		return "Orden de compra cancelada correctamente";
	}
	
	//VALIDATION METHODS:
	
	
}
