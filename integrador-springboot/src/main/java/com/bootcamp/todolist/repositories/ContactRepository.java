package com.bootcamp.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bootcamp.todolist.models.Contact;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
	Boolean existsByEmail(String email);
	Boolean existsByTelephone(String telephone);
}
