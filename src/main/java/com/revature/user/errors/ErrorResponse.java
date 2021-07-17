package com.revature.user.errors;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
/**
 * Class defines the error response
 * @author Frank Aurori, Derek Dinh, Frederick Thornton
 *
 */
@Data @NoArgsConstructor @AllArgsConstructor
public class ErrorResponse {
	
	private String message;
	
}
