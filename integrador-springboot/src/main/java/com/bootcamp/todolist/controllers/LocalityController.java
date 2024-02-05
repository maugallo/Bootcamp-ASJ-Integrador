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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.todolist.ErrorHandler;
import com.bootcamp.todolist.models.Locality;
import com.bootcamp.todolist.services.LocalityService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/localities")
public class LocalityController {

	@Autowired
	LocalityService localityService;
	
	@GetMapping()
	public ResponseEntity<List<Locality>> getLocalities() {
		return new ResponseEntity<List<Locality>>(localityService.getLocalities(), HttpStatus.OK);
	}
	
	@GetMapping("/province/{provinceId}")
	public ResponseEntity<List<Locality>> getLocalitiesByProvinceId(@PathVariable Integer provinceId) {
		return new ResponseEntity<List<Locality>>(localityService.getLocalitiesByProvinceId(provinceId), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Locality> getLocalityById(@PathVariable Integer id){
		return new ResponseEntity<Locality>(localityService.getLocalityById(id), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<String> createLocality(@Valid @RequestBody Locality locality, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(localityService.createLocality(locality), HttpStatus.OK);
		}
	}
	
}
