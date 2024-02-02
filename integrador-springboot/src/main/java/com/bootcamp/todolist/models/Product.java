package com.bootcamp.todolist.models;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "products")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne(fetch = FetchType.EAGER) //EAGER tells JPA to instantly make the join to the whole Category object, and not have only the Category id inside the Provider object.
	@JoinColumn(name = "category_id")
	private Category category;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "provider_id")
	private Provider provider;
	
	@NotNull
//	@NotBlank
//	@Size(min = 2, max = 10)
	@Column(unique = true)
	private String sku;
	
	@NotNull
//	@NotBlank
//	@Size(min = 1, max = 500)
//	@Pattern(regexp = "^https?:\\/\\/[\\w\\-\\.]+(\\.[a-zA-Z]{2,3})?(:\\d+)?(\\/[^\\s]*)?$")
	@Column(length = 500)
	private String image;
	
	@NotNull
//	@NotBlank
//	@Size(min = 1, max = 50)
	@Column
	private String title;
	
	@NotNull
//	@Min(value = 1)
//	@Max(value = 9999999)
	@Column
	private Double price;
	
	@NotNull
//	@NotBlank
//  @Size(min = 1, max = 1000)
    @Column
	private String description;
	
    @Column
	private Boolean isEnabled;
	
	@CreationTimestamp
	private Timestamp createdAt;
	
	@UpdateTimestamp
	private Timestamp updatedAt;

	public Product() {}

	public Product(Integer id, Category category, Provider provider, String sku, String image, String title,
			Double price, String description, Boolean isEnabled, Timestamp createdAt, Timestamp updatedAt) {
		this.id = id;
		this.category = category;
		this.provider = provider;
		this.sku = sku;
		this.image = image;
		this.title = title;
		this.price = price;
		this.description = description;
		this.isEnabled = isEnabled;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Integer getId() {
		return id;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Provider getProvider() {
		return provider;
	}

	public void setProvider(Provider provider) {
		this.provider = provider;
	}

	public String getSku() {
		return sku;
	}

	public void setSku(String sku) {
		this.sku = sku;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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
