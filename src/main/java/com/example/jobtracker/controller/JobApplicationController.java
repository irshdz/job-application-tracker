package com.example.jobtracker.controller;

import com.example.jobtracker.dto.JobApplicationRequest;
import com.example.jobtracker.model.ApplicationStatus;
import com.example.jobtracker.model.JobApplication;
import com.example.jobtracker.service.JobApplicationService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    private final JobApplicationService service;

    public JobApplicationController(JobApplicationService service) {
        this.service = service;
    }

    // Create application
    @PostMapping
    public JobApplication createApplication(
            @Valid @RequestBody JobApplicationRequest request,
            Authentication authentication) {

        String userId = authentication.getName();

        return service.createApplication(
                request,
                userId
        );
    }

    // Get all applications, search, and filter by status
    @GetMapping
    public List<JobApplication> getApplications(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) ApplicationStatus status,
            Authentication authentication) {

        String userId = authentication.getName();

        // Search + status filter
        if (search != null
                && !search.isBlank()
                && status != null) {

            return service.searchApplicationsByStatus(
                    userId,
                    search,
                    status
            );
        }

        // Search only
        if (search != null && !search.isBlank()) {

            return service.searchApplications(
                    userId,
                    search
            );
        }

        // Status filter only
        if (status != null) {

            return service.getApplicationsByStatus(
                    userId,
                    status
            );
        }

        // Get all applications
        return service.getApplications(userId);
    }

    // Get single application
    @GetMapping("/{id}")
    public JobApplication getApplicationById(
            @PathVariable String id,
            Authentication authentication) {

        String userId = authentication.getName();

        return service.getApplicationById(
                id,
                userId
        );
    }

    // Update application
    @PutMapping("/{id}")
    public JobApplication updateApplication(
            @PathVariable String id,
            @Valid @RequestBody JobApplicationRequest request,
            Authentication authentication) {

        String userId = authentication.getName();

        return service.updateApplication(
                id,
                request,
                userId
        );
    }

    // Delete application
    @DeleteMapping("/{id}")
    public Map<String, String> deleteApplication(
            @PathVariable String id,
            Authentication authentication) {

        String userId = authentication.getName();

        service.deleteApplication(
                id,
                userId
        );

        return Map.of(
                "message",
                "Application deleted successfully"
        );
    }
}