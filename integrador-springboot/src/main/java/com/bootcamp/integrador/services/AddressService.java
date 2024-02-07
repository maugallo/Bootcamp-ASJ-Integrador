package com.bootcamp.integrador.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.models.Address;
import com.bootcamp.integrador.repositories.AddressRepository;

@Service
public class AddressService {

	@Autowired
	AddressRepository addressRepository;
	
	public Optional<Address> getAddressById(Integer id){
		return addressRepository.findById(id);
	}
	
	public Address createAddress(Address address) {
		return addressRepository.save(address);
	}
	
	public String updateAddress(Integer id, Address updatedAddress) {
		addressRepository.save(updatedAddress);
		return "Dirección actualizada correctamente";
	}
}
