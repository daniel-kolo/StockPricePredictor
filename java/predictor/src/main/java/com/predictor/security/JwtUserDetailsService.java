package com.predictor.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class JwtUserDetailsService implements UserDetailsService {


    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = new User();
        List<User> list = userRepo.findAll();

        for (User tempUser : list)
        {
            if(tempUser.getUsername()!=null && tempUser.getUsername().equals(username)){
                user = tempUser;
                return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                        new ArrayList<>());
            }
        }
        throw new UsernameNotFoundException("User not found with username: " + username);

    }

    public User save(UserDTO user) {
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        newUser.setName(user.getUsername());
        newUser.setPortfolio(new StockPortfolio());

        // For some strange reason it does not do what it is supposed to be doing
        // So we made this workaround
        userRepo.save(newUser);
        return newUser;
    }

}