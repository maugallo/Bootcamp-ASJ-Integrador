package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.exceptions.DataRepeatedException;
import com.bootcamp.todolist.models.Address;
import com.bootcamp.todolist.models.Contact;
import com.bootcamp.todolist.models.Provider;
import com.bootcamp.todolist.repositories.ProviderRepository;

import jakarta.transaction.TransactionScoped;
import jakarta.transaction.Transactional;

@Service
public class ProviderService {

	@Autowired
	ProviderRepository providerRepository;
	
	@Autowired
	ContactService contactService;
	
	@Autowired
	AddressService addressService;

	public List<Provider> getProviders() {
		return providerRepository.findAll();
	}

	public List<Provider> getEnabledProviders() {
		return providerRepository.findByIsEnabledTrue();
	}

	public List<Provider> getDisabledProviders() {
		return providerRepository.findByIsEnabledFalse();
	}

	public Optional<Provider> getProviderByCode(String code) {
		return providerRepository.findByCode(code);
	}
	
	public Boolean existsByCode(String code) {
		return providerRepository.existsByCode(code);
	}
	
	public Boolean existsByCuit(String cuit) {
		return providerRepository.existsByCuit(cuit);
	}
	
	public Boolean existsByCompanyName(String companyName) {
		return providerRepository.existsByCompanyName(companyName);
	}

	@Transactional
	public String createProvider(Provider provider) {

			Contact contact = new Contact();
			contact.setEmail(provider.getContact().getEmail());
			contact.setTelephone(provider.getContact().getTelephone());
			provider.setContact(contactService.createContact(contact));;

			Address address = new Address();
			address.setLocality(provider.getAddress().getLocality());
			address.setStreet(provider.getAddress().getStreet());
			address.setNum(provider.getAddress().getNum());
			address.setZipCode(provider.getAddress().getZipCode());
			provider.setAddress(addressService.createAddress(address));
			
			providerRepository.save(provider);
			
			return "Proveedor creado correctamente";
	}

	@Transactional
	public String updateProvider(Integer id, Provider updatedProvider) {
		try {

			Contact contact = updatedProvider.getContact();
			contactService.updateContact(contact.getId(), contact);
			
			Address address = updatedProvider.getAddress();
			addressService.updateAddress(address.getId(), address);
			
			providerRepository.save(updatedProvider);
			
			return "Provider updated correctly";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error updating the provider: " + e.getMessage();
		}
	}

	public String logicalDeleteProvider(Integer id) {
		try {
			Provider provider = providerRepository.findById(id).get();
			if (provider != null) {
				provider.setIsEnabled(false);
				providerRepository.save(provider);
				return "Provider deleted correctly";
			} else {
				return "Provider doesn't exist";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "Error deleting the provider: " + e.getMessage();
		}
	}

}
