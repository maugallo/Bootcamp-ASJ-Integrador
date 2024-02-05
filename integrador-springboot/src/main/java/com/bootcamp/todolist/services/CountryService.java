package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.exceptions.ObjectNotFoundException;
import com.bootcamp.todolist.models.Country;
import com.bootcamp.todolist.repositories.CountryRepository;

@Service
public class CountryService {

	@Autowired
	CountryRepository countryRepository;
	
	public List<Country> getCountries(){
		return countryRepository.findAll();
	}
	
	public Country getCountryById(Integer id){
		Optional<Country> country = countryRepository.findById(id);
		if (country.isPresent()) {
			return country.get();
		} else {
			throw new ObjectNotFoundException("No se pudo encontrar el país solicitado con id " + id);
		}
	}
	
	public String createCountry(Country country) {
		countryRepository.save(country);
		return "País creado correctamente";
	}
}
