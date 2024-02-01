package com.bootcamp.todolist.models;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "addresses")
public class Address {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "locality_id")
	private Locality locality;
	
	@NotNull
//	@Size(min = 5, max = 100)
//	@Pattern(regexp = "^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$")
	@Column
	private String street;
	
	@NotNull
//	@NotBlank
//	@Size(min = 1, max = 6)
//	@Pattern(regexp = "^[0-9]+$")
	@Column
	private String num;
	
	@NotNull
//	@NotBlank
//	@Size(min = 1, max = 6)
//	@Pattern(regexp = "^[A-Za-z0-9]+$")
	@Column
	private String zipCode;
	
	@CreationTimestamp
	private Timestamp created_at;
	
	@UpdateTimestamp
	private Timestamp updated_at;

	public Address() {}

	public Address(Integer id, Locality locality, String street, String num, String zipCode, Timestamp created_at,
			Timestamp updated_at) {
		this.id = id;
		this.locality = locality;
		this.street = street;
		this.num = num;
		this.zipCode = zipCode;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public Integer getId() {
		return id;
	}

	public Locality getLocality() {
		return locality;
	}

	public void setLocality(Locality locality) {
		this.locality = locality;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getNum() {
		return num;
	}

	public void setNum(String num) {
		this.num = num;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
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
