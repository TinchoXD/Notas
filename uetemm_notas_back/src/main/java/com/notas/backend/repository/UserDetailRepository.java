package com.notas.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.notas.backend.model.UserDetail;

public interface UserDetailRepository extends JpaRepository<UserDetail,Integer>{

}
