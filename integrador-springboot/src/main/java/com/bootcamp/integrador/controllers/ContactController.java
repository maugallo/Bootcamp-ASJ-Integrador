package com.bootcamp.integrador.controllers;

import java.util.List;

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

import com.bootcamp.integrador.ErrorHandler;
import com.bootcamp.integrador.models.Contact;
import com.bootcamp.integrador.services.ContactService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/contacts")
public class ContactController {

	@Autowired
	ContactService contactService;
	
	@GetMapping("/{id}")
	public ResponseEntity<Contact> getContactById(@PathVariable Integer id){
		return new ResponseEntity<Contact>(contactService.getContactById(id), HttpStatus.OK);
	}
	
	@GetMapping("/validate-email/{email}")
	public ResponseEntity<Boolean> existsByEmail(@PathVariable String email){
		return new ResponseEntity<>(contactService.existsByEmail(email), HttpStatus.OK);
	}
	
	@GetMapping("/validate-telephone/{telephone}")
	public ResponseEntity<Boolean> existsByTelephone(@PathVariable String telephone){
		return new ResponseEntity<>(contactService.existsByTelephone(telephone), HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<Contact> createContact(@Valid @RequestBody Contact contact, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(contactService.createContact(contact), HttpStatus.OK);
		}
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<String> updateContact(@PathVariable Integer id  ,@Valid @RequestBody Contact contact, BindingResult bindingResult){
		if (bindingResult.hasErrors()) {
			List<String> errorList = ErrorHandler.loadErrorMessages(bindingResult);
			ErrorHandler.printErrorMessages(errorList);
			
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		} else {
			return new ResponseEntity<>(contactService.updateContact(id, contact), HttpStatus.OK);
		}
	}
	
}
