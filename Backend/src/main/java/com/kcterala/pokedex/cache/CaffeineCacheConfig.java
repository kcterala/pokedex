package com.kcterala.pokedex.cache;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class CaffeineCacheConfig {

    public CacheManager cacheManager(){
        CaffeineCacheManager cacheManager = new CaffeineCacheManager("example");
        cacheManager.setCaffeine(caffieneCacheBuilder());
        return cacheManager;
    }

    Caffeine<Object, Object> caffieneCacheBuilder(){
        return Caffeine.newBuilder()
                .initialCapacity(100)
                .maximumSize(500)
                .expireAfterAccess(10, TimeUnit.MINUTES)
                .recordStats();
    }
}
