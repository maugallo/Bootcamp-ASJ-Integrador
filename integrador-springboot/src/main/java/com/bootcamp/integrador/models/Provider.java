package com.bootcamp.integrador.models;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "providers")
public class Provider {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "sector_id")
	private Sector sector;
	
	@Enumerated(EnumType.STRING) //The ENUM will be stored in the database as a String.
	private VatCondition vatCondition;
	
	@OneToOne
	@JoinColumn(name = "contact_id")
	private Contact contact;
	
	@OneToOne
	@JoinColumn(name = "address_id")
	private Address address;
	
	@NotNull
	@NotBlank
	@Size(min = 4, max = 10)
	@Column(unique = true)
	private String code;
	
	@NotNull
	@NotBlank
	@Size(max = 100)
	@Pattern(regexp = "^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$")
	@Column(unique = true)
	private String companyName;
	
	@Size(max = 500)
	@Column(length = 500)
	private String logo;
	
	@Column
	private String website;
	
	@NotNull
	@NotBlank
	@Size(max = 40)
	@Pattern(regexp = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")
	@Column
	private String firstName;
	
	@NotNull
	@NotBlank
	@Size(max = 40)
	@Pattern(regexp = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")
	@Column
	private String lastName;
	
	@NotNull
	@NotBlank
	@Size(max = 100)
	@Pattern(regexp = "^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")
	@Column
	private String role;
	
	@NotNull
	@NotBlank
	@Size(min = 13, max = 13)
	@Pattern(regexp = "^[0-9]{2}-[0-9]{8}-[0-9]$")
	@Column(unique = true)
	private String cuit;
	
	@Column
	private Boolean isEnabled;
	
	@CreationTimestamp
	private Timestamp createdAt;
	
	@UpdateTimestamp
	private Timestamp updatedAt;

	public Provider() {}

	public Provider(Integer id, Sector sector, VatCondition vatCondition, Contact contact,
			Address address, @NotNull String code, @NotNull String companyName, String logo, String website,
			@NotNull String firstName, @NotNull String lastName, @NotNull String role, @NotNull String cuit,
			Boolean isEnabled, Timestamp createdAt, Timestamp updatedAt) {
		super();
		this.id = id;
		this.sector = sector;
		this.vatCondition = vatCondition;
		this.contact = contact;
		this.address = address;
		this.code = code;
		this.companyName = companyName;
		this.logo = logo;
		this.website = website;
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
		this.cuit = cuit;
		this.isEnabled = isEnabled;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Integer getId() {
		return id;
	}

	public Sector getSector() {
		return sector;
	}

	public void setSector(Sector sector) {
		this.sector = sector;
	}

	public VatCondition getVatCondition() {
		return vatCondition;
	}

	public void setVatCondition(VatCondition vatCondition) {
		this.vatCondition = vatCondition;
	}

	public Contact getContact() {
		return contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getCuit() {
		return cuit;
	}

	public void setCuit(String cuit) {
		this.cuit = cuit;
	}

	public Boolean getIsEnabled() {
		return isEnabled;
	}

	public void setIsEnabled(Boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	public Timestamp getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Timestamp createdAt) {
		this.createdAt = createdAt;
	}

	public Timestamp getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Timestamp updatedAt) {
		this.updatedAt = updatedAt;
	}
	
}
