package br.com.orbivet.backend.modules.usuario.dto;

import br.com.orbivet.backend.modules.usuario.model.Usuario;
import java.time.LocalDateTime;

public record UsuarioResponse(Long id, String nome, String email, LocalDateTime criadoEm) {

    public static UsuarioResponse from(Usuario u) {
        return new UsuarioResponse(u.getId(), u.getNome(), u.getEmail(), u.getCriadoEm());
    }
}