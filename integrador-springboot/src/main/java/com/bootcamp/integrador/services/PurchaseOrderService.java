package com.bootcamp.integrador.services;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.exceptions.ObjectNotFoundException;
import com.bootcamp.integrador.models.OrderStatus;
import com.bootcamp.integrador.models.PurchaseOrder;
import com.bootcamp.integrador.repositories.PurchaseOrderRepository;

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
		return purchaseOrderRepository.findByStatus(orderStatus);
	}
	
	public PurchaseOrder getPurchaseOrderById(Integer id){
		return purchaseOrderRepository.findById(id)
				.orElseThrow(() -> new ObjectNotFoundException("No se pudo encontrar la orden de compra solicitada con id: " + id));
	}
	
	//CREATE METHOD:
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
	@Transactional
	public String updatePurchaseOrder(Integer id, PurchaseOrder updatedPurchaseOrder) {
		PurchaseOrder oldPurchaseOrder = this.getPurchaseOrderById(id);
		
		Set<Integer> updatedDetailIds = updatedPurchaseOrder.getDetails().stream()
				.map((detail) -> detail.getId())
				.collect(Collectors.toSet());
		
		//Delete the order details that are not being used anymore:
		oldPurchaseOrder.getDetails().forEach(detail -> {
			if (!updatedDetailIds.contains(detail.getId())) {
				orderDetailService.deleteOrderDetail(detail.getId());
			}
		});
		
		//Update & add order details:
		updatedPurchaseOrder.getDetails().forEach((updatedDetail) -> {
			orderDetailService.updateOrderDetail(updatedDetail.getId(), updatedDetail);
		});
		
		//Update the order:
		purchaseOrderRepository.save(updatedPurchaseOrder);
		
		return "Orden de compra actualizada correctamente";
	}
	
	//UPDATE ORDER STATUS METHOD:
	public String updatePurchaseOrderStatus(Integer id, String orderStatus) {
		PurchaseOrder purchaseOrder = this.getPurchaseOrderById(id);
		
		purchaseOrder.setStatus(OrderStatus.valueOf(orderStatus));
		purchaseOrderRepository.save(purchaseOrder);
		return "Estado de orden modificado correctamente";
	}
}
