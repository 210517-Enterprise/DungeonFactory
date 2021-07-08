package com.revature.user;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Component
@RestControllerAdvice
public class UserAdvice {

	@ExceptionHandler(UsernameAlreadyRegisteredException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	public String handleUsernameAlreadyRegisteredException(){
		return "Username is already registered";
	}
	
}
