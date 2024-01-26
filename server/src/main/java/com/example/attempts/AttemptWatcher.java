package com.example.attempts;

import com.example.attempts.dao.Attempt;
import com.example.attempts.dao.AttemptRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@Slf4j
public class AttemptWatcher {

    private final AttemptRepository attemptRepository;

    public AttemptWatcher(AttemptRepository attemptRepository) {
        this.attemptRepository = attemptRepository;
    }

    @Scheduled(fixedDelay = 60000)
    public void printAttempt() {
        List<Attempt> expiredAttempts =
                attemptRepository.findByIsCompletedFalseAndEndTimeBefore(LocalDateTime.now().toString());

        log.warn("Number of expired attempts which are not closed: {}", expiredAttempts.size());

        expiredAttempts.forEach(attempt -> {
            attempt.setIsCompleted(true);
            attempt.setCompletedAt(attempt.getEndTime());
        });

        attemptRepository.saveAll(expiredAttempts);

    }

}
