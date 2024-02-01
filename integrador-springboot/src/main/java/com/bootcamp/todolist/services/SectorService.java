package com.bootcamp.todolist.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.todolist.models.Sector;
import com.bootcamp.todolist.repositories.SectorRepository;

@Service
public class SectorService {

	@Autowired
	SectorRepository sectorRepository;
	
	public List<Sector> getSectors(){
		return sectorRepository.findAll();
	}
	
	public List<Sector> getEnabledSectors(){
		return sectorRepository.findByIsEnabledTrue();
	}
	
	public Optional<Sector> getSectorById(Integer id){
		return sectorRepository.findById(id);
	}
	
	public String createSector(Sector sector) {
		try {
			sectorRepository.save(sector);
			return "Sector created correctly";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error creating the sector";
		}
	}
	
	public String updateSector(Integer id, Sector updatedSector) {
		try {
			sectorRepository.save(updatedSector);
			return "Sector updated correctly";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error updating the sector";
		}
	}
	
	public String logicalDeleteSector(Integer id) {
		try {
			Optional<Sector> optionalSector = sectorRepository.findById(id);
			
			if (optionalSector.isPresent()) {
				Sector sector = optionalSector.get();
				sector.setIsEnabled(false);
				sectorRepository.save(sector);
				return "Sector deleted correctly";
			} else {
				return "Sector doesn't exist";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "Error deleting the sector";
		}
	}
	
}
