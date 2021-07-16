package com.revature.user;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.revature.user.errors.ErrorResponse;
import com.revature.user.errors.InvalidLoginCredentials;
import com.revature.user.errors.UserNotFoundException;
import com.revature.user.errors.UsernameAlreadyRegisteredException;
@Component
@RestControllerAdvice
public class UserAdvice {

	@ExceptionHandler(UsernameAlreadyRegisteredException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ErrorResponse handleUsernameAlreadyRegisteredException(RuntimeException userAlreadyRegistered) {
		ErrorResponse err = new ErrorResponse();
		err.setMessage(userAlreadyRegistered.getMessage());
		return err;
	}
	
	@ExceptionHandler(InvalidLoginCredentials.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ErrorResponse handleInvalidLoginCredentialsException(RuntimeException invalidLoginCredentials) {
		ErrorResponse err = new ErrorResponse();
		err.setMessage(invalidLoginCredentials.getMessage());
		return err;
	}
	
	@ExceptionHandler(UserNotFoundException.class)
	@ResponseBody
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public ErrorResponse handleUserNotFoundException(RuntimeException userNotFound) {
		ErrorResponse err = new ErrorResponse();
		err.setMessage(userNotFound.getMessage());
		return err;
	}
	
	
	
}
