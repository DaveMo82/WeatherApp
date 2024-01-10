package com.weather.repository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherDataRepository {
    @Value("${api.key}")
    private String apiKey;

    private final String url = "https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}";

    private final RestTemplate restTemplate;

    public WeatherDataRepository(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }


    public String getApiKey() {
        return apiKey;
    }

    public String getWeatherData(String city) {
        String apiUrlWithParam = url.replace("{city}", city).replace("{apiKey}", apiKey);
        return restTemplate.getForObject(apiUrlWithParam, String.class);
    }
}
