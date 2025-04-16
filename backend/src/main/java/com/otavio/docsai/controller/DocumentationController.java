package com.otavio.docsai.controller;

import com.otavio.docsai.dto.MarkdownResponse;
import com.otavio.docsai.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/analyze")
public class DocumentationController {

    private final AnalysisService analysisService;

    // Construtor
    @Autowired
    public DocumentationController (AnalysisService analysisService){
        this.analysisService = analysisService;
    }

    // Requisição para o metodo Post
    @PostMapping
    public ResponseEntity<MarkdownResponse> analyzeProject (@RequestParam("zipfile")MultipartFile file){

        // Validação para não receber arquivos vazios
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(new MarkdownResponse("Erro: Nenhum arquivo enviado"));
        }

        // Valida o arquivo zip
        if (!"application/zip".equals(file.getContentType()) && !"application/x-zip-compressed".equals(file.getContentType())){
            System.out.println("Aviso: Content-Type não é .zip padrão, mas tentando processar: " + file.getContentType());
        }

        try {
            String markdownResult = analysisService.processZipFile(file);
            return ResponseEntity.ok(new MarkdownResponse(markdownResult));
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(new MarkdownResponse("Erro: " + e.getMessage() ));
        }catch (Exception e){
            System.err.println("Erro ao processar arquivos: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(new MarkdownResponse("Erro interno ao processar arquivo"));
        }
    }
}
