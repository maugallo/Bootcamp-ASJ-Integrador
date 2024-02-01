package com.bootcamp.todolist.models;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.UniqueElements;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "contacts")
public class Contact {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotNull
//	@NotBlank
//	@Size(min = 7, max = 12)
//	@Pattern(regexp = "^[0-9]+$")
	@Column(unique = true)
	private String telephone;
	
	@NotNull
//	@NotBlank
//	@Size(min = 1, max = 50)
//	@Pattern(regexp = ".*(\\.com)$")
//	@Email
	@Column(unique = true)
	private String email;
	
	@CreationTimestamp
	private Timestamp created_at;
	
	@UpdateTimestamp
	private Timestamp updated_at;

	public Contact() {}

	public Contact(Integer id, String telephone, String email, Timestamp created_at,
			Timestamp updated_at) {
		this.id = id;
		this.telephone = telephone;
		this.email = email;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public Integer getId() {
		return id;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Timestamp getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Timestamp created_at) {
		this.created_at = created_at;
	}

	public Timestamp getUpdated_at() {
		return updated_at;
	}

	public void setUpdated_at(Timestamp updated_at) {
		this.updated_at = updated_at;
	}
	
}
