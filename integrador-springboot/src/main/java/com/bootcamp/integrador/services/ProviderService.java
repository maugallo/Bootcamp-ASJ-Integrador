package com.bootcamp.integrador.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.exceptions.ObjectNotFoundException;
import com.bootcamp.integrador.models.Address;
import com.bootcamp.integrador.models.Contact;
import com.bootcamp.integrador.models.Locality;
import com.bootcamp.integrador.models.Provider;
import com.bootcamp.integrador.repositories.ProviderRepository;
import com.bootcamp.integrador.specification.ProviderSpecification;

import jakarta.transaction.Transactional;

@Service
public class ProviderService {

	@Autowired
	ProviderRepository providerRepository;
	
	@Autowired
	ContactService contactService;
	
	@Autowired
	AddressService addressService;
	
	@Autowired
	LocalityService localityService;
	
	//GET METHODS:
	public List<Provider> getProviders(ProviderSpecification providerSpecification){
		return providerRepository.findAll(providerSpecification);
	}

	public Provider getProviderById(Integer id) {
		return providerRepository.findById(id)
				.orElseThrow(() -> new ObjectNotFoundException("No se pudo encontrar el proveedor solicitado con id: " + id));
	}
	
	//CREATE METHOD:
	@Transactional
	public String createProvider(Provider provider) {

			Contact contact = new Contact();
			contact.setEmail(provider.getContact().getEmail());
			contact.setTelephone(provider.getContact().getTelephone());
			provider.setContact(contactService.createContact(contact));;

			Locality locality = new Locality();
			locality.setName(provider.getAddress().getLocality().getName());
			locality.setProvince(provider.getAddress().getLocality().getProvince());
			
			Address address = new Address();
			address.setLocality(localityService.createLocality(locality));
			address.setStreet(provider.getAddress().getStreet());
			address.setNum(provider.getAddress().getNum());
			address.setZipCode(provider.getAddress().getZipCode());
			provider.setAddress(addressService.createAddress(address));
			
			providerRepository.save(provider);
			
			return "Proveedor agregado correctamente";
	}
	
	//UPDATE METHOD:
	@Transactional
	public String updateProvider(Integer id, Provider updatedProvider) {
		
			Contact contact = updatedProvider.getContact();
			contactService.updateContact(contact.getId(), contact);
			
			Locality locality = updatedProvider.getAddress().getLocality();
			localityService.updateLocality(locality.getId(), locality);
			
			Address address = updatedProvider.getAddress();
			addressService.updateAddress(address.getId(), address);
			
			providerRepository.save(updatedProvider);
			
			return "Proveedor actualizado correctamente";
	}
	
	//DELETE & RECOVER METHOD:
	public String toggleIsEnabled(Integer id) {
		Provider provider = this.getProviderById(id);
		
		provider.setIsEnabled(!provider.getIsEnabled());
		providerRepository.save(provider);
		return provider.getIsEnabled() ? "Proveedor agregado correctamente" : "Proveedor eliminado correctamente";
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
