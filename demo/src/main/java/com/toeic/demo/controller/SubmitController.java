package com.toeic.demo.controller;

import com.toeic.demo.dto.request.SubmitTestRequest;
import com.toeic.demo.dto.response.SubmitTestResponse;
import com.toeic.demo.service.ISubmitService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/submit")
@RequiredArgsConstructor
public class SubmitController {

    private final ISubmitService submitService;

    @PostMapping
    public SubmitTestResponse submit(@RequestBody SubmitTestRequest request) {
        return submitService.submit(request);
    }
}
