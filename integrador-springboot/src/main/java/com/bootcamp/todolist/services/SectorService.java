package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.exceptions.ObjectNotFoundException;
import com.bootcamp.todolist.models.Category;
import com.bootcamp.todolist.models.Sector;
import com.bootcamp.todolist.repositories.SectorRepository;

@Service
public class SectorService {

	@Autowired
	SectorRepository sectorRepository;
	
	//GET METHODS:
	public List<Sector> getSectors(Boolean isEnabled){
		return sectorRepository.findByIsEnabled(isEnabled);
	}
	
	public Sector getSectorById(Integer id){
		Optional<Sector> sector = sectorRepository.findById(id);
		if (sector.isPresent()) {
			return sector.get();
		} else {
			throw new ObjectNotFoundException("No se pudo encontrar el rubro solicitado con id " + id);
		}
	}
	
	//CREATE METHOD:
	public String createSector(Sector sector) {
		sectorRepository.save(sector);
		return "Rubro agregado correctamente";
	}
	
	//UPDATE METHOD:
	public String updateSector(Integer id, Sector updatedSector) {
		sectorRepository.save(updatedSector);
		return "Rubro actualizado correctamente";
	}
	
	//DELETE & RECOVER METHOD:
	public String toggleIsEnabled(Integer id) {
		Optional<Sector> optSector = sectorRepository.findById(id);
		
		if (optSector.isPresent()) {
			Sector sector = optSector.get();
			sector.setIsEnabled(!sector.getIsEnabled());
			sectorRepository.save(sector);
			return sector.getIsEnabled() ? "Rubro agregado correctamente" : "Rubro eliminado correctamente";
		} else {
			throw new ObjectNotFoundException("No se pudo encontrar el rubro solicitado con id: " + id);
		}
	}
	
	//VALIDATE METHOD:
	public Boolean existsByName(String name) {
		return sectorRepository.existsByNameIgnoreCase(name);
	}
}
