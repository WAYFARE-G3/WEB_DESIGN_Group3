package com.fpt.wayfare.dto;

import com.fpt.wayfare.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    
    private String token;
    
    private String refreshToken;
    
    private UserDTO user;
    
    private String message;
    
    private boolean success;
    
    
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserDTO {
        private Long id;
        private String username;
        private String email;
        private String fullName;
        private String phone;
        private String avatarUrl;
        private String role;
        
        public static UserDTO fromEntity(User user) {
            return UserDTO.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .fullName(user.getFullName())
                    .phone(user.getPhone())
                    .avatarUrl(user.getAvatarUrl())
                    .role(user.getRole().toString())
                    .build();
        }
    }
}
