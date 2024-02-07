package com.bootcamp.integrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.exceptions.ObjectNotFoundException;
import com.bootcamp.integrador.models.OrderDetail;
import com.bootcamp.integrador.repositories.OrderDetailRepository;

@Service
public class OrderDetailService {

	@Autowired
	OrderDetailRepository orderDetailRepository;
	
	public List<OrderDetail> geOrderDetails(){
		return orderDetailRepository.findAll();
	}
	
	public Optional<OrderDetail> getOrderDetailById(Integer id){
		return orderDetailRepository.findById(id);
	}
	
	public String createOrderDetail(OrderDetail orderDetail) {
		orderDetailRepository.save(orderDetail);
		return "Detalle de orden creado correctamente";
	}
	
	public String updateOrderDetail(Integer id, OrderDetail updatedOrderDetail) {
		orderDetailRepository.save(updatedOrderDetail);
		return "Detalle de orden actualizado correctamente";
	}
	
	public String deleteOrderDetail(Integer id) {
		Optional<OrderDetail> optionalOrderDetail = orderDetailRepository.findById(id);
		if (optionalOrderDetail.isPresent()) {
			OrderDetail orderDetail = optionalOrderDetail.get();
			orderDetailRepository.delete(orderDetail);
			return "Detalle de orden eliminado correctamente";
		} else {
			throw new ObjectNotFoundException("No se pudo encontrar el detalle de orden solicitado con id: " + id);
		}
	}
	
}
