package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.exceptions.ObjectNotFoundException;
import com.bootcamp.todolist.models.Address;
import com.bootcamp.todolist.models.Contact;
import com.bootcamp.todolist.models.Provider;
import com.bootcamp.todolist.repositories.ProviderRepository;
import com.bootcamp.todolist.specification.ProviderSpecification;

import jakarta.transaction.Transactional;

@Service
public class ProviderService {

	@Autowired
	ProviderRepository providerRepository;
	
	@Autowired
	ContactService contactService;
	
	@Autowired
	AddressService addressService;
	
	//GET METHODS:
	public List<Provider> getProviders(ProviderSpecification providerSpecification){
		return providerRepository.findAll(providerSpecification);
	}

	public Provider getProviderById(Integer id) {
		Optional<Provider> provider = providerRepository.findById(id);
		if (provider.isPresent()) {
			return provider.get();
		} else {
			throw new ObjectNotFoundException("No se pudo encontrar el proveedor solicitado con id: " + id);
		}
	}
	
	//CREATE METHOD:
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
	
	//UPDATE METHOD: ***FIJARSE SI HACE FALTA LLAMAR A TODOS LOS PRODUCTOS RELACIONADOS A DICHO PROVEEDOR Y CAMBIARLES SU VALOR O NO***
	@Transactional
	public String updateProvider(Integer id, Provider updatedProvider) {
		
			Contact contact = updatedProvider.getContact();
			contactService.updateContact(contact.getId(), contact);
			
			Address address = updatedProvider.getAddress();
			addressService.updateAddress(address.getId(), address);
			
			providerRepository.save(updatedProvider);
			
			return "Proveedor actualizado correctamente";
	}
	
	//DELETE & RECOVER METHOD: ***FALTA LLAMAR A TODOS LOS PRODUCTOS RELACIONADOS A DICHO PROVEEDOR Y ELIMINARLOS***
	public String toggleIsEnabled(Integer id) {
		Optional<Provider> optProvider = providerRepository.findById(id);
		if (optProvider.isPresent()) {
			Provider provider = optProvider.get();
			provider.setIsEnabled(!provider.getIsEnabled());
			providerRepository.save(provider);
			return provider.getIsEnabled() ? "Proveedor agregado correctamente" : "Proveedor eliminado correctamente";
		} else {
			throw new ObjectNotFoundException("No se pudo encontrar el proveedor solicitado con id: " + id);
		}
	}
	
	//VALIDATION METHODS:
	public Boolean existsByCode(String code) {
		return providerRepository.existsByCode(code);
	}
	
	public Boolean existsByCuit(String cuit) {
		return providerRepository.existsByCuit(cuit);
	}
	
	public Boolean existsByCompanyName(String companyName) {
		return providerRepository.existsByCompanyNameIgnoreCase(companyName);
	}

}
