package com.toeic.demo.service;

import com.toeic.demo.dto.request.SubmitTestRequest;
import com.toeic.demo.dto.response.SubmitTestResponse;

public interface ISubmitService {
    SubmitTestResponse submit(SubmitTestRequest req);
}
