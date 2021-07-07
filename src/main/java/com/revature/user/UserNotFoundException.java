package com.revature.user;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message, Throwable cause, boolean enableSuppression,
                                 boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
        // TODO Auto-generated constructor stub
    }

    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
        // TODO Auto-generated constructor stub
    }

    public UserNotFoundException(String message) {
        super(message);
        // TODO Auto-generated constructor stub
    }

    public UserNotFoundException(Throwable cause) {
        super(cause);
        // TODO Auto-generated constructor stub
    }

}
