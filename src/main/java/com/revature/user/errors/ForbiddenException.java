package com.revature.user.errors;

import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.FORBIDDEN)
@NoArgsConstructor
public class ForbiddenException extends RuntimeException {
}
