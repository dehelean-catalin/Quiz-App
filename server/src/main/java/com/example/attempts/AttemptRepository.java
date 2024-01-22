package com.example.attempts;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttemptRepository extends JpaRepository<Attempt, String> {

    @Query("SELECT a FROM Attempt a WHERE a.isCompleted = false AND a.endTime < :currentDate")
    List<Attempt> findByIsCompletedFalseAndEndTimeBefore(@Param("currentDate") String currentDate);

}
