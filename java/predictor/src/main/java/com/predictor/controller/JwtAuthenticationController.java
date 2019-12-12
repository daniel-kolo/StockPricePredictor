package com.predictor.controller;

import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.predictor.DTO.UserDTO;
import com.predictor.domain.User;

import com.predictor.repo.UserRepository;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.predictor.security.JwtUserDetailsService;
import com.predictor.security.JwtTokenUtil;
import com.predictor.security.model.JwtRequest;
import com.predictor.security.model.JwtResponse;


@RestController
@CrossOrigin
public class JwtAuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    UserRepository userRepo;

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> saveUser(@RequestBody String user) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode actualObj = mapper.readTree(user);
        JsonNode jsonNodeUser = actualObj.get("user");
        UserDTO userDTO = new UserDTO(jsonNodeUser.get("email").toString().split("\"")[1]
                                        ,jsonNodeUser.get("password").toString().split("\"")[1]);
         return ResponseEntity.ok(userDetailsService.save(userDTO));
    }

    @PostMapping(value = "/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody String authenticationRequest) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode actualObj = mapper.readTree(authenticationRequest);
        JsonNode jsonNodeUser = actualObj.get("request");
        UserDTO userDTO = new UserDTO(jsonNodeUser.get("email").toString().split("\"")[1]
                ,jsonNodeUser.get("password").toString().split("\"")[1]);

        authenticate(userDTO.getEmail(), userDTO.getPassword());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(userDTO.getEmail());
        final String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String email, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}