package br.com.orbivet.backend.modules.usuario.controller;

import br.com.orbivet.backend.modules.usuario.dto.CreateUsuarioRequest;
import br.com.orbivet.backend.modules.usuario.dto.UsuarioResponse;
import br.com.orbivet.backend.modules.usuario.service.UsuarioService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponse create(
            @Valid @RequestBody CreateUsuarioRequest request
    ) {
        return service.create(request);
    }

    @GetMapping
    public List<UsuarioResponse> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public UsuarioResponse findById(@PathVariable Long id) {
        return service.findById(id);
    }
}
