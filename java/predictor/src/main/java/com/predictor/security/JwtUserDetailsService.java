package com.predictor.security;

import java.util.ArrayList;
import java.util.List;

import com.predictor.DTO.UserDTO;
import com.predictor.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.predictor.domain.User;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepo;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = new User();
        List<User> list = userRepo.findAll();

        for (User tempUser : list)
        {
            if(tempUser.getEmail()!=null && tempUser.getEmail().equals(email)){
                user = tempUser;
                return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
                        new ArrayList<>());
            }
        }
        throw new UsernameNotFoundException("User not found with email: " + email);

    }

    public User save(UserDTO userDTO) {
        User newUser = new User(userDTO.getEmail(), bcryptEncoder.encode(userDTO.getPassword()));

        // For some strange reason it does not do what it is supposed to be doing
        // So we made this workaround
        userRepo.save(newUser);
        return newUser;
    }

}