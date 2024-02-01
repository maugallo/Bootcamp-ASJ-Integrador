package com.bootcamp.todolist.exceptions;

public class DataRepeatedException extends RuntimeException {
	public DataRepeatedException(String message) {
		super(message);
	}
}
