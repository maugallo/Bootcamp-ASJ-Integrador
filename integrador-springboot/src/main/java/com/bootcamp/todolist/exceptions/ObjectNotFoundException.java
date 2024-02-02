package com.bootcamp.todolist.exceptions;

public class ObjectNotFoundException extends RuntimeException {
	public ObjectNotFoundException(String message) {
		super(message);
	}
}
