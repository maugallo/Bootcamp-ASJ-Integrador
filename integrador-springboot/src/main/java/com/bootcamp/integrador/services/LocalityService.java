package com.bootcamp.integrador.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.exceptions.ObjectNotFoundException;
import com.bootcamp.integrador.models.Locality;
import com.bootcamp.integrador.repositories.LocalityRepository;

@Service
public class LocalityService {

	@Autowired
	LocalityRepository localityRepository;
	
	public List<Locality> getLocalities(){
		return localityRepository.findAll();
	}
	
	public Locality getLocalityById(Integer id){
		return localityRepository.findById(id)
				.orElseThrow(() -> new ObjectNotFoundException("No se pudo encontrar la localidad solicitada con id: " + id));
	}
	
	public Locality createLocality(Locality locality) {
		return localityRepository.save(locality);
	}
	
	public String updateLocality(Integer id, Locality locality) {
		localityRepository.save(locality);
		return "Localidad actualizada correctamente";
	}
	
}
