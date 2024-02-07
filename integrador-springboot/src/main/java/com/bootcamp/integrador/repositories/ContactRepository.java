package com.bootcamp.integrador.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.integrador.models.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
	Boolean existsByEmail(String email);
	Boolean existsByTelephone(String telephone);
}
