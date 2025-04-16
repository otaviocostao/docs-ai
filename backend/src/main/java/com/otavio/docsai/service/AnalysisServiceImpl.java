package com.otavio.docsai.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

@Service
public class AnalysisServiceImpl implements AnalysisService {

    // tamanho seguro de arquivos
    private static final long MAX_UNCOMPRESSED_SIZE = 100 * 1024 * 1024; // Ex: 100MB
    private static final int MAX_ENTRIES = 1024; // Limite de arquivos dentro do zip


    @Override
    public String processZipFile(MultipartFile file) throws Exception {
        // Inicializa o diretortio temporario
        Path tempDir = null;
        try {
            // Define o diretório temporario
            tempDir = Files.createTempDirectory("docai-unzip-");


            long totalSize = 0;
            int totalEntries = 0;
            try (ZipInputStream zis = new ZipInputStream(file.getInputStream())){
                ZipEntry zipEntry;
                while ((zipEntry = zis.getNextEntry()) != null){
                    totalEntries++;
                    // Valida a quantidade de arquivos dentro do zip
                    if (totalEntries>MAX_ENTRIES){
                        throw new IllegalArgumentException("Número maximo de arquivos no zip excedido (" + MAX_ENTRIES + ").");
                    }
                    Path destinationFile = resolveSafely(tempDir, zipEntry.getName());

                    if (zipEntry.isDirectory()){
                        Files.createDirectories(destinationFile);
                    }else {
                        Files.createDirectories(destinationFile.getParent());

                        // Pega o tamanho do arquivo zip
                        long fileSize = Files.copy(zis, destinationFile, StandardCopyOption.REPLACE_EXISTING);

                        totalSize += fileSize;

                        // Valida o tamanho do arquivo zip com a constante
                        if(totalSize > MAX_UNCOMPRESSED_SIZE) {
                            throw new IllegalArgumentException("Tamango total descompactado excede o limite de " + (MAX_UNCOMPRESSED_SIZE / 1024 / 1024) + "MB.");
                        }
                    }
                    zis.closeEntry();
                }
            }

            // Analise dos arquivos do projeto
            List<String> fileStructure = generateFileStructure(tempDir);
            Map<String, Long> languageCounts = countLanguages(tempDir);
            String mainLanguage = getMainLanguage(languageCounts);

            // Gerar o markdown
            return generateMarkdown(mainLanguage, languageCounts, fileStructure);
        } finally {
            // Limpeza nos arquivos
            if (tempDir !=null){
                try (var stream = Files.walk(tempDir)) {
                    // deletar de dentro pra fora
                    stream.sorted(Comparator.reverseOrder())
                            .map(Path::toFile)
                            .forEach(java.io.File::delete);
                }catch (IOException e) {
                    System.err.println("Falha ao limpar diretório temporário: " + tempDir + " - " + e.getMessage());
                }
            }
        }
    }
    // Método auxiliar para resolução segura de path (previne Path Traversal)
    private Path resolveSafely(Path baseDir, String entryName) throws IOException {
        Path entryPath = baseDir.resolve(entryName).normalize();
        if(!entryPath.startsWith(baseDir)) {
            throw new IOException("Tentativa de Path Transversal detectada: " + entryName);
        }
        return entryPath;
    }

    private  List<String > generateFileStructure(Path rootDir) throws IOException {
        try (var stream = Files.walk(rootDir)){
            return stream
                    .map(path -> rootDir.relativize(path).toString()) // pega o caminho relativo
                    .filter(pathStr -> !pathStr.isEmpty()) // Remove a raiz vazia
                    .sorted()
                    .collect(Collectors.toList());
        }
    }

    // Contar as extensões e definir as linguagens usadas
    private Map<String, Long> countLanguages(Path rootDir) throws IOException {
        try (var stream = Files.walk(rootDir)){
            return stream
                    .filter(Files::isRegularFile)
                    .map(path -> getExtension(path.getFileName().toString()))
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .collect(Collectors.groupingBy(ext -> ext, Collectors.counting()));
        }
    }

    private Optional<String> getExtension(String filename){
        int lastDot = filename.lastIndexOf('.');
        if (lastDot > 0 && lastDot < filename.length() -1 ){
            return Optional.of(filename.substring(lastDot + 1).toLowerCase());
        }
        return Optional.empty();
    }

    private String getMainLanguage(Map<String, Long> counts) {
        return counts.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("Desconhecida");
    }

    // Método para gerar o Markdown
    private String generateMarkdown(String mainLanguage, Map<String, Long> counts, List<String> structure) {
        StringBuilder md = new StringBuilder();
        md.append("# Análise do Projeto\n\n");
        md.append("## Linguagem Principal\n");
        md.append("- **").append(mainLanguage).append("**\n\n");

        if (!counts.isEmpty()) {
            md.append("### Contagem de Extensões:\n");
            counts.entrySet().stream()
                    .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                    .forEach(entry -> md.append("- `.").append(entry.getKey()).append("`: ").append(entry.getValue()).append("\n"));
            md.append("\n");
        }

        md.append("## Estrutura de Arquivos/Pastas\n");
        md.append("```\n");
        // Formatação simples de árvore (pode melhorar muito)
        for (String path : structure) {
            int depth = path.split("[/\\\\]").length -1; // Conta separadores para profundidade
            md.append("  ".repeat(depth)).append("- ").append(path.substring(path.lastIndexOf(System.getProperty("file.separator"))+1)).append("\n"); // Só o nome base
            // Ou simplesmente: md.append(path).append("\n");
        }
        md.append("```\n");

        return md.toString();
    }

}
