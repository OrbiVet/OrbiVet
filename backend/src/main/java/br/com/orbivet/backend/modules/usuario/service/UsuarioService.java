package br.com.orbivet.backend.modules.usuario.service;
import br.com.orbivet.backend.modules.usuario.dto.CreateUsuarioRequest;
import br.com.orbivet.backend.modules.usuario.dto.UsuarioResponse;
import br.com.orbivet.backend.modules.usuario.model.Usuario;
import br.com.orbivet.backend.modules.usuario.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UsuarioService {
    private final UsuarioRepository repository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public UsuarioService(UsuarioRepository repository){
        this.repository = repository;
    }
    public UsuarioResponse create(CreateUsuarioRequest request){
        if( repository.existsByEmail(request.email())){
           throw new ResponseStatusException(HttpStatus.CONFLICT, "email ja cadastrado");
        }
        Usuario usuario = new Usuario();
        usuario.setNome(request.nome());
        usuario.setEmail(request.email());
        usuario.setSenhaHash(encoder.encode(request.senha()));

        return UsuarioResponse.from(repository.save(usuario));

    }

    public List <UsuarioResponse> findAll(){
        return repository.findAll().stream().map(UsuarioResponse::from).toList();
    }
}
