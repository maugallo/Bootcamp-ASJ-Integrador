package com.bootcamp.integrador.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.exceptions.ObjectNotFoundException;
import com.bootcamp.integrador.models.Province;
import com.bootcamp.integrador.repositories.ProvinceRepository;

@Service
public class ProvinceService {

	@Autowired
	ProvinceRepository provinceRepository;
	
	public List<Province> getProvinces(){
		return provinceRepository.findAll();
	}
	
	public List<Province> getProvicesByCountryId(Integer countryId){
		return provinceRepository.findByCountryId(countryId);
	}
	
	public Province getProvinceById(Integer id){
		Optional<Province> province = provinceRepository.findById(id);
		if (province.isPresent()) {
			return province.get();
		} else {
			throw new ObjectNotFoundException("No se pudo encontrar la provincia solicitada con id " + id);
		}
	}
	
	public String createProvince(Province province) {
		provinceRepository.save(province);
		return "Provincia creada correctamente";
	}
}
