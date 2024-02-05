package com.bootcamp.todolist.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.bootcamp.todolist.ErrorHandler;
import com.bootcamp.todolist.models.Provider;
import com.bootcamp.todolist.services.ProviderService;
import com.bootcamp.todolist.specification.ProviderSpecification;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/providers")
public class ProviderController {
	
	@Autowired
	ProviderService providerService;
	
	//GET METHODS:
	@GetMapping()
	public ResponseEntity<List<Provider>> getProviders(
			@RequestParam(required = false) String companyNameOrCode,
			@RequestParam(required = true) Boolean isEnabled) {
		
		ProviderSpecification providerSpecification = new ProviderSpecification(companyNameOrCode, isEnabled);
		
		return new ResponseEntity<List<Provider>>(providerService.getProviders(providerSpecification), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Provider> getProviderByCode(@PathVariable Integer id){
		return new ResponseEntity<Provider>(providerService.getProviderById(id), HttpStatus.OK);
	}
	
	//CREATE METHOD:
	@PostMapping()
	public ResponseEntity<String> createProvider(@Valid @RequestBody Provider provider, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(ErrorHandler.getErrorMessages(errorList), HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(providerService.createProvider(provider), HttpStatus.OK);
		}
	}
	
	//UPDATE METHOD:
	@PutMapping("/{id}")
	public ResponseEntity<String> updateProvider(@PathVariable Integer id  ,@Valid @RequestBody Provider provider, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(ErrorHandler.getErrorMessages(errorList), HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(providerService.updateProvider(id, provider), HttpStatus.OK);
		}
	}
	
	//DELETE & RECOVER METHOD:
	@DeleteMapping("/{id}")
	public ResponseEntity<String> toggleIsEnabled(@PathVariable Integer id){
		return new ResponseEntity<>(providerService.toggleIsEnabled(id), HttpStatus.OK);
	}
	
	//VALIDATION METHODS:
	@GetMapping("/validate")
	public ResponseEntity<Boolean> existsByParameter(@RequestParam String type, @RequestParam String value){
		switch (type.toLowerCase()) {
		case "code": {
			return new ResponseEntity<>(providerService.existsByCode(value), HttpStatus.OK);
		}
		case "cuit": {
			return new ResponseEntity<>(providerService.existsByCuit(value), HttpStatus.OK);
		}
		case "companyname": {
			return new ResponseEntity<>(providerService.existsByCompanyName(value), HttpStatus.OK);
		}
		default:
			throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Tipo de dato inválido: " + type);
		}
	}
}
