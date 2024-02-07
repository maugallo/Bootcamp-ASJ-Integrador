package com.bootcamp.integrador.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.Contact;
import com.bootcamp.integrador.repositories.ContactRepository;

@Service
public class ContactService {

	@Autowired
	ContactRepository contactRepository;
	
	public Optional<Contact> getContactById(Integer id){
		return contactRepository.findById(id);
	}
	
	public Boolean existsByEmail(String email) {
		return contactRepository.existsByEmail(email);
	}
	
	public Boolean existsByTelephone(String telephone) {
		return contactRepository.existsByTelephone(telephone);
	}
	
	public Contact createContact(Contact contact) {
		return contactRepository.save(contact);
	}
	
	public String updateContact(Integer id, Contact updatedContact) {
		contactRepository.save(updatedContact);
		return "Contacto actualizado correctamente";
	}
	
}
