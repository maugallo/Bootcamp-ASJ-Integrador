package com.bootcamp.todolist.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "localities")
public class Locality {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "province_id")
	private Province province;
	
	@NotNull
//	@NotBlank
//	@Size(min = 1, max = 100)
	@Column
	private String name;

	public Locality() {}

	public Locality(Integer id, Province province, String name) {
		this.id = id;
		this.province = province;
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public Province getProvince() {
		return province;
	}

	public void setProvince(Province province) {
		this.province = province;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
