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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.todolist.ErrorHandler;
import com.bootcamp.todolist.models.Sector;
import com.bootcamp.todolist.services.SectorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/sectors")
public class SectorController {

	@Autowired
	SectorService sectorService;
	
	//GET METHODS:
	@GetMapping("")
	public ResponseEntity<List<Sector>> getSectors(@RequestParam(required = true) Boolean isEnabled) {
		return new ResponseEntity<List<Sector>>(sectorService.getSectors(isEnabled), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Sector> getSectorById(@PathVariable Integer id){
		return new ResponseEntity<Sector>(sectorService.getSectorById(id), HttpStatus.OK);
	}
	
	//CREATE METHOD:
	@PostMapping()
	public ResponseEntity<String> createSector(@Valid @RequestBody Sector sector, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(ErrorHandler.getErrorMessages(errorList), HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(sectorService.createSector(sector), HttpStatus.OK);
		}
	}
	
	//UPDATE METHOD:
	@PutMapping("/{id}")
	public ResponseEntity<String> updateSector(@PathVariable Integer id, @Valid @RequestBody Sector sector, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(ErrorHandler.getErrorMessages(errorList), HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(sectorService.updateSector(id, sector), HttpStatus.OK);
		}
	}
	
	//DELETE & RECOVER METHOD:
	@DeleteMapping("/{id}")
	public ResponseEntity<String> toggleIsEnabled(@PathVariable Integer id){
		return new ResponseEntity<>(sectorService.toggleIsEnabled(id), HttpStatus.OK);
	}
	
	//VALIDATION METHOD:
	@GetMapping("/validate/{name}")
	public ResponseEntity<Boolean> existsByName(@PathVariable String name){
		return new ResponseEntity<>(sectorService.existsByName(name), HttpStatus.OK);
	}
	
}
