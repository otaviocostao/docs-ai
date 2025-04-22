package com.otavio.docsai.dto;

public class MarkdownResponse {
    private String markdownContent; // O frontend espera algo como isso

    // Construtor vazio (bom para Jackson)
    public MarkdownResponse() {}

    // Construtor com argumento
    public MarkdownResponse(String markdownContent) {
        this.markdownContent = markdownContent;
    }

    // Getter (essencial para Jackson serializar)
    public String getMarkdownContent() {
        return markdownContent;
    }

    // Setter (bom ter, mas getter é o principal para serialização)
    public void setMarkdownContent(String markdownContent) {
        this.markdownContent = markdownContent;
    }
}