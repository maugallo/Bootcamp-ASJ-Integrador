package com.bootcamp.todolist.models;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "sectors")
public class Sector {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotNull
//	@Size(min = 1, max = 100)
	@Column(unique = true)
//	@Pattern(regexp = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")
	private String name;
	
	@Column
	private Boolean isEnabled;
	
	@CreationTimestamp
	private Timestamp created_at;
	
	@UpdateTimestamp
	private Timestamp updated_at;

	public Sector() {}

	public Sector(Integer id, String name, Boolean isEnabled, Timestamp created_at, Timestamp updated_at) {
		super();
		this.id = id;
		this.name = name;
		this.isEnabled = isEnabled;
		this.created_at = created_at;
		this.updated_at = updated_at;
	}

	public Integer getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Boolean getIsEnabled() {
		return isEnabled;
	}

	public void setIsEnabled(Boolean isEnabled) {
		this.isEnabled = isEnabled;
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
