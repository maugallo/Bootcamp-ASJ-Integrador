package com.bootcamp.todolist.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.todolist.ErrorHandler;
import com.bootcamp.todolist.models.Provider;
import com.bootcamp.todolist.services.ProviderService;

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
	
	@GetMapping()
	public ResponseEntity<List<Provider>> getProviders() {
		return new ResponseEntity<List<Provider>>(providerService.getProviders(), HttpStatus.OK);
	}
	
	@GetMapping("/enabled")
	public ResponseEntity<List<Provider>> getEnabledProviders() {
		return new ResponseEntity<List<Provider>>(providerService.getEnabledProviders(), HttpStatus.OK);
	}
	
	@GetMapping("/disabled")
	public ResponseEntity<List<Provider>> getDisabledProviders() {
		return new ResponseEntity<List<Provider>>(providerService.getDisabledProviders(), HttpStatus.OK);
	}
	
	@GetMapping("/get/{code}")
	public ResponseEntity<Optional<Provider>> getProviderByCode(@PathVariable String code){
		return new ResponseEntity<Optional<Provider>>(providerService.getProviderByCode(code), HttpStatus.OK);
	}
	
	@GetMapping("/validate-code/{code}")
	public ResponseEntity<Boolean> existsByCode(@PathVariable String code){
		return new ResponseEntity<>(providerService.existsByCode(code), HttpStatus.OK);
	}
	
	@GetMapping("/validate-cuit/{cuit}")
	public ResponseEntity<Boolean> existsByCuit(@PathVariable String cuit){
		return new ResponseEntity<>(providerService.existsByCuit(cuit), HttpStatus.OK);
	}
	
	@GetMapping("/validate-companyName/{companyName}")
	public ResponseEntity<Boolean> existsByCompanyName(@PathVariable String companyName){
		return new ResponseEntity<>(providerService.existsByCompanyName(companyName), HttpStatus.OK);
	}
	
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
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateProvider(@PathVariable Integer id  ,@Valid @RequestBody Provider provider, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(providerService.updateProvider(id, provider), HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> logicalDeleteProvider(@PathVariable Integer id){
		return new ResponseEntity<>(providerService.logicalDeleteProvider(id), HttpStatus.OK);
	}
	
}
