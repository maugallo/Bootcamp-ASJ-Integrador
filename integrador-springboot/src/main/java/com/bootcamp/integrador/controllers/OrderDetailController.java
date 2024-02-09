package com.bootcamp.integrador.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.integrador.ErrorHandler;
import com.bootcamp.integrador.models.OrderDetail;
import com.bootcamp.integrador.services.OrderDetailService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/order-details")
public class OrderDetailController {

	@Autowired
	OrderDetailService orderDetailService;
	
	@GetMapping()
	public ResponseEntity<List<OrderDetail>> getOrderDetails() {
		return new ResponseEntity<List<OrderDetail>>(orderDetailService.geOrderDetails(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<OrderDetail> getOrderDetailById(@PathVariable Integer id){
		return new ResponseEntity<OrderDetail>(orderDetailService.getOrderDetailById(id), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<String> createOrderDetail(@Valid @RequestBody OrderDetail orderDetail, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(orderDetailService.createOrderDetail(orderDetail), HttpStatus.OK);
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateOrderDetail(@PathVariable Integer id  ,@Valid @RequestBody OrderDetail orderDetail, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(orderDetailService.updateOrderDetail(id, orderDetail), HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteOrderDetail(@PathVariable Integer id){
		return new ResponseEntity<>(orderDetailService.deleteOrderDetail(id), HttpStatus.OK);
	}
	
}
