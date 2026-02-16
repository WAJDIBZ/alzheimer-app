package com.example.medical.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex, HttpServletRequest request) {
        return build(ex.getMessage(), HttpStatus.NOT_FOUND, request.getRequestURI(), List.of());
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ErrorResponse> handleConflict(ConflictException ex, HttpServletRequest request) {
        return build(ex.getMessage(), HttpStatus.CONFLICT, request.getRequestURI(), List.of());
    }

    @ExceptionHandler({MethodArgumentNotValidException.class, ConstraintViolationException.class, IllegalArgumentException.class})
    public ResponseEntity<ErrorResponse> handleValidation(Exception ex, HttpServletRequest request) {
        List<ErrorResponse.FieldValidationError> fields = List.of();
        String message = ex.getMessage();
        if (ex instanceof MethodArgumentNotValidException manv) {
            fields = manv.getBindingResult().getFieldErrors().stream()
                    .map(this::toFieldError)
                    .toList();
            message = "Validation failed";
        }
        return build(message, HttpStatus.BAD_REQUEST, request.getRequestURI(), fields);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex, HttpServletRequest request) {
        return build(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, request.getRequestURI(), List.of());
    }

    private ErrorResponse.FieldValidationError toFieldError(FieldError fieldError) {
        return ErrorResponse.FieldValidationError.builder()
                .field(fieldError.getField())
                .message(fieldError.getDefaultMessage())
                .build();
    }

    private ResponseEntity<ErrorResponse> build(String message, HttpStatus status, String path,
                                                List<ErrorResponse.FieldValidationError> fieldErrors) {
        return ResponseEntity.status(status).body(
                ErrorResponse.builder()
                        .timestamp(LocalDateTime.now())
                        .status(status.value())
                        .error(status.getReasonPhrase())
                        .message(message)
                        .path(path)
                        .fieldErrors(fieldErrors)
                        .build()
        );
    }
}
