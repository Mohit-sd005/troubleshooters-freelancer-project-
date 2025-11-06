package com.troubleshooters.demo.repository;

import com.troubleshooters.demo.model.Ad;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdRepository extends JpaRepository<Ad, Long> {

    List<Ad> findByStatus(String status);

    List<Ad> findByClientId(Long clientId);
}