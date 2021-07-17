package com.revature.character;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.NoArgsConstructor;

/**
 * Class defines the custom character not found exception
 * @author Frank Aurori, Derek Dinh, Frederick Thornton
 *
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
@NoArgsConstructor
public class CharacterNotFoundException extends RuntimeException {
	
	public CharacterNotFoundException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

	public CharacterNotFoundException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public CharacterNotFoundException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public CharacterNotFoundException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

}
