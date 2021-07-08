package com.revature.user;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.revature.user.errors.*;
@Component
@RestControllerAdvice
public class UserAdvice {

	@ExceptionHandler(UsernameAlreadyRegisteredException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	public String handleUsernameAlreadyRegisteredException(){
		return "Username is already registered";
	}
	
	@ExceptionHandler(UserNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	public String handleUserNotFoundException() {
		return "No user with that username was not found";
	}
	
	@ExceptionHandler(InvalidLoginCredentials.class)
	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	public String handleInvalidLoginCredentialsException() {
		return "Username or password was incorrect";
	}
	
}
