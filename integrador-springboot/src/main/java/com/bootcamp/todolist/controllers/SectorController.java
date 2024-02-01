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
import com.bootcamp.todolist.models.Sector;
import com.bootcamp.todolist.services.SectorService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/sectors")
public class SectorController {

	@Autowired
	SectorService sectorService;
	
	@GetMapping()
	public ResponseEntity<List<Sector>> getSectors() {
		return new ResponseEntity<List<Sector>>(sectorService.getSectors(), HttpStatus.OK);
	}
	
	@GetMapping("/enabled")
	public ResponseEntity<List<Sector>> getEnabledSectors() {
		return new ResponseEntity<List<Sector>>(sectorService.getEnabledSectors(), HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Sector>> getSectorById(@PathVariable Integer id){
		return new ResponseEntity<Optional<Sector>>(sectorService.getSectorById(id), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<String> createSector(@Valid @RequestBody Sector sector, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(sectorService.createSector(sector), HttpStatus.OK);
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateSector(@PathVariable Integer id, @Valid @RequestBody Sector sector, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(sectorService.updateSector(id, sector), HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> logicalDeleteSector(@PathVariable Integer id){
		return new ResponseEntity<>(sectorService.logicalDeleteSector(id), HttpStatus.OK);
	}
	
}
