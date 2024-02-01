package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.exceptions.DataRepeatedException;
import com.bootcamp.todolist.models.Contact;
import com.bootcamp.todolist.repositories.ContactRepository;

@Service
public class ContactService {

	@Autowired
	ContactRepository contactRepository;
	
	public List<Contact> getContacts(){
		return contactRepository.findAll();
	}
	
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
		try {
			contactRepository.save(updatedContact);
			return "Contact updated correctly";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error updating the contact";
		}
	}
	
	public String deleteContact(Integer id) {
		try {
			Optional<Contact> optionalContact = contactRepository.findById(id);
			
			if (optionalContact.isPresent()) {
				Contact contact = optionalContact.get();
				//********VALIDATE HERE THAT PROVIDER HAS > 1 CONTACT BEFORE DELETING******** if (false) return "Can't delete all providers contact";
				contactRepository.delete(contact);
				return "Contact deleted correctly";
			} else {
				return "Contact doesn't exist";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "Error deleting the contact";
		}
	}
	
}
