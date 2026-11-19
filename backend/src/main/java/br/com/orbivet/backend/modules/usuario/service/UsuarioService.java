package br.com.orbivet.backend.modules.usuario.service;

import br.com.orbivet.backend.modules.usuario.dto.CreateUsuarioRequest;
import br.com.orbivet.backend.modules.usuario.dto.UsuarioResponse;
import br.com.orbivet.backend.modules.usuario.model.Usuario;
import br.com.orbivet.backend.modules.usuario.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Locale;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(
            UsuarioRepository repository,
            PasswordEncoder passwordEncoder
    ) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UsuarioResponse create(CreateUsuarioRequest request) {

        String email = request.email()
                .trim()
                .toLowerCase(Locale.ROOT);

        if (repository.existsByEmail(email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "E-mail já cadastrado"
            );
        }

        Usuario usuario = new Usuario();

        usuario.setNome(request.nome().trim());
        usuario.setEmail(email);
        usuario.setSenhaHash(
                passwordEncoder.encode(request.senha())
        );

        Usuario usuarioSalvo = repository.save(usuario);

        return UsuarioResponse.from(usuarioSalvo);
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponse> findAll() {

        return repository.findAll()
                .stream()
                .map(UsuarioResponse::from)
                .toList();
    }

    @Transactional(readOnly = true)
    public UsuarioResponse findById(Long id) {

        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Usuário não encontrado"
                ));

        return UsuarioResponse.from(usuario);
    }
}
