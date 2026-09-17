package com.example.jobtracker.controller;

import com.example.jobtracker.model.ApplicationStatus;
import com.example.jobtracker.repository.JobApplicationRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final JobApplicationRepository repository;

    public DashboardController(
            JobApplicationRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Map<String, Long> getDashboard(
            Authentication authentication) {

        String userId = authentication.getName();

        long total =
                repository.findByUserId(userId).size();

        long applied =
                repository.findByUserIdAndStatus(
                        userId,
                        ApplicationStatus.APPLIED
                ).size();

        long screening =
                repository.findByUserIdAndStatus(
                        userId,
                        ApplicationStatus.SCREENING
                ).size();

        long interview =
                repository.findByUserIdAndStatus(
                        userId,
                        ApplicationStatus.INTERVIEW
                ).size();

        long offer =
                repository.findByUserIdAndStatus(
                        userId,
                        ApplicationStatus.OFFER
                ).size();

        long rejected =
                repository.findByUserIdAndStatus(
                        userId,
                        ApplicationStatus.REJECTED
                ).size();

        return Map.of(
                "total", total,
                "applied", applied,
                "screening", screening,
                "interview", interview,
                "offer", offer,
                "rejected", rejected
        );
    }
}