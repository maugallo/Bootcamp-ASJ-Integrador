package com.bootcamp.todolist.models;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "purchase_orders")
public class PurchaseOrder {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@OneToMany(mappedBy = "purchaseOrder")
	@JsonManagedReference
	List<OrderDetail> details;
	
	@Enumerated(EnumType.STRING)
	private OrderStatus orderStatus;
	
	@ManyToOne
	@JoinColumn(name = "provider_id")
	private Provider provider;
	
	@NotNull
//	Validar si issueDate < deliveryDate
//	Validar si issueDate === fecha en el momento de creación
	@Column
	private LocalDate issueDate;
	
	@NotNull
	@Column
	private LocalDate deliveryDate;
	
	@NotNull
//	@NotBlank
//	@Size(min = 1, max = 500)
	@Column(length = 500)
	private String receptionInfo;
	
//	@NotNull
//	@Size(min = 1)
	@Column
	private Double total;
	
	@CreationTimestamp
	private Timestamp createdAt;
	
	@UpdateTimestamp
	private Timestamp updatedAt;

	public PurchaseOrder() {}

	public PurchaseOrder(Integer id, List<OrderDetail> details, OrderStatus orderStatus, Provider provider,
			@NotNull LocalDate issueDate, @NotNull LocalDate deliveryDate, @NotNull String receptionInfo, Double total,
			Timestamp createdAt, Timestamp updatedAt) {
		super();
		this.id = id;
		this.details = details;
		this.orderStatus = orderStatus;
		this.provider = provider;
		this.issueDate = issueDate;
		this.deliveryDate = deliveryDate;
		this.receptionInfo = receptionInfo;
		this.total = total;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Integer getId() {
		return id;
	}

	public List<OrderDetail> getDetails() {
		return details;
	}

	public void setDetails(List<OrderDetail> details) {
		this.details = details;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}

	public Provider getProvider() {
		return provider;
	}

	public void setProvider(Provider provider) {
		this.provider = provider;
	}

	public LocalDate getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(LocalDate issueDate) {
		this.issueDate = issueDate;
	}

	public LocalDate getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(LocalDate deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public String getReceptionInfo() {
		return receptionInfo;
	}

	public void setReceptionInfo(String receptionInfo) {
		this.receptionInfo = receptionInfo;
	}

	public Double getTotal() {
		return total;
	}

	public void setTotal(Double total) {
		this.total = total;
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
