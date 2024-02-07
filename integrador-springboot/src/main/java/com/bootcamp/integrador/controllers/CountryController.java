package com.bootcamp.integrador.controllers;

import java.util.List;

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

import com.bootcamp.integrador.ErrorHandler;
import com.bootcamp.integrador.models.Country;
import com.bootcamp.integrador.services.CountryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/countries")
public class CountryController {

	@Autowired
	CountryService countryService;
	
	@GetMapping()
	public ResponseEntity<List<Country>> getCountries() {
		return new ResponseEntity<List<Country>>(countryService.getCountries(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Country> getCountryById(@PathVariable Integer id){
		return new ResponseEntity<Country>(countryService.getCountryById(id), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<String> createCountry(@Valid @RequestBody Country country, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(countryService.createCountry(country), HttpStatus.OK);
		}
	}
	
}
