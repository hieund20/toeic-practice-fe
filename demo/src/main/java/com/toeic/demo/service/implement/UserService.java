package com.toeic.demo.service.implement;

import com.toeic.demo.dto.request.CreateUserRequest;
import com.toeic.demo.dto.response.UserResponse;
import com.toeic.demo.entity.AppUser;
import com.toeic.demo.repository.UserRepository;
import com.toeic.demo.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {
    private final UserRepository userRepository;

    @Override
    public UserResponse create(CreateUserRequest req) {
        // prevent duplicate email
        userRepository.findByEmail(req.getEmail())
                .ifPresent(u -> {
                    throw new RuntimeException("Email already exists");
                });

        AppUser user = new AppUser();
        user.setEmail(req.getEmail());
        user.setName(req.getName());

        AppUser saved = userRepository.save(user);

        return new UserResponse(
                saved.getId(),
                saved.getEmail(),
                saved.getName()
        );
    }
}
