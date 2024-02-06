package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.models.OrderDetail;
import com.bootcamp.todolist.repositories.OrderDetailRepository;

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
		try {
			orderDetailRepository.save(updatedOrderDetail);
			return "Order detail updated correctly";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error updating the order detail";
		}
	}
	
	public String deleteOrderDetail(Integer id) {
		try {
			Optional<OrderDetail> optionalOrderDetail = orderDetailRepository.findById(id);
			
			if (optionalOrderDetail.isPresent()) {
				OrderDetail orderDetail = optionalOrderDetail.get();
				//
				orderDetailRepository.delete(orderDetail);
				return "Order detail deleted correctly";
			} else {
				return "Order detail doesn't exist";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "Error deleting the order detail";
		}
	}
	
}
