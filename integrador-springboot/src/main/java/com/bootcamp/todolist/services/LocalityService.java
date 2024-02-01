package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.models.Locality;
import com.bootcamp.todolist.repositories.LocalityRepository;

@Service
public class LocalityService {

	@Autowired
	LocalityRepository localityRepository;
	
	public List<Locality> getLocalities(){
		return localityRepository.findAll();
	}
	
	public List<Locality> getLocalitiesByProvinceId(Integer provinceId){
		return localityRepository.findByProvinceId(provinceId);
	}
	
	public Optional<Locality> getLocalityById(Integer id){
		return localityRepository.findById(id);
	}
	
	public String createLocality(Locality locality) {
		try {
			localityRepository.save(locality);
			return "Locality created correctly";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error creating the locality";
		}
	}
	
}
