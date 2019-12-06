package com.predictor;

import com.predictor.DTO.UserDTO;
import com.predictor.domain.TickerManager;
import com.predictor.domain.User;
import com.predictor.repo.UserRepository;
import com.predictor.security.JwtUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class PredictorApplication implements CommandLineRunner {

    @Autowired
    JwtUserDetailsService userDetailsService;

    @Autowired
    UserRepository userRepo;

    @Autowired
    TickerManager tickerManager;

    public static void main(String[] args) {
        SpringApplication.run(PredictorApplication.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
        User user = new User("example@example.com", "pass");
        userDetailsService.save(new UserDTO(user));
        System.out.println(tickerManager.getTickers());
    }

}
