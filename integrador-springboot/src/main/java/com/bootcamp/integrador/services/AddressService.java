package com.bootcamp.integrador.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.exceptions.ObjectNotFoundException;
import com.bootcamp.integrador.models.Address;
import com.bootcamp.integrador.repositories.AddressRepository;

@Service
public class AddressService {

	@Autowired
	AddressRepository addressRepository;
	
	public Address getAddressById(Integer id){
		return addressRepository.findById(id)
				.orElseThrow(() -> new ObjectNotFoundException("No se pudo encontrar la dirección solicitada con id: " + id));
	}
	
	public Address createAddress(Address address) {
		return addressRepository.save(address);
	}
	
	public String updateAddress(Integer id, Address updatedAddress) {
		addressRepository.save(updatedAddress);
		return "Dirección actualizada correctamente";
	}
}
