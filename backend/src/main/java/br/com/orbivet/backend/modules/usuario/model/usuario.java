package br.com.orbivet.backend.modules.usuario.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "usuario")
public class Usuario {
    public Long getId(){return id;}
    public String getNome(){return nome;}
    public void setNome (String nome) { this.nome = nome; }
    public String getEmail (){ return email;}
    public void setEmail (String email) {this.email = email;}
    public void setSenhaHash (String senhaHash) {this. senhaHash = senhaHash;}
    public LocalDateTime getCriadoEm(){return criadoE,;}


    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "senha_hash", nullable = false)
    private String senhaHash;


}
