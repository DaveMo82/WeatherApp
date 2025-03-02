package com.weather.repository;
import com.weather.model.Weather;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WeatherRepository extends JpaRepository<Weather, Long> {
    List<Weather> findByName(String name);

    Optional<Weather> findById(Long id);
}

