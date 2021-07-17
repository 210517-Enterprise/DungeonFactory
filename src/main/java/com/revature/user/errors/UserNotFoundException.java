 package com.revature.user.errors;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.NoArgsConstructor;

/**
 * Class defines custom user not found exception
 * @author Frank Aurori, Derek Dinh, Frederick Thornton
 *
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
@NoArgsConstructor
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message, Throwable cause, boolean enableSuppression,
                                 boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(Throwable cause) {
        super(cause);
    }

}
