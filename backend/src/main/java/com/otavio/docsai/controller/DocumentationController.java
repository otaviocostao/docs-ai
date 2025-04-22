package com.otavio.docsai.controller;

import com.otavio.docsai.dto.MarkdownResponse;
import com.otavio.docsai.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/analyze")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentationController {

    private final AnalysisService analysisService;

    // Construtor
    @Autowired
    public DocumentationController (AnalysisService analysisService){
        this.analysisService = analysisService;
    }

    // Requisição para o metodo Post
    @PostMapping
    public ResponseEntity<MarkdownResponse> analyzeProject (@RequestParam("zipfile") MultipartFile file){

        // Validação para não receber arquivos vazios
        if (file.isEmpty()) {
            // Retorna o objeto de resposta padrão para erros
            return ResponseEntity.badRequest().body(new MarkdownResponse("Erro: Nenhum arquivo enviado"));
        }

        // Valida o arquivo zip (Sua validação parece OK)
        String contentType = file.getContentType();
        boolean isZip = "application/zip".equals(contentType) ||
                "application/x-zip-compressed".equals(contentType) ||
                // Adicionar octet-stream como fallback se a extensão for .zip?
                ("application/octet-stream".equals(contentType) && file.getOriginalFilename() != null && file.getOriginalFilename().toLowerCase().endsWith(".zip")) ||
                // Ou permitir se o nome terminar com .zip mesmo sem ContentType? (Use com cautela)
                (contentType == null && file.getOriginalFilename() != null && file.getOriginalFilename().toLowerCase().endsWith(".zip"));


        if (!isZip) {
            System.out.println("Arquivo rejeitado. Content-Type: " + contentType + ", Nome: " + file.getOriginalFilename());
            // Retorna o objeto de resposta padrão para erros
            return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                    .body(new MarkdownResponse("Erro: Tipo de arquivo inválido. Somente arquivos .zip são permitidos."));
        }

        // Sua lógica de processamento
        try {
            String markdownResult = analysisService.processZipFile(file);
            return ResponseEntity.ok(new MarkdownResponse(markdownResult));
        }catch (IllegalArgumentException e){
            // Retorna o objeto de resposta padrão para erros
            return ResponseEntity.badRequest().body(new MarkdownResponse("Erro: " + e.getMessage() ));
        }catch (Exception e){
            System.err.println("Erro ao processar arquivos: " + e.getMessage());
            e.printStackTrace();
            // Retorna o objeto de resposta padrão para erros
            return ResponseEntity.internalServerError().body(new MarkdownResponse("Erro interno ao processar arquivo"));
        }
    }
}