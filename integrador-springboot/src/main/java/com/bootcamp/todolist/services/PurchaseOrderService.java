package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.models.PurchaseOrder;
import com.bootcamp.todolist.repositories.PurchaseOrderRepository;

@Service
public class PurchaseOrderService {

	@Autowired
	PurchaseOrderRepository purchaseOrderRepository;
	
	public List<PurchaseOrder> getPurchaseOrders(){
		return purchaseOrderRepository.findAll();
	}
	
	public Optional<PurchaseOrder> getPurchaseOrderById(Integer id){
		return purchaseOrderRepository.findById(id);
	}
	
	public String createPurchaseOrder(PurchaseOrder purchaseOrder) {
		try {
			purchaseOrderRepository.save(purchaseOrder);
			return "Purchase order created correctly";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error creating the purchase order";
		}
	}
	
	public String updatePurchaseOrder(Integer id, PurchaseOrder updatedPurchaseOrder) {
		try {
			purchaseOrderRepository.save(updatedPurchaseOrder);
			return "Purchase order updated correctly";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error updating the purchase order";
		}
	}
	
	public String logicalDeletePurchaseOrder(Integer id) {
		try {
			Optional<PurchaseOrder> optionalPurchaseOrder = purchaseOrderRepository.findById(id);
			
			if (optionalPurchaseOrder.isPresent()) {
				PurchaseOrder purchaseOrder = optionalPurchaseOrder.get();
				purchaseOrder.setIsEnabled(false);
				purchaseOrderRepository.save(purchaseOrder);
				return "Purchase order deleted correctly";
			} else {
				return "Purchase order doesn't exist";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "Error deleting the purchase order";
		}
	}
	
}
