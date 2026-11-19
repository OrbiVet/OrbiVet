package br.com.orbivet.backend.modules.usuario.service;
import br.com.orbivet.backend.modules.usuario.dto.CreateUsuarioRequest;
import br.com.orbivet.backend.modules.usuario.dto.UsuarioResponse;
import br.com.orbivet.backend.modules.usuario.model.Usuario;
import br.com.orbivet.backend.modules.usuario.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioRepository repository){
        this.repository = repository;
        this.passwordEncoder = passwordEndecoder;
    }

    @Transactional

    public UsuarioResponse create(CreateUsuarioRequest request) {
        String email = request.email().trim().toLowerCase();

        if (repository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-mail já cadastrado");
        }
        Usuario usuario = new Usuario();
        usuario.setNome(request.nome());
        usuario.setEmail(email);
        usuario.setSenhaHash(encoder.encode(request.senha()));

        return UsuarioResponse.from(repository.save(usuario));

    }

    @Transactional (readOnly = true)
    public List <UsuarioResponse> findAll(){
        return repository.findAll().stream().map(UsuarioResponse::from).toList();
    }
}
