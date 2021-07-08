package com.revature.user.errors;

public class InvalidLoginCredentials extends RuntimeException {

	public InvalidLoginCredentials() {
		super();
	}

	public InvalidLoginCredentials(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
	}

	public InvalidLoginCredentials(String message, Throwable cause) {
		super(message, cause);
	}

	public InvalidLoginCredentials(String message) {
		super(message);
	}

	public InvalidLoginCredentials(Throwable cause) {
		super(cause);
	}

}
