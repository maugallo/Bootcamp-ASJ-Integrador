package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.models.Country;
import com.bootcamp.todolist.models.Province;
import com.bootcamp.todolist.repositories.ProvinceRepository;

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
	
	public Optional<Province> getProvinceById(Integer id){
		return provinceRepository.findById(id);
	}
	
	public String createProvince(Province province) {
		try {
			provinceRepository.save(province);
			return "Province created correctly";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error creating the province";
		}
	}
}
