package com.example.jobtracker.service;

import com.example.jobtracker.dto.JobApplicationRequest;
import com.example.jobtracker.model.ApplicationStatus;
import com.example.jobtracker.model.JobApplication;
import com.example.jobtracker.repository.JobApplicationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobApplicationService {

    private final JobApplicationRepository repository;

    public JobApplicationService(JobApplicationRepository repository) {
        this.repository = repository;
    }

    // Create application
    public JobApplication createApplication(
            JobApplicationRequest request,
            String userId) {

        JobApplication application = new JobApplication();

        application.setUserId(userId);
        application.setCompany(request.getCompany());
        application.setPosition(request.getPosition());
        application.setLocation(request.getLocation());
        application.setStatus(request.getStatus());
        application.setJobType(request.getJobType());
        application.setAppliedDate(request.getAppliedDate());
        application.setSalary(request.getSalary());
        application.setJobUrl(request.getJobUrl());
        application.setNotes(request.getNotes());

        LocalDateTime now = LocalDateTime.now();

        application.setCreatedAt(now);
        application.setUpdatedAt(now);

        return repository.save(application);
    }

    // Get all applications of a user
    public List<JobApplication> getApplications(String userId) {
        return repository.findByUserId(userId);
    }

    // Search applications
    public List<JobApplication> searchApplications(
            String userId,
            String search) {

        return repository.searchApplications(
                userId,
                search
        );
    }

    // Filter applications by status
    public List<JobApplication> getApplicationsByStatus(
            String userId,
            ApplicationStatus status) {

        return repository.findByUserIdAndStatus(
                userId,
                status
        );
    }

    // Search applications by text and status
    public List<JobApplication> searchApplicationsByStatus(
            String userId,
            String search,
            ApplicationStatus status) {

        return repository.searchApplicationsByStatus(
                userId,
                search,
                status
        );
    }

    // Get single application of a user
    public JobApplication getApplicationById(
            String id,
            String userId) {

        return repository.findByIdAndUserId(id, userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Application not found"
                        )
                );
    }

    // Update application
    public JobApplication updateApplication(
            String id,
            JobApplicationRequest request,
            String userId) {

        JobApplication application =
                repository.findByIdAndUserId(id, userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found"
                                )
                        );

        application.setCompany(request.getCompany());
        application.setPosition(request.getPosition());
        application.setLocation(request.getLocation());
        application.setStatus(request.getStatus());
        application.setJobType(request.getJobType());
        application.setAppliedDate(request.getAppliedDate());
        application.setSalary(request.getSalary());
        application.setJobUrl(request.getJobUrl());
        application.setNotes(request.getNotes());

        application.setUpdatedAt(LocalDateTime.now());

        return repository.save(application);
    }

    // Delete application
    public void deleteApplication(
            String id,
            String userId) {

        JobApplication application =
                repository.findByIdAndUserId(id, userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found"
                                )
                        );

        repository.delete(application);
    }
}