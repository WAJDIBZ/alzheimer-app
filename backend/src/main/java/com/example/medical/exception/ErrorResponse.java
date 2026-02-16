package com.example.medical.exception;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    private List<FieldValidationError> fieldErrors;

    @Data
    @Builder
    public static class FieldValidationError {
        private String field;
        private String message;
    }
}
