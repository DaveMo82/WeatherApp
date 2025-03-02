package com.weather.controller;

import com.weather.model.Weather;
import com.weather.repository.WeatherDataRepository;
import com.weather.repository.WeatherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController

public class WeatherDataController {

    @Autowired
    WeatherRepository weatherRepository;

    private final WeatherDataRepository weatherDataService;

    public WeatherDataController(WeatherDataRepository weatherDataService) {
        this.weatherDataService = weatherDataService;
    }

    @GetMapping("/weather")
    public ResponseEntity<List<Weather>> getWeatherData(@RequestParam(required = false) String city) {
        try {
            if (city != null) {
                List<Weather> weatherList = weatherRepository.findByName(city);
                return new ResponseEntity<>(weatherList, HttpStatus.OK);
            } else {
                List<Weather> allWeatherData = weatherRepository.findAll();
                return new ResponseEntity<>(allWeatherData, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api-key")
    public ResponseEntity<String> getApiKey() {
        String apiKey = weatherDataService.getApiKey();
        return ResponseEntity.ok(apiKey);
    }

    @PostMapping("/weather_favorites")
    public ResponseEntity<Weather> createFavorite(@RequestBody Weather weather) {
        try {
            Weather _weather = weatherRepository
                    .save(new Weather(weather.getId(), weather.getName()));
            return new ResponseEntity<>(_weather, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/weather_city/{id}")
    public ResponseEntity<String> deleteCity(@PathVariable Long id) {
        try {
            weatherRepository.deleteById(id);
            return new ResponseEntity<>("City delete successfully", HttpStatus.OK);
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>("City not find", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}