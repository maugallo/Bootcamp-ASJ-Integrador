package com.bootcamp.integrador.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bootcamp.integrador.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	public Boolean existsByEmailAndPassword(String email, String password) {
		return userRepository.existsByEmailAndPassword(email, password);
	}
	
}
