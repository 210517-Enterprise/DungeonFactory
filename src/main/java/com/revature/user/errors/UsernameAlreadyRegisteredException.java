package com.revature.user.errors;

public class UsernameAlreadyRegisteredException extends RuntimeException{

	public UsernameAlreadyRegisteredException() {
		super();
	}

	public UsernameAlreadyRegisteredException(String message, Throwable cause) {
		super(message, cause);
	}

	public UsernameAlreadyRegisteredException(String message) {
		super(message);
	}

	public UsernameAlreadyRegisteredException(Throwable cause) {
		super(cause);
	}

}
