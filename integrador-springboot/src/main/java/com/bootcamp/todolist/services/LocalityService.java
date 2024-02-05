package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.exceptions.ObjectNotFoundException;
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
	
	public Locality getLocalityById(Integer id){
		Optional<Locality> locality = localityRepository.findById(id);
		if (locality.isPresent()) {
			return locality.get();
		} else {
			throw new ObjectNotFoundException("No se pudo encontrar la localidad solicitada con id " + id);
		}
	}
	
	public String createLocality(Locality locality) {
		localityRepository.save(locality);
		return "Localidad creada correctamente";
	}
	
}
