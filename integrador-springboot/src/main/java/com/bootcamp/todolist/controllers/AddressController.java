package com.bootcamp.todolist.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.todolist.ErrorHandler;
import com.bootcamp.todolist.models.Address;
import com.bootcamp.todolist.services.AddressService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/addresses")
public class AddressController {

	@Autowired
	AddressService addressService;
	
	@GetMapping()
	public ResponseEntity<List<Address>> getProducts() {
		return new ResponseEntity<List<Address>>(addressService.getAddresses(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Address>> getAddressById(@PathVariable Integer id){
		return new ResponseEntity<Optional<Address>>(addressService.getAddressById(id), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<Address> createAddress(@Valid @RequestBody Address address, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(addressService.createAddress(address), HttpStatus.OK);
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateAddress(@PathVariable Integer id  ,@Valid @RequestBody Address address, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(addressService.updateAddress(id, address), HttpStatus.OK);
		}
	}
	
}
