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
import com.bootcamp.integrador.models.Province;
import com.bootcamp.integrador.services.ProvinceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/provinces")
public class ProvinceController {

	@Autowired
	ProvinceService provinceService;
	
	@GetMapping()
	public ResponseEntity<List<Province>> getProvinces() {
		return new ResponseEntity<List<Province>>(provinceService.getProvinces(), HttpStatus.OK);
	}
	
	@GetMapping("/country/{countryId}")
	public ResponseEntity<List<Province>> getProvincesByCountryId(@PathVariable Integer countryId) {
		return new ResponseEntity<List<Province>>(provinceService.getProvicesByCountryId(countryId), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Province> getProvinceById(@PathVariable Integer id){
		return new ResponseEntity<Province>(provinceService.getProvinceById(id), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<String> createProvince(@Valid @RequestBody Province province, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(provinceService.createProvince(province), HttpStatus.OK);
		}
	}
	
}
