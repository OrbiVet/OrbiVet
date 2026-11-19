package br.com.orbivet.backend.modules.usuario.dto;
import jakarta.validation.constraints.*;
public record CreateUsuarioRequest(
        @NotBlank  @Size ( max = 150) String nome,
        @NotBlank  @Email @Size(max = 150) String email,
        @NotBlank @Size(min = 8, max = 72) String senha
) {
}
