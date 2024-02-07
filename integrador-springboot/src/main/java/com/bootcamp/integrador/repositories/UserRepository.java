package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	Boolean existsByEmailAndPassword(String email, String password);
}
