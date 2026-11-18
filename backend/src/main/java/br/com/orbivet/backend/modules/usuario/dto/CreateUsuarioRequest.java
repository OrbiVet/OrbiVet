package br.com.orbivet.backend.modules.usuario.dto;
import jakarta.validation.constraints.*;
public record CreateUsuarioRequest(
        @NotBlank String nome,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 8) String senha
) {
}
