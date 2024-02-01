package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.models.Country;
import com.bootcamp.todolist.repositories.CountryRepository;

@Service
public class CountryService {

	@Autowired
	CountryRepository countryRepository;
	
	public List<Country> getCountries(){
		return countryRepository.findAll();
	}
	
	public Optional<Country> getCountryById(Integer id){
		return countryRepository.findById(id);
	}
	
	public String createCountry(Country country) {
		try {
			countryRepository.save(country);
			return "Country created correctly";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error creating the country";
		}
	}
}
