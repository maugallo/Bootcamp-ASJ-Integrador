package com.bootcamp.todolist.controllers;

import java.util.List;
import java.util.Optional;

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

import com.bootcamp.todolist.ErrorHandler;
import com.bootcamp.todolist.models.PurchaseOrder;
import com.bootcamp.todolist.services.PurchaseOrderService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/purchase-orders")
public class PurchaseOrderController {

	@Autowired
	PurchaseOrderService purchaseOrderService;
	
	@GetMapping()
	public ResponseEntity<List<PurchaseOrder>> getPurchaseOrders() {
		return new ResponseEntity<List<PurchaseOrder>>(purchaseOrderService.getPurchaseOrders(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<PurchaseOrder>> getpurchaseOrderServiceById(@PathVariable Integer id){
		return new ResponseEntity<Optional<PurchaseOrder>>(purchaseOrderService.getPurchaseOrderById(id), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<String> createPurchaseOrder(@Valid @RequestBody PurchaseOrder purchaseOrder, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(purchaseOrderService.createPurchaseOrder(purchaseOrder), HttpStatus.OK);
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updatePurchaseOrder(@PathVariable Integer id  ,@Valid @RequestBody PurchaseOrder purchaseOrder, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(purchaseOrderService.updatePurchaseOrder(id, purchaseOrder), HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> logicalDeletePurchaseOrder(@PathVariable Integer id){
		return new ResponseEntity<>(purchaseOrderService.logicalDeletePurchaseOrder(id), HttpStatus.OK);
	}
	
}