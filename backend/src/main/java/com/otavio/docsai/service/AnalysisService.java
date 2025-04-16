package com.otavio.docsai.service;

import org.springframework.web.multipart.MultipartFile;

public interface AnalysisService {
    // Processa o arquivo zip
    String processZipFile(MultipartFile file) throws Exception;
}
