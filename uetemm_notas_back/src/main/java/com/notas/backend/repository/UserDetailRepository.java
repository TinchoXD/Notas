package com.notas.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notas.backend.model.UserDetailBORRAR;

public interface UserDetailRepository extends JpaRepository<UserDetailBORRAR,Integer>{

}
