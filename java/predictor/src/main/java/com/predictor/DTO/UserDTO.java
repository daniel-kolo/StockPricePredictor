package com.predictor.DTO;

import com.predictor.domain.User;

public class UserDTO {

    private String email;
    private String password;

    public UserDTO(User user){
        this.email = user.getEmail();
        this.password = user.getPassword();
    }

    public UserDTO(String emai, String password) {
        this.email = emai;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setEmai(String emai) {
        this.email = emai;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
