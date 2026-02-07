package com.auction.vehicleauctionapi.config;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice 
public class ApiExceptionHandler {
/**
 * Handles MethodArgumentNotValidException and returns a bad request response
 * with a JSON body containing a message and a map of field errors.
 * 
 * @param ex the exception to handle
 * @return a ResponseEntity containing a JSON body with the following structure:
 * {
 *     "message": "Validation failed",
 *     "errors": {
 *         "<field name>": "<error message>"
 *     }
 * }
 */
        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors()
                .forEach(fe -> errors.put(fe.getField(), fe.getDefaultMessage()));
                
                Map<String, Object> body = new LinkedHashMap<>();
                body.put("message", "Validation failed");
                body.put("errors", errors);
                return ResponseEntity.badRequest().body(body);
    }
}
