package com.example.jobtracker.repository;

import com.example.jobtracker.model.ApplicationStatus;
import com.example.jobtracker.model.JobApplication;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobApplicationRepository
        extends MongoRepository<JobApplication, String> {

    List<JobApplication> findByUserId(String userId);

    List<JobApplication> findByUserIdAndStatus(
            String userId,
            ApplicationStatus status
    );

    Optional<JobApplication> findByIdAndUserId(
            String id,
            String userId
    );

    // Search by company or position
    @Query("""
            {
                'userId': ?0,
                '$or': [
                    { 'company': { '$regex': ?1, '$options': 'i' } },
                    { 'position': { '$regex': ?1, '$options': 'i' } }
                ]
            }
            """)
    List<JobApplication> searchApplications(
            String userId,
            String search
    );

    // Search by company or position + status
    @Query("""
            {
                'userId': ?0,
                'status': ?2,
                '$or': [
                    { 'company': { '$regex': ?1, '$options': 'i' } },
                    { 'position': { '$regex': ?1, '$options': 'i' } }
                ]
            }
            """)
    List<JobApplication> searchApplicationsByStatus(
            String userId,
            String search,
            ApplicationStatus status
    );
}